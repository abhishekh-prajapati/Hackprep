import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const FALLBACK_PROJECTS = [
  {
    id: "1",
    title: "HealthSync AI",
    description: "An AI-powered diagnostic tool that analyzes medical reports to provide patient-friendly summaries and follow-up suggestions.",
    event: "HackHarvard 2024",
    techStack: ["Next.js", "Python", "OpenAI", "FastAPI"],
    link: "https://devpost.com/software/healthsync-ai",
    category: "AI",
  },
  {
    id: "2",
    title: "EcoTrack",
    description: "Real-time carbon footprint tracking for e-commerce deliveries using blockchain for transparency.",
    event: "ETHGlobal London 2024",
    techStack: ["Solidity", "React", "The Graph"],
    link: "https://devpost.com/software/ecotrack",
    category: "Web3",
  },
  {
    id: "3",
    title: "NeuroVision",
    description: "A computer vision system that helps visually impaired users navigate indoor environments safely using spatial audio.",
    event: "CalHacks 10.0",
    techStack: ["PyTorch", "Swift", "CoreML"],
    link: "https://devpost.com/software/neurovision",
    category: "AI",
  },
  {
    id: "4",
    title: "FinFlow",
    description: "DeFi yield aggregator that automatically moves assets to the highest performing pools across multiple chains.",
    event: "Chainlink Constellation",
    techStack: ["Solidity", "TypeScript", "Chainlink Functions"],
    link: "https://devpost.com/software/finflow",
    category: "FinTech",
  },
  {
    id: "5",
    title: "GuardianAI",
    description: "Predictive maintenance system for community water pumps in rural areas, using low-cost IoT sensors and ML.",
    event: "MIT Hacking Medicine",
    techStack: ["TensorFlow Lite", "Arduino", "LoRaWAN"],
    link: "https://devpost.com/software/guardian-ai",
    category: "Social Impact",
  },
  {
    id: "6",
    title: "QuestMaster",
    description: "An AI Dungeon Master that dynamically generates maps and encounters based on player choices in real-time.",
    event: "Global Game Jam 2024",
    techStack: ["Unity", "C#", "Gemini API"],
    link: "https://devpost.com/software/questmaster",
    category: "Gaming",
  },
  {
    id: "7",
    title: "Aura Health",
    description: "Mental health companion using emotion recognition from voice to provide real-time mindfulness exercises.",
    event: "TreeHacks 2024",
    techStack: ["Python", "React Native", "TensorFlow"],
    category: "HealthTech",
    link: "https://devpost.com/software/aura-health"
  },
  {
    id: "8",
    title: "CodeGuard AI",
    description: "AI-driven security scanner that detects vulnerabilities in smart contracts before deployment.",
    event: "ETHDenver 2024",
    techStack: ["Rust", "OpenAI", "Foundry"],
    category: "Web3",
    link: "https://devpost.com/software/codeguard-ai"
  },
  {
    id: "9",
    title: "SafeRoute",
    description: "Dynamic routing for emergency vehicles using real-time traffic data and predictive AI.",
    event: "HackMIT",
    techStack: ["Go", "Google Maps API", "Kubernetes"],
    category: "Social Impact",
    link: "https://devpost.com/software/saferoute"
  }
];

export async function POST(req: Request) {
  try {
    const { query, filter } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);

    // If query is "top ai projects", prioritize returning AI projects from fallback or AI results
    const isInitialLoad = !query || query === "popular hackathon projects";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const prompt = `
        You are a hackathon project researcher. Find 6 REAL hackathon projects for: "${query}" (category: "${filter}").
        Return ONLY a JSON array. Each object: {id, title, description, event, techStack[], link, category}.
        No markdown blocks or preamble.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Better JSON extraction
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      const cleanJson = jsonMatch ? jsonMatch[0] : text.replace(/```json|```/gi, "").trim();
      const data = JSON.parse(cleanJson);
      
      return NextResponse.json({ data, error: null });
    } catch (apiError: any) {
      console.warn("Gemini API failed, using fallback data:", apiError);
      
      // Smart fallback filtering
      let filtered = FALLBACK_PROJECTS;
      
      // Filter by category first
      if (filter && filter !== "All") {
        filtered = FALLBACK_PROJECTS.filter(p => p.category === filter);
      }

      // Then filter by search query
      if (query && query !== "popular hackathon projects" && query !== "top best AI projects") {
        const q = query.toLowerCase();
        const searchResults = filtered.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.techStack.some(t => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
        );
        
        // If no results found, return some random projects to avoid "empty" state during key failure
        filtered = searchResults.length > 0 ? searchResults : filtered.slice(0, 3);
      } else if (query === "top best AI projects") {
        filtered = FALLBACK_PROJECTS.filter(p => p.category === "AI" || p.techStack.includes("AI"));
      }

      return NextResponse.json({ 
        data: filtered, 
        error: { 
          message: "Live Gemini API is unavailable. Showing local projects instead.", 
          details: apiError.message 
        } 
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { data: FALLBACK_PROJECTS, error: { message: "Using fallback data", details: error.message } },
      { status: 200 }
    );
  }
}
