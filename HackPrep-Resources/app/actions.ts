"use server";

const API_KEY = "AIzaSyAYqjwGv0fhLa07_W2fbYrGKg4as1d_OaY";

// Confirmed models with available quota (verified by probe)
const MODEL_PRIORITY = [
  "gemini-2.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-2.5-flash",
];

async function callGemini(model: string, prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 3072,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const status = response.status;
    const message = errorData?.error?.message || response.statusText;
    console.error(`[Gemini ${model}] ${status}: ${message}`);
    throw Object.assign(new Error(message), { status, model });
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  if (!text) throw new Error(`Empty response from model ${model}`);
  return text;
}

function parseIdeas(raw: string) {
  if (raw.includes("NOT_SUPPORTED")) return "NOT_SUPPORTED";

  // Strip markdown fences if present
  const jsonStr = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();

  // Try direct parse first
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.sort((a: any, b: any) => b.score - a.score);
    }
  } catch (_) {}

  // Fallback: extract array substring
  const match = jsonStr.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) {
        return parsed.sort((a: any, b: any) => b.score - a.score);
      }
    } catch (_) {}
  }

  throw new Error("Could not parse AI response as JSON.");
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAiIdeas(query: string) {
  const prompt = `You are a hackathon mentor. The user searches: "${query}".

If RELATED to hackathons/startups/AI tools/SaaS/dev tools/innovation: return a JSON array of exactly 12 project ideas sorted by score descending.
If UNRELATED (recipes, trivia, celebrity, personal): return only the string NOT_SUPPORTED.

Each JSON object must have these exact keys:
{"id":1,"title":"","category":"","description":"","longDescription":"","tags":[],"difficulty":"","hours":"","score":0}

category must be one of: AI/ML, FinTech, Health, DevTools, Education, Blockchain, IoT
difficulty must be: Beginner, Intermediate, or Advanced
score must be an integer between 80-99
hours format: "24h"

Return ONLY the raw JSON array or NOT_SUPPORTED. No markdown, no explanation.`;

  let lastError: Error | null = null;

  for (const model of MODEL_PRIORITY) {
    // Retry each model up to 2 times with backoff on rate-limit errors
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Gemini] Trying ${model} (attempt ${attempt})…`);
        const raw = await callGemini(model, prompt);
        const result = parseIdeas(raw);
        console.log(`[Gemini] Success with ${model}`);
        return result;
      } catch (err: any) {
        lastError = err;
        const isRateLimit = err.status === 429;
        const isNotFound = err.status === 404;

        if (isNotFound) {
          console.warn(`[Gemini] Model ${model} not found, trying next…`);
          break; // skip to next model immediately
        }

        if (isRateLimit && attempt === 1) {
          const retryAfterMs = 20_000; // wait 20s on rate limit
          console.warn(`[Gemini] Rate limited on ${model}, retrying in ${retryAfterMs / 1000}s…`);
          await sleep(retryAfterMs);
          continue;
        }

        // Other errors — break and try next model
        console.warn(`[Gemini] Error on ${model}: ${err.message}`);
        break;
      }
    }
  }

  // All models failed
  console.error("[Gemini] All models failed:", lastError?.message);
  throw new Error(
    lastError?.message?.includes("RESOURCE_EXHAUSTED")
      ? "AI quota limit reached. Please wait a moment and try again."
      : "Failed to generate ideas. Please try again."
  );
}
