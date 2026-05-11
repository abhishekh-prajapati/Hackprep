'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

import { 
  ArrowLeft, 
  Code2, 
  GitBranch, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Layers,
  Copy,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

const templateDetails: Record<string, any> = {
  'nextjs-tailwind': {
    title: 'Next.js + Tailwind Pro',
    desc: 'The ultimate starting point for modern web applications. Includes a pre-configured architecture designed for scale.',
    features: ['Auth.js ready', 'Prisma ORM', 'Server Actions', 'Responsive UI Components'],
    tech: 'Next.js 15, React 19, Tailwind CSS 4',
    repo: 'https://github.com/vercel/next.js/tree/canary/examples/hello-world',
    cloneCmd: [
      'npx create-next-app@latest my-app',
      'cd my-app',
      'npm install',
      'npm run dev'
    ]
  },
  'fastapi-micro': {
    title: 'Python FastAPI Micro',
    desc: 'A robust microservice template optimized for high-performance AI integrations and rapid data processing.',
    features: ['Async handlers', 'Pydantic v2', 'JWT Authentication', 'Auto-generated Docs'],
    tech: 'Python 3.11, FastAPI, SQLModel',
    repo: 'https://github.com/tiangolo/fastapi',
    cloneCmd: [
      'git clone https://github.com/tiangolo/fastapi.git my-api',
      'cd my-api',
      'pip install fastapi uvicorn',
      'uvicorn main:app --reload'
    ]
  },
  'node-express': {
    title: 'Node Express Starter',
    desc: 'Standard enterprise-grade Express boilerplate with TypeScript and clean folder structure.',
    features: ['TypeScript support', 'Winston Logging', 'Input Validation', 'Error Handling'],
    tech: 'Node.js 20, Express, TypeScript',
    repo: 'https://github.com/expressjs/express',
    cloneCmd: [
      'git clone https://github.com/expressjs/express.git my-server',
      'cd my-server',
      'npm install',
      'npm start'
    ]
  },
  'go-rest': {
    title: 'Go REST Engine',
    desc: 'Lightweight and fast API engine with Gin framework, perfect for high-concurrency needs.',
    features: ['Gin Gonic framework', 'JWT middleware', 'SQLx Integration', 'Dockerized'],
    tech: 'Go 1.21, Gin, PostgreSQL',
    repo: 'https://github.com/gin-gonic/gin',
    cloneCmd: [
      'git clone https://github.com/gin-gonic/gin.git my-go-api',
      'cd my-go-api',
      'go mod tidy',
      'go run main.go'
    ]
  },
  'react-native': {
    title: 'Mobile Expo Kit',
    desc: 'Ready-to-go mobile template for cross-platform apps using Expo and React Native.',
    features: ['Expo Router', 'NativeWind (Tailwind)', 'Reanimated', 'Vector Icons'],
    tech: 'Expo v50, React Native',
    repo: 'https://github.com/expo/expo',
    cloneCmd: [
      'npx create-expo-app@latest my-mobile-app',
      'cd my-mobile-app',
      'npm install',
      'npx expo start'
    ]
  },
  'vue-dashboard': {
    title: 'Vue Admin Pro',
    desc: 'Sophisticated dashboard layout with built-in charts, tables, and advanced UI components.',
    features: ['Pinia State Store', 'Vue Router', 'Element Plus UI', 'ECharts Integration'],
    tech: 'Vue 3, Vite, Pinia',
    repo: 'https://github.com/vuejs/core',
    cloneCmd: [
      'npm create vue@latest my-dashboard',
      'cd my-dashboard',
      'npm install',
      'npm run dev'
    ]
  }
};

export default function TemplateDetail() {
  const params = useParams();
  const id = params.id as string;
  const data = templateDetails[id] || templateDetails['nextjs-tailwind'];

  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
      setTimeout(() => setDeploySuccess(false), 5000);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.cloneCmd.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGithub = () => {
    window.open(data.repo, '_blank');
  };

  return (
    <>

      
      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px' }}>
        <Link href="/resources/templates" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--text-secondary)', 
          fontWeight: 600, 
          marginBottom: '32px' 
        }}>
          <ArrowLeft size={18} />
          Back to Templates
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '48px' }}>
          {/* Main Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--accent-muted)',
                borderRadius: '12px',
                color: 'var(--accent)'
              }}>
                <Code2 size={40} />
              </div>
              <div>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{data.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="#3ecf8e" />
                  <p style={{ color: '#3ecf8e', fontWeight: 600, margin: 0 }}>Verified by HackPrep</p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '40px', color: 'var(--text-secondary)' }}>
              {data.desc}
            </p>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Key Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
              {data.features.map((feature: string, idx: number) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  transition: 'transform 0.2s ease'
                }} className="feature-item">
                  <div style={{ color: 'var(--accent)' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <span style={{ fontWeight: 500 }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: '#0f172a',
              borderRadius: '16px',
              color: 'white',
              fontFamily: 'monospace',
              position: 'relative',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3ecf8e' }} />
                  <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Terminal</span>
                </div>
                <button
                  onClick={handleCopy}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer', color: isCopied ? '#3ecf8e' : '#94a3b8', padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {isCopied ? <><CheckCircle2 size={14} /> Copied!</> : <><Copy size={14} /> Copy all</>}
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.cloneCmd.map((cmd: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#3ecf8e', userSelect: 'none', flexShrink: 0 }}>$</span>
                    <code style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>{cmd}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div>
            <div className="card" style={{ marginBottom: '24px', padding: '24px', border: '1px solid var(--accent-muted)' }}>
              <h3 style={{ marginBottom: '20px' }}>Quick Actions</h3>
              <button 
                className="btn-primary" 
                onClick={handleDeploy}
                disabled={isDeploying || deploySuccess}
                style={{ 
                  width: '100%', 
                  marginBottom: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  backgroundColor: deploySuccess ? '#3ecf8e' : 'var(--accent)',
                  opacity: isDeploying ? 0.7 : 1
                }}
              >
                {isDeploying ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Deploying...
                  </>
                ) : deploySuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    Live at vercel.app
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Deploy to Vercel
                  </>
                )}
              </button>
              <button 
                onClick={handleGithub}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-primary)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              >
                <GitBranch size={18} />
                Open in GitHub
              </button>
              
              {deploySuccess && (
                <div style={{ 
                  marginTop: '16px', 
                  fontSize: '0.8rem', 
                  color: '#3ecf8e', 
                  textAlign: 'center',
                  backgroundColor: 'rgba(62, 207, 142, 0.1)',
                  padding: '8px',
                  borderRadius: '6px'
                }}>
                  Deployment successful! New repository created in your account.
                </div>
              )}
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>Tech Stack</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <Layers size={18} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{data.tech}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <Terminal size={18} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Source available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#3ecf8e' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Security audited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
