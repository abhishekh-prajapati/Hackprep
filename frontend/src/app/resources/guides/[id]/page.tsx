'use client';
import React from 'react';
import TopBar from '../../components/TopBar';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const guideContent = {
  'pitch-strategy': {
    title: 'Winning Pitch Strategy',
    author: 'Sarah Johnson',
    date: 'May 12, 2026',
    time: '8 min read',
    content: `
      <h2>Introduction</h2>
      <p>A strong hackathon pitch is not about speaking fast or using complicated technical terms. Judges want to quickly understand:</p>
      <ul>
        <li>What problem exists</li>
        <li>Why it matters</li>
        <li>How your solution works</li>
        <li>Why your team built something valuable</li>
      </ul>
      <p>A clear and practical presentation usually performs better than an overcomplicated one.</p>

      <h3>1. Start With the Problem</h3>
      <p>Begin by explaining the real-world issue your project solves.</p>
      <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid var(--accent)">
        <strong>Example:</strong> “Students preparing for hackathons struggle to find structured guidance, reliable teammates, and practical project ideas.”
      </div>
      <p>This helps judges immediately understand the purpose of your project.</p>

      <h3>2. Explain the Solution Clearly</h3>
      <p>After the problem, introduce your platform or product in simple language.</p>
      <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid var(--accent)">
        <strong>Example:</strong> “HackPrep helps students prepare for hackathons through guided learning, AI-powered project ideas, API tutorials, and team collaboration tools.”
      </div>
      <p>Avoid explaining too many technical details at the beginning.</p>

      <h3>3. Keep the Demo Focused</h3>
      <p>Do not try to show every feature. Instead:</p>
      <ul>
        <li>Show one main workflow</li>
        <li>Focus on the strongest feature</li>
        <li>Keep navigation smooth and simple</li>
      </ul>
      <p>A stable demo is more important than a large number of features.</p>

      <h3>4. Explain Your Tech Stack Briefly</h3>
      <p>Mention only the technologies that matter.</p>
      <ul>
        <li>Next.js for frontend</li>
        <li>Supabase for backend</li>
        <li>Gemini AI for project guidance</li>
        <li>Clerk for authentication</li>
      </ul>
      <p>Explain why these tools were chosen instead of only listing them.</p>

      <h3>5. End With Future Vision</h3>
      <p>Finish your presentation by explaining how the project can grow.</p>
      <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid var(--accent)">
        <strong>Example:</strong> “HackPrep can become a complete ecosystem for students preparing for hackathons, technical interviews, and startup building.”
      </div>
      <p>A strong ending leaves a better impression on judges.</p>
    `
  },
  'team-forming': {
    title: 'Effective Team Forming',
    author: 'Michael Chen',
    date: 'May 10, 2026',
    time: '5 min read',
    content: `
      <h2>Introduction</h2>
      <p>Hackathons are team-based competitions where execution speed matters more than perfect planning. Strong teams usually have balanced skills, clear communication, and defined responsibilities.</p>

      <h3>1. Build a Balanced Team</h3>
      <p>An ideal team usually includes:</p>
      <ul>
        <li>Frontend developer</li>
        <li>Backend developer</li>
        <li>Designer</li>
        <li>Presenter or product lead</li>
      </ul>
      <p>In smaller teams, members may handle multiple roles.</p>

      <h3>2. Choose Reliable Teammates</h3>
      <p>The best teammates are not always the smartest ones. Good teammates:</p>
      <ul>
        <li>Finish tasks on time</li>
        <li>Communicate clearly</li>
        <li>Stay active during the event</li>
        <li>Adapt quickly under pressure</li>
      </ul>
      <p>Reliability matters more than theory knowledge.</p>

      <h3>3. Define Roles Early</h3>
      <p>Before development starts:</p>
      <ul>
        <li>Decide responsibilities</li>
        <li>Finalize tech stack</li>
        <li>Create a simple roadmap</li>
      </ul>
      <p>This prevents confusion later.</p>

      <h3>4. Focus on Communication</h3>
      <p>Strong communication improves execution speed. Recommended tools:</p>
      <ul>
        <li>Discord, Slack</li>
        <li>GitHub Projects, Notion</li>
      </ul>
      <p>Regular updates help avoid blockers.</p>

      <h3>5. Prioritize MVP First</h3>
      <p>Teams often fail because they try building too many features. Instead:</p>
      <ul>
        <li>Build the core feature first</li>
        <li>Make the demo stable</li>
        <li>Improve UI later if time remains</li>
      </ul>
      <p>A working MVP is more valuable than an unfinished advanced system.</p>
    `
  },
  'prototyping-tools': {
    title: 'Rapid Prototyping Tools',
    author: 'Elena Rodriguez',
    date: 'May 15, 2026',
    time: '12 min read',
    content: `
      <h2>Introduction</h2>
      <p>Hackathons are time-limited events. Rapid prototyping tools help teams build working products quickly without spending excessive time on setup and configuration.</p>

      <h3>1. Frontend Development Tools</h3>
      <p>These tools help developers create responsive interfaces quickly:</p>
      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>Tailwind CSS</li>
        <li>ShadCN UI</li>
      </ul>

      <h3>2. Backend and Database Tools</h3>
      <p>These services reduce backend setup time and provide everything in one place:</p>
      <ul>
        <li>Supabase</li>
        <li>Firebase</li>
        <li>Appwrite</li>
      </ul>

      <h3>3. AI Development Tools</h3>
      <p>AI integrations can improve personalization, automation, and user experience:</p>
      <ul>
        <li>Gemini AI</li>
        <li>OpenAI</li>
        <li>Hugging Face</li>
      </ul>

      <h3>4. Design and UI Tools</h3>
      <p>These tools help teams design interfaces and presentations faster:</p>
      <ul>
        <li>Figma</li>
        <li>Canva</li>
        <li>Excalidraw</li>
      </ul>

      <h3>5. Deployment Platforms</h3>
      <p>Deploying early helps identify bugs before the final presentation:</p>
      <ul>
        <li>Vercel</li>
        <li>Netlify</li>
        <li>Render</li>
      </ul>
    `
  },
  'api-best-practices': {
    title: 'API Integration Best Practices',
    author: 'David Kim',
    date: 'May 14, 2026',
    time: '10 min read',
    content: `
      <h2>Introduction</h2>
      <p>Modern hackathon projects depend heavily on APIs for authentication, AI, payments, maps, storage, and communication features. Proper API integration improves development speed and product quality.</p>

      <h3>1. Read Documentation Carefully</h3>
      <p>Before integrating an API, ensure you:</p>
      <ul>
        <li>Understand authentication methods</li>
        <li>Check request limits</li>
        <li>Test sample responses</li>
      </ul>
      <p>Reading documentation early prevents integration errors later.</p>

      <h3>2. Secure API Keys</h3>
      <p>Always store secrets in .env files.</p>
      <div style="background: var(--bg-tertiary); padding: 12px; border-radius: 8px; margin-bottom: 16px; border: 1px dashed var(--border)">
        <code>API_KEY=your_secret_key</code>
      </div>
      <p><strong>Never expose:</strong></p>
      <ul>
        <li>Secret keys or Admin keys</li>
        <li>Tokens in frontend code</li>
      </ul>

      <h3>3. Test APIs Before Integration</h3>
      <p>Testing APIs separately helps debug issues faster. Recommended tools:</p>
      <ul>
        <li>Postman</li>
        <li>Thunder Client</li>
      </ul>

      <h3>4. Handle API Failures Properly</h3>
      <p>APIs may fail because of:</p>
      <ul>
        <li>Rate limits or Invalid credentials</li>
        <li>Network issues or Billing restrictions</li>
      </ul>
      <p>Always display useful error messages instead of crashing the application.</p>

      <h3>5. Optimize API Usage</h3>
      <p>Many APIs have request limits. Best practices:</p>
      <ul>
        <li>Avoid unnecessary requests</li>
        <li>Cache repeated data</li>
        <li>Use async operations efficiently</li>
      </ul>
      <p>Efficient API usage improves performance and reduces costs.</p>
    `
  }
};

export default function GuideDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const guide = guideContent[id as keyof typeof guideContent];

  if (!guide) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Guide not found</h1>
        <Link href="/guides">Back to Guides</Link>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
        <Link href="/guides" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '32px', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          Back to Resource Center
        </Link>

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: '1.2' }}>{guide.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="var(--accent)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{guide.author}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={12} /> {guide.date} • <Clock size={12} /> {guide.time}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}><Share2 size={18} /></button>
              <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}><Bookmark size={18} /></button>
            </div>
          </div>
        </div>

        <div 
          className="guide-content"
          style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}
          dangerouslySetInnerHTML={{ __html: guide.content }} 
        />

        <style jsx global>{`
          .guide-content h2 { margin-top: 40px; margin-bottom: 20px; font-size: 1.8rem; }
          .guide-content h3 { margin-top: 32px; margin-bottom: 16px; font-size: 1.4rem; color: var(--accent); }
          .guide-content p { margin-bottom: 24px; line-height: 1.8; color: var(--text-secondary); }
          .guide-content ul { margin-bottom: 24px; padding-left: 20px; list-style-type: disc; }
          .guide-content li { margin-bottom: 12px; line-height: 1.6; color: var(--text-secondary); }
          .guide-content code { background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        `}</style>
      </div>
    </>
  );
}
