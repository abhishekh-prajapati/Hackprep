"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Target, Clock, ArrowRight, Trash2, X, Plus, Edit2, User } from "lucide-react";
import { useSavedIdeas } from "@/lib/context";
import Link from "next/link";

const categories = [
  "AI/ML", "FinTech", "Health", "DevTools", "Education", "Blockchain", "IoT",
  "AI", "Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "Computer Vision", "NLP", "Voice AI", "Robotics",
  "Embedded Systems", "Cybersecurity", "Ethical Hacking", "Web3", "Smart Contracts", "HealthTech", "EdTech", "AgriTech",
  "FoodTech", "LegalTech", "InsurTech", "HRTech", "PropTech", "ClimateTech", "Green Energy", "Renewable Energy", "Smart Cities", "GovTech",
  "SpaceTech", "DroneTech", "AR", "VR", "XR", "Metaverse", "Gaming", "Esports", "Cloud Computing", "DevOps",
  "Platform Engineering", "Site Reliability Engineering", "Data Science", "Big Data", "Data Analytics", "Data Visualization", "Quantum Computing", "Edge Computing", "Fog Computing", "5G Applications",
  "Mobile App Development", "Web Development", "Full Stack Development", "Backend Engineering", "Frontend Engineering", "UI/UX", "Design Systems", "API Development", "Microservices", "SaaS",
  "PaaS", "No-Code", "Low-Code", "Automation", "Workflow Automation", "Open Source", "Developer Tools", "Productivity Tools", "Browser Extensions", "Search Engines",
  "Recommendation Systems", "Social Media Tech", "Creator Economy", "Streaming Platforms", "Audio Technology", "Video Technology", "Digital Identity", "Authentication Systems", "Privacy Tech", "Biometric Systems",
  "Supply Chain Tech", "Logistics Tech", "Transportation Tech", "Mobility Solutions", "Smart Homes", "Wearable Tech", "Bioinformatics", "Mental Health Tech", "Fitness Tech", "Disaster Management Tech",
  "Accessibility Tech", "Assistive Technology", "Ecommerce Tech", "RetailTech", "MarketingTech", "AdTech", "Knowledge Management Systems", "Collaboration Tools", "Remote Work Tech", "AI Infrastructure",
  "Digital Twins", "Autonomous Vehicles", "Self Driving Systems", "AI Tutors", "AI Interviewers", "AI Resume Screening", "Fraud Detection", "Anti Scam Systems", "Threat Intelligence", "SOC Automation",
  "Passwordless Authentication", "Decentralized Identity", "Tokenization Platforms", "NFT Infrastructure", "Crypto Wallets", "DAO Tools", "Crowdfunding Platforms", "Stock Market Analytics", "Personal Finance Apps", "Tax Automation",
  "Billing Systems", "Payroll Systems", "CRM Platforms", "ERP Systems", "Inventory Management", "Warehouse Automation", "Smart Parking", "Traffic Management", "Navigation Systems", "Ride Sharing Platforms",
  "EV Infrastructure", "Battery Optimization", "Water Management Tech", "Waste Management Tech", "Carbon Tracking", "Air Quality Monitoring", "Wildlife Monitoring", "OceanTech", "Smart Farming", "Precision Agriculture",
  "Livestock Monitoring", "Weather Prediction Systems", "Satellite Data Platforms", "GIS Mapping", "Digital Healthcare Records", "Telemedicine", "Medical Imaging AI", "Drug Discovery AI", "Hospital Automation", "Elderly Care Tech",
  "Child Safety Tech", "Women Safety Tech", "Emergency Response Systems", "Disaster Prediction", "Earthquake Monitoring", "Flood Detection Systems", "Fire Detection Systems", "Smart Classrooms", "Virtual Labs", "Exam Proctoring Systems",
  "Skill Assessment Platforms", "Coding Platforms", "Language Learning Apps", "Knowledge Graphs", "Semantic Search", "AI Search Engines", "Multimodal AI", "AI Companions", "AI Copilots", "Prompt Engineering Tools",
  "AI Model Benchmarking", "AI Monitoring Systems", "MLOps", "LLMOps", "AI Safety", "Synthetic Data Generation", "Federated Learning", "TinyML", "GPU Optimization", "Compiler Technology",
  "Operating Systems", "Database Systems", "Vector Databases", "Distributed Systems", "Parallel Computing", "High Performance Computing", "Containerization", "Kubernetes Tools", "Serverless Computing", "CDN Optimization",
  "Networking Tools", "DNS Systems", "VPN Technology", "Email Infrastructure", "Messaging Platforms", "Real Time Communication", "Video Conferencing Tech", "Live Collaboration Systems", "Digital Whiteboards", "Virtual Event Platforms",
  "AI Code Review", "AI Bug Detection", "AI Pair Programming", "Code Visualization Tools", "Git Analytics", "CI/CD Platforms", "Test Automation", "API Testing Tools", "Load Testing Systems", "Observability Platforms",
  "Log Analytics", "Incident Management", "Cloud Cost Optimization", "FinOps", "Secure DevOps", "Runtime Security", "Malware Detection", "Ransomware Protection", "Phishing Detection", "Deepfake Detection",
  "Digital Forensics", "Threat Hunting", "Identity Access Management", "Zero Trust Security", "Secure File Sharing", "Password Managers", "Data Loss Prevention", "Backup Automation", "Disaster Recovery Systems", "Secure Communication Apps",
  "AI Powered Search", "Enterprise Search", "Internal Knowledge AI", "Research Automation", "AI Note Taking", "Meeting Summarization", "Transcription Systems", "Translation Systems", "Real Time Captions", "Speech Recognition",
  "Text To Speech", "Emotion Recognition AI", "Human Computer Interaction", "Gesture Recognition", "Eye Tracking Systems", "Brain Computer Interfaces", "Haptic Technology", "Virtual Humans", "Digital Avatars", "AI Influencers",
  "Virtual Production", "CGI Automation", "AI Video Editing", "AI Music Generation", "AI Art Platforms", "AI Story Generation", "Meme Generation Platforms", "Content Moderation", "Community Platforms", "Forum Systems",
  "Online Learning Communities", "Peer To Peer Networks", "Decentralized Storage", "File Compression Systems", "Data Synchronization", "Offline First Apps", "Progressive Web Apps", "Cross Platform Development", "Smart Assistants", "Calendar Automation",
  "Time Management Apps", "Habit Tracking", "Goal Tracking Systems", "Journaling Apps", "Mind Mapping Tools", "Brainstorming Platforms", "Digital Workspace Platforms", "Workspace Analytics", "Employee Wellness Platforms", "Recruitment Platforms",
  "Freelancing Platforms", "Gig Economy Platforms", "Startup Networking Platforms", "Investor Matching Systems", "Pitch Deck Analyzers", "Market Research Platforms", "Competitive Intelligence Tools", "Customer Feedback Analytics", "Survey Platforms", "Loyalty Programs",
  "Subscription Management", "Digital Payments", "QR Payment Systems", "UPI Solutions", "Buy Now Pay Later Systems", "Crypto Exchanges", "Smart Billing Systems", "Donation Platforms", "CharityTech", "Civic Engagement Platforms",
  "Resume Builders", "Portfolio Platforms", "AI Career Guidance", "Internship Platforms", "Campus Networking Apps", "Alumni Platforms", "Student Productivity Tools", "Attendance Systems", "Smart Timetables", "Digital Certificates",
  "Blockchain Credentials", "Online Voting Systems", "E-Governance Platforms", "Public Complaint Systems", "RTI Automation", "Court Case Tracking", "PoliceTech", "Prison Management Systems", "Border Security Tech", "DefenseTech",
  "Battlefield Simulation", "Military Robotics", "Surveillance Systems", "Face Recognition", "Smart ID Cards", "Smart Ticketing", "MetroTech", "RailwayTech", "Airport Automation", "Port Management Systems",
  "TourismTech", "Travel Planning AI", "Hotel Management Systems", "RestaurantTech", "Smart Menus", "Food Delivery Optimization", "Kitchen Automation", "Nutrition Tracking", "Diet Recommendation AI", "Recipe Generation AI",
  "Grocery Automation", "Retail Analytics", "Shelf Monitoring Systems", "Barcode Systems", "RFID Solutions", "Cashierless Stores", "Smart Mirrors", "FashionTech", "Virtual Try On", "BeautyTech",
  "Skin Analysis AI", "JewelryTech", "LuxuryTech", "Auction Platforms", "Marketplace Platforms", "B2B Commerce", "Wholesale Platforms", "Procurement Systems", "Vendor Management", "Contract Management",
  "Document Automation", "OCR Systems", "eSignature Platforms", "PDF Intelligence Tools", "Workflow Engines", "BPM Platforms", "Enterprise Automation", "AI Operations", "Autonomous Agents", "Multi Agent Systems",
  "Agent Collaboration Platforms", "Swarm Intelligence", "AI Governance", "Explainable AI", "Responsible AI", "AI Compliance", "AI Auditing Systems", "Prompt Security", "AI Red Teaming", "AI Detection Systems",
  "Synthetic Media Platforms", "AI Data Labeling", "Annotation Platforms", "Dataset Management", "Data Pipelines", "ETL Automation", "Streaming Data Systems", "Event Driven Systems", "Message Queue Systems", "Edge AI",
  "Smart Sensors", "Industrial IoT", "Factory Automation", "Predictive Maintenance", "Manufacturing Analytics", "Digital Manufacturing", "CAD Automation", "3D Printing Tech", "CNC Automation", "Smart Construction",
  "Real Estate Analytics", "Home Automation", "Building Management Systems", "Smart Lighting", "Smart Security Cameras", "Visitor Management Systems", "Energy Monitoring", "Utility Billing Systems", "Water Leakage Detection", "Smart Grids",
  "Solar Monitoring Systems", "Wind Energy Analytics", "EV Fleet Management", "Charging Station Apps", "Fleet Tracking", "Cold Chain Monitoring", "Smart Logistics", "Route Optimization", "Delivery Tracking", "Last Mile Delivery",
  "Maritime Analytics", "FishingTech", "Aquaculture Monitoring", "ForestryTech", "Land Record Digitization", "Smart Villages", "RuralTech", "Community Health Systems", "Vaccination Tracking", "Blood Donation Platforms",
  "Organ Donation Platforms", "Ambulance Dispatch Systems", "ICU Monitoring", "Wearable Health Sensors", "AI Fitness Coaches", "Sports Analytics", "Athlete Performance Tracking", "Fantasy Sports Platforms", "Sports Streaming Tech", "Referee Assistance Systems",
  "Fan Engagement Platforms", "Music Streaming Platforms", "Podcast Platforms", "Audiobook Platforms", "Digital Publishing", "News Aggregators", "Fact Checking Platforms", "Misinformation Detection", "Sentiment Analysis", "Trend Prediction",
  "Viral Content Analytics", "Creator Monetization", "Influencer Analytics", "Social Listening Tools", "Reputation Management", "Community Moderation AI", "Dating Apps", "Matchmaking Systems", "Family Management Apps", "ParentingTech",
  "PetTech", "Pet Health Monitoring", "Animal Tracking Systems", "Zoo Management Systems", "Smart Recycling", "Circular Economy Platforms", "Eco Commerce", "Green Transportation", "Sustainable Packaging", "Smart Textiles",
  "Nanotech Applications", "Biotechnology Platforms", "Gene Analysis Tools", "Personalized Medicine", "Clinical Trial Platforms", "Pharma Supply Chains", "Chemical Process Automation", "Material Science Platforms", "Scientific Research Tools", "Academic Collaboration Platforms",
  "Citation Management Systems", "Plagiarism Detection", "Remote Lab Platforms", "Hackathon Platforms", "Coding Contest Systems", "Bug Bounty Platforms", "Open Innovation Platforms", "Idea Validation Tools", "Startup Incubation Platforms", "Venture Capital Analytics",
  "Business Intelligence Platforms", "Decision Support Systems", "Forecasting Platforms", "Risk Analytics", "Compliance Management", "Audit Automation", "Procurement Analytics", "Sales Automation", "Conversational Commerce", "Digital Ecosystem Platforms"
];

export default function MyPlanPage() {
  const { savedIdeas, saveIdea, removeIdea, updateIdea, markAllAsSeen } = useSavedIdeas();
  const [selectedIdea, setSelectedIdea] = useState<any | null>(null);
  const [editingIdea, setEditingIdea] = useState<any | null>(null);

  useEffect(() => {
    markAllAsSeen();
  }, [markAllAsSeen]);

  const handleOpenAdd = () => {
    setEditingIdea({
      title: "",
      category: "AI/ML",
      description: "",
      longDescription: "",
      tags: "",
      difficulty: "Beginner",
      hours: "10h",
      score: 100,
      isCustom: true
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tags back into array before saving
    const finalTags = typeof editingIdea.tags === "string" 
      ? editingIdea.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : editingIdea.tags;
      
    const finalIdea = { ...editingIdea, tags: finalTags };

    if (!finalIdea.id) {
      saveIdea({ ...finalIdea, id: Date.now() });
    } else {
      updateIdea(finalIdea.id, { ...finalIdea, isEdited: true });
    }
    setEditingIdea(null);
  };

  return (
    <div className="px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-[2.5rem] bg-white px-8 py-12 border-2 border-[var(--hp-border)] shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--hp-primary)]">
                <span className="h-[2px] w-8 bg-[var(--hp-primary)]"></span>
                02 / Plane
              </p>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-[var(--hp-dark)]">
                My <span className="text-[var(--hp-primary)]">Project</span> Plane
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleOpenAdd}
                className="flex items-center gap-2 rounded-[1.5rem] bg-[var(--hp-primary)] px-6 py-4 text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <Plus size={20} />
                Add Project
              </button>
              <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[var(--hp-primary)]/10 text-[var(--hp-primary)] font-black text-3xl shadow-inner border-2 border-[var(--hp-primary)]/20">
                {savedIdeas.length}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        {savedIdeas.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center rounded-[2.5rem] border-2 border-dashed border-[var(--hp-border)] bg-white/50"
          >
            <div className="mb-6 rounded-full bg-gray-50 p-8 text-gray-400">
              <Target size={48} />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[var(--hp-dark)]">
              No projects saved yet
            </h3>
            <p className="mb-8 text-gray-500 font-medium max-w-md">
              Head over to the Dashboard to explore AI-validated hackathon ideas and save them here to build your plan.
            </p>
            <Link 
              href="/"
              className="rounded-xl bg-[var(--hp-primary)] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[var(--hp-primary-dark)] hover:shadow-lg active:scale-95"
            >
              Explore Ideas
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {savedIdeas.map((idea) => (
                <motion.div
                  key={`saved-${idea.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedIdea(idea)}
                  className="bg-white cursor-pointer rounded-[2rem] border-2 border-[var(--hp-border)] p-8 shadow-sm hover:border-[var(--hp-primary)] hover:shadow-xl transition-all relative overflow-hidden group flex flex-col"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-[var(--hp-primary)] opacity-0 transition-opacity group-hover:opacity-[0.03]"></div>
                  
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold text-[var(--hp-primary)] border border-orange-100">
                        {idea.category}
                      </span>
                      {idea.isEdited && (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-500 border border-blue-100 tracking-wider uppercase">
                          Edited
                        </span>
                      )}
                    </div>
                    {idea.isCustom ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" title="Created by Alex Johnson">
                        <User size={16} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-sm font-black text-[var(--hp-dark)]">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        {idea.score}
                      </div>
                    )}
                  </div>

                  <h3 className="font-black text-2xl text-[var(--hp-dark)] mb-4 line-clamp-2 group-hover:text-[var(--hp-primary)] transition-colors">
                    {idea.title}
                  </h3>
                  
                  <p className="text-gray-500 font-medium mb-6 line-clamp-3 text-sm flex-1">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {idea.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                        {tag}
                      </span>
                    ))}
                    {idea.tags.length > 3 && (
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                        +{idea.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* Start Project Logic */ }}
                      className="flex-1 rounded-xl bg-[var(--hp-dark)] py-3 text-sm font-bold text-white transition-all hover:bg-[var(--hp-primary)] hover:shadow-md"
                    >
                      Start Project
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingIdea({
                          ...idea,
                          tags: Array.isArray(idea.tags) ? idea.tags.join(", ") : idea.tags
                        });
                      }}
                      className="p-3 rounded-xl bg-orange-50 text-[var(--hp-primary)] hover:bg-orange-100 hover:text-orange-600 transition-colors"
                      title="Edit Idea"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeIdea(idea.id);
                      }}
                      className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                      title="Remove from Plan"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

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
                className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[3rem] bg-white shadow-2xl max-h-[90vh] flex flex-col"
              >
                <button 
                  onClick={() => setSelectedIdea(null)}
                  className="absolute right-8 top-8 rounded-full bg-gray-100 p-3 text-gray-500 transition-colors hover:bg-[var(--hp-primary)] hover:text-white z-20"
                >
                  <X size={24} />
                </button>

                <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="rounded-full bg-orange-50 px-6 py-2 text-sm font-bold text-[var(--hp-primary)] border border-orange-100">
                      {selectedIdea.category}
                    </span>
                    {selectedIdea.isEdited && (
                      <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-500 border border-blue-100 tracking-wider uppercase">
                        Edited
                      </span>
                    )}
                    {selectedIdea.isCustom ? (
                      <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-600 border border-blue-100 shadow-sm">
                        <User size={18} />
                        <span>Created by Alex Johnson</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 font-black text-[var(--hp-dark)]">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        {selectedIdea.score} AI Score
                      </div>
                    )}
                  </div>

                  <h2 className="mb-6 text-4xl md:text-5xl font-black text-[var(--hp-dark)] leading-tight pr-12">
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

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[var(--hp-primary)] px-8 py-5 text-lg font-black text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                      Start Project <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {editingIdea && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingIdea(null)}
                className="absolute inset-0 bg-[var(--hp-dark)]/80 backdrop-blur-md"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[3rem] bg-white shadow-2xl max-h-[90vh] flex flex-col"
              >
                <div className="flex items-center justify-between border-b border-gray-100 p-8 pb-6">
                  <h2 className="text-3xl font-black text-[var(--hp-dark)]">
                    {editingIdea.id ? "Edit Project" : "Add Project"}
                  </h2>
                  <button 
                    onClick={() => setEditingIdea(null)}
                    className="rounded-full bg-gray-100 p-3 text-gray-500 transition-colors hover:bg-[var(--hp-primary)] hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveForm} className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
                    <input 
                      required
                      type="text" 
                      value={editingIdea.title}
                      onChange={(e) => setEditingIdea({...editingIdea, title: e.target.value})}
                      className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)]"
                      placeholder="e.g. AI Study Companion"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                      <input 
                        list="category-suggestions"
                        value={editingIdea.category}
                        onChange={(e) => {
                          const typed = e.target.value;
                          const exactMatch = categories.find(c => c.toLowerCase() === typed.toLowerCase());
                          setEditingIdea({...editingIdea, category: exactMatch || typed});
                        }}
                        className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)] bg-white"
                        placeholder="Select or type..."
                      />
                      <datalist id="category-suggestions">
                        {categories
                          .filter(c => c !== "Other" && c.toLowerCase().includes((editingIdea.category || "").toLowerCase()))
                          .sort((a, b) => {
                            const query = (editingIdea.category || "").toLowerCase();
                            const aStarts = a.toLowerCase().startsWith(query);
                            const bStarts = b.toLowerCase().startsWith(query);
                            if (aStarts && !bStarts) return -1;
                            if (!aStarts && bStarts) return 1;
                            return 0;
                          })
                          .slice(0, 5)
                          .map(c => (
                            <option key={c} value={c} />
                          ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                      <select 
                        value={editingIdea.difficulty}
                        onChange={(e) => setEditingIdea({...editingIdea, difficulty: e.target.value})}
                        className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)] bg-white"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                    <input 
                      required
                      type="text" 
                      value={editingIdea.description}
                      onChange={(e) => setEditingIdea({...editingIdea, description: e.target.value})}
                      className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)]"
                      placeholder="A brief 1-sentence summary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Vision</label>
                    <textarea 
                      required
                      rows={4}
                      value={editingIdea.longDescription}
                      onChange={(e) => setEditingIdea({...editingIdea, longDescription: e.target.value})}
                      className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)] resize-none"
                      placeholder="Explain the full scope of the project..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Build Time</label>
                      <input 
                        required
                        type="text" 
                        value={editingIdea.hours}
                        onChange={(e) => setEditingIdea({...editingIdea, hours: e.target.value})}
                        className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)]"
                        placeholder="e.g. 24h"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tech Stack (comma separated)</label>
                      <input 
                        required
                        type="text" 
                        value={editingIdea.tags || ""}
                        onChange={(e) => setEditingIdea({...editingIdea, tags: e.target.value })}
                        className="w-full rounded-xl border-2 border-[var(--hp-border)] px-4 py-3 font-medium outline-none transition-colors focus:border-[var(--hp-primary)]"
                        placeholder="React, Node.js, AI"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setEditingIdea(null)}
                      className="flex-1 rounded-xl border-2 border-[var(--hp-border)] bg-white py-4 text-lg font-bold text-[var(--hp-dark)] transition-colors hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 rounded-xl bg-[var(--hp-primary)] py-4 text-lg font-black text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {editingIdea.id ? "Save Changes" : "Create Project"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
