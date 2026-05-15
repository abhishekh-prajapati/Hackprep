"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Star, 
  Clock, 
  BarChart3, 
  ArrowRight, 
  X, 
  Sparkles,
  Zap,
  Target,
  Loader2
} from "lucide-react";
import { getAiIdeas } from "./actions";
import { useSavedIdeas } from "@/lib/context";

const initialResources = [
  {
    id: 5,
    title: "Code Review Copilot",
    category: "DevTools",
    description:
      "AI-powered code review suggestions and bug detection.",
    tags: ["TypeScript", "Next.js", "AI"],
    difficulty: "Advanced",
    hours: "40h",
    score: 96,
    longDescription: "An advanced developer tool that integrates with Git workflows to provide intelligent code reviews. It identifies potential security vulnerabilities, performance bottlenecks, and architectural anti-patterns, offering specific refactoring suggestions based on best practices."
  },
  {
    id: 1,
    title: "AI Resume Optimizer",
    category: "AI/ML",
    description:
      "Auto-tailor resumes for job descriptions using LLMs with keyword scoring and analysis.",
    tags: ["Python", "OpenAI", "React"],
    difficulty: "Intermediate",
    hours: "24h",
    score: 94,
    longDescription: "A sophisticated tool that uses Large Language Models to analyze job descriptions and optimize resumes. It provides real-time feedback on keyword matching, formatting suggestions, and section-specific improvements to increase ATS compatibility."
  },
  {
    id: 3,
    title: "Mental Health Check-In Bot",
    category: "Health",
    description:
      "Mood tracking with personalized journaling prompts and AI insights.",
    tags: ["Node.js", "NLP", "Vue"],
    difficulty: "Beginner",
    hours: "20h",
    score: 91,
    longDescription: "An empathetic digital companion designed for daily mood tracking. It uses Natural Language Processing to understand journal entries and provides personalized reflection prompts, mindfulness exercises, and trend analysis to help users maintain their mental well-being."
  },
  {
    id: 7,
    title: "Cloud Cost Sentinel",
    category: "DevTools",
    description: "Automated cloud infrastructure optimization and budget alerting.",
    tags: ["AWS", "Terraform", "Go"],
    difficulty: "Advanced",
    hours: "30h",
    score: 89,
    longDescription: "A monitoring solution that analyzes multi-cloud usage patterns to identify idle resources and suggest cost-saving architectural changes. It provides automated budget enforcement and predictive spending analysis."
  },
  {
    id: 6,
    title: "EdTech Quiz Generator",
    category: "Education",
    description:
      "Generate quizzes automatically from PDFs and notes.",
    tags: ["AI", "Education", "OCR"],
    difficulty: "Beginner",
    hours: "15h",
    score: 88,
    longDescription: "A powerful educational tool that transforms static learning materials into interactive assessments. Using OCR and AI-driven content analysis, it extracts key concepts from PDFs or images to generate multiple-choice questions, flashcards, and study guides automatically."
  },
  {
    id: 2,
    title: "DeFi Budget Tracker",
    category: "FinTech",
    description:
      "Real-time wallet analytics with automated savings insights.",
    tags: ["Solidity", "Web3", "Next.js"],
    difficulty: "Advanced",
    hours: "36h",
    score: 87,
    longDescription: "A comprehensive decentralized finance dashboard that connects to multiple blockchain wallets. It tracks assets across protocols, analyzes spending patterns, and uses smart algorithms to suggest yield farming opportunities or automated savings strategies."
  },
  {
    id: 8,
    title: "Smart Supply Chain Tracker",
    category: "IoT",
    description: "End-to-end logistics monitoring with real-time condition sensors.",
    tags: ["RFID", "Azure", "React Native"],
    difficulty: "Intermediate",
    hours: "48h",
    score: 85,
    longDescription: "An IoT-driven logistics platform that tracks goods in transit, monitoring temperature, humidity, and location. It provides predictive arrival times and automated alerts for supply chain disruptions."
  },
  {
    id: 4,
    title: "Smart Pantry Manager",
    category: "IoT",
    description:
      "Track kitchen inventory and reduce food waste using automation.",
    tags: ["IoT", "Sensors", "React"],
    difficulty: "Intermediate",
    hours: "18h",
    score: 82,
    longDescription: "An integrated system that uses IoT sensors and weight scales to monitor pantry items. It automatically generates shopping lists, suggests recipes based on expiring items, and provides data-driven insights to help households significantly reduce food waste."
  },
  {
    id: 9,
    title: "Green Energy Ledger",
    category: "Blockchain",
    description: "Peer-to-peer renewable energy trading platform.",
    tags: ["Ethereum", "Solidity", "Tailwind"],
    difficulty: "Advanced",
    hours: "50h",
    score: 81,
    longDescription: "A decentralized marketplace for homeowners with solar panels to sell excess energy to neighbors. It uses smart contracts to handle automated billing and energy distribution verification."
  },
  {
    id: 10,
    title: "AI Language Immersion",
    category: "Education",
    description: "Contextual language learning through AI-driven roleplay.",
    tags: ["Next.js", "GPT-4", "Whisper"],
    difficulty: "Intermediate",
    hours: "28h",
    score: 80,
    longDescription: "A language platform where users practice speaking in simulated real-world scenarios with AI avatars. It provides instant grammar correction, vocabulary suggestions, and cultural context."
  },
  {
    id: 11,
    title: "Cyber Threat Hunter",
    category: "DevTools",
    description: "Real-time network anomaly detection using machine learning.",
    tags: ["Python", "Scikit-Learn", "Grafana"],
    difficulty: "Advanced",
    hours: "45h",
    score: 79,
    longDescription: "A security tool that monitors network traffic patterns to identify zero-day threats and potential breaches. It uses behavioral analysis to flag suspicious activities that traditional firewalls miss."
  },
  {
    id: 12,
    title: "Eco-Route Planner",
    category: "IoT",
    description: "Optimize travel routes for minimum carbon footprint.",
    tags: ["Google Maps API", "Node.js", "Svelte"],
    difficulty: "Beginner",
    hours: "22h",
    score: 78,
    longDescription: "A navigation app that suggests routes based on fuel efficiency and public transport availability. It tracks carbon savings over time and gamifies sustainable commuting."
  }
];

const categories = [
  "All",
  "AI/ML",
  "FinTech",
  "Health",
  "DevTools",
  "Education",
  "Blockchain",
  "IoT",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIdea, setSelectedIdea] = useState<any | null>(null);
  const [displayResources, setDisplayResources] = useState(initialResources);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotSupported, setIsNotSupported] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { savedIdeas, saveIdea, removeIdea } = useSavedIdeas();

  const handleSaveToPlan = (idea: any) => {
    saveIdea(idea);
    setSelectedIdea(null);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setDisplayResources(initialResources);
      setIsNotSupported(false);
      setErrorMessage(null);
      return;
    }

    setIsLoading(true);
    setIsNotSupported(false);
    setErrorMessage(null);

    try {
      const result = await getAiIdeas(query);
      if (result === "NOT_SUPPORTED") {
        setIsNotSupported(true);
        setDisplayResources([]);
      } else {
        setDisplayResources(result);
        setIsNotSupported(false);
      }
    } catch (error: any) {
      console.error("Search failed:", error);
      setErrorMessage(error?.message || "Something went wrong. Please try again.");
      setDisplayResources(initialResources);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResources = useMemo(() => {
    if (isNotSupported) return [];
    return displayResources.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesCategory;
    });
  }, [displayResources, selectedCategory, isNotSupported]);

  return (
    <div className="px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Dashboard Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-[2rem] border-2 border-[var(--hp-border)] flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center text-[var(--hp-primary)] group-hover:scale-110 transition-transform">
              <Sparkles size={32} />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Global Ideas</p>
              <h3 className="text-3xl font-black text-[var(--hp-dark)]">1,428</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-[2rem] border-2 border-[var(--hp-border)] flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Project Plane</p>
              <h3 className="text-3xl font-black text-[var(--hp-dark)]">{savedIdeas.length} Active</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-[2rem] border-2 border-[var(--hp-border)] flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <Zap size={32} />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">AI Credits</p>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-black text-[var(--hp-dark)]">∞</h3>
                <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full">PRO</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-[2.5rem] bg-[var(--hp-dark)] px-8 py-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} />
          </div>
          
          <div className="relative z-10">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--hp-primary)]">
              <span className="h-[2px] w-8 bg-[var(--hp-primary)]"></span>
              01 / Explore
            </p>

            <h1 className="mb-6 text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Premium <span className="text-[var(--hp-primary)]">Hackathon</span> Concepts
            </h1>

            <p className="max-w-2xl text-xl text-gray-400 font-medium">
              Curated, AI-validated ideas with full tech stacks and implementation roadmaps ready for your next big build.
            </p>
          </div>
        </motion.div>



        {/* Filter Section */}
        <div id="explore" className="mb-10 space-y-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[var(--hp-primary)]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              placeholder="Search by title, technology, or keywords..."
              className="w-full rounded-2xl border-2 border-[var(--hp-border)] bg-white/80 backdrop-blur-sm px-14 py-5 text-lg font-medium outline-none transition-all focus:border-[var(--hp-primary)] focus:bg-white focus:shadow-lg"
            />
            <button 
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl bg-[var(--hp-dark)] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[var(--hp-primary)] hover:shadow-lg active:scale-95"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Ask AI"}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[var(--hp-dark)] text-white shadow-lg scale-105"
                    : "bg-white text-[var(--hp-text-light)] border border-[var(--hp-border)] hover:border-[var(--hp-primary)] hover:text-[var(--hp-primary)] hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--hp-dark)] text-xs font-bold text-white">
              {filteredResources.length}
            </div>
            <p className="text-sm font-bold text-[var(--hp-text-light)] uppercase tracking-wider">
              {isLoading ? "Generating Ideas..." : "Ideas Available"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-[var(--hp-primary)]">
            <Zap size={16} />
            <span>AI-Ranked for Complexity & Impact</span>
          </div>
        </div>

        {/* Error Banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-bold">!</div>
                <div>
                  <p className="font-bold text-red-700 text-sm mb-0.5">AI Generation Failed</p>
                  <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="rounded-lg bg-red-100 px-4 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-200"
                >
                  Retry
                </button>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Section */}
        <motion.div 
          layout
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Loading Skeletons
              [1, 2, 3].map((i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="animate-pulse rounded-[2rem] border-2 border-[var(--hp-border)] bg-white p-8"
                >
                  <div className="mb-6 flex justify-between">
                    <div className="h-6 w-20 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-12 rounded-full bg-gray-100"></div>
                  </div>
                  <div className="mb-4 h-8 w-3/4 rounded-lg bg-gray-100"></div>
                  <div className="mb-8 h-20 w-full rounded-lg bg-gray-100"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 rounded-lg bg-gray-100"></div>
                    <div className="h-6 w-16 rounded-lg bg-gray-100"></div>
                  </div>
                </motion.div>
              ))
            ) : isNotSupported ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-6 rounded-full bg-orange-50 p-8 text-[var(--hp-primary)]">
                  <Target size={48} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-[var(--hp-dark)]">
                  We currently do not support this type of search.
                </h3>
                <p className="text-gray-500 font-medium">
                  Try searching for hackathon ideas, startups, or AI tools.
                </p>
              </motion.div>
            ) : (
              filteredResources.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedIdea(item)}
                  className="group cursor-pointer rounded-[2rem] border-2 border-[var(--hp-border)] bg-white p-8 shadow-sm transition-all hover:border-[var(--hp-primary)] hover:shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-[var(--hp-primary)] opacity-0 transition-opacity group-hover:opacity-[0.03]"></div>
                  
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold text-[var(--hp-primary)] border border-orange-100">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-sm font-black text-[var(--hp-dark)]">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      {item.score}
                    </div>
                  </div>

                  <h2 className="mb-4 text-2xl font-black text-[var(--hp-dark)] group-hover:text-[var(--hp-primary)] transition-colors">
                    {item.title}
                  </h2>

                  <p className="mb-8 line-clamp-3 text-lg font-medium leading-relaxed text-[var(--hp-text-light)]">
                    {item.description}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {item.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600 transition-colors group-hover:bg-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className={
                        item.difficulty === "Beginner" ? "text-green-500" :
                        item.difficulty === "Intermediate" ? "text-amber-500" : "text-rose-500"
                      } />
                      <span className={`text-sm font-bold ${
                        item.difficulty === "Beginner" ? "text-green-600" :
                        item.difficulty === "Intermediate" ? "text-amber-600" : "text-rose-600"
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                      <Clock size={16} />
                      {item.hours}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Modal / Detail View Overlay */}
        <AnimatePresence>
          {selectedIdea && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdea(null)}
                className="absolute inset-0 bg-[var(--hp-dark)]/80 backdrop-blur-md"
              />
              
              <motion.div
                layoutId={`card-${selectedIdea.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[3rem] bg-white shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedIdea(null)}
                  className="absolute right-8 top-8 rounded-full bg-gray-100 p-3 text-gray-500 transition-colors hover:bg-[var(--hp-primary)] hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="p-8 md:p-12">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="rounded-full bg-orange-50 px-6 py-2 text-sm font-bold text-[var(--hp-primary)] border border-orange-100">
                      {selectedIdea.category}
                    </span>
                    <div className="flex items-center gap-2 font-black text-[var(--hp-dark)]">
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      {selectedIdea.score} AI Score
                    </div>
                  </div>

                  <h2 className="mb-6 text-4xl md:text-5xl font-black text-[var(--hp-dark)] leading-tight">
                    {selectedIdea.title}
                  </h2>

                  <div className="mb-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                        <Target size={16} />
                        Difficulty Level
                      </div>
                      <div className="text-xl font-black text-[var(--hp-dark)]">{selectedIdea.difficulty}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-6 border border-gray-100">
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                        <Clock size={16} />
                        Estimated Build Time
                      </div>
                      <div className="text-xl font-black text-[var(--hp-dark)]">{selectedIdea.hours}</div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h3 className="mb-4 text-xl font-black text-[var(--hp-dark)] flex items-center gap-2">
                      Project Vision
                    </h3>
                    <p className="text-lg font-medium leading-relaxed text-[var(--hp-text-light)]">
                      {selectedIdea.longDescription}
                    </p>
                  </div>

                  <div className="mb-12">
                    <h3 className="mb-4 text-xl font-black text-[var(--hp-dark)]">Recommended Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedIdea.tags.map((tag: string) => (
                        <span key={tag} className="rounded-xl bg-[var(--hp-bg)] px-5 py-3 text-sm font-bold text-[var(--hp-dark)] border border-[var(--hp-border)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[var(--hp-primary)] px-8 py-5 text-lg font-black text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                      Generate Starter Kit <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => handleSaveToPlan(selectedIdea)}
                      className="flex items-center justify-center gap-3 rounded-2xl border-2 border-[var(--hp-dark)] bg-white px-8 py-5 text-lg font-black text-[var(--hp-dark)] transition-colors hover:bg-[var(--hp-dark)] hover:text-white"
                    >
                      Save to My Plane
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


      </div>
    </div>
  );
}