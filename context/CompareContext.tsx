"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  event: string;
  techStack: string[];
  link: string;
  category: string;
}

interface CompareContextType {
  selectedProjects: Project[];
  addToCompare: (project: Project) => void;
  startComparison: (project: Project, allProjects: Project[]) => void;
  removeFromCompare: (projectId: string) => void;
  clearCompare: () => void;
  isInCompare: (projectId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  // Load from session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("hackprep_compare");
    if (saved) {
      try {
        setSelectedProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse compare projects", e);
      }
    }
  }, []);

  // Save to session storage on change
  useEffect(() => {
    sessionStorage.setItem("hackprep_compare", JSON.stringify(selectedProjects));
  }, [selectedProjects]);

  const addToCompare = (project: Project) => {
    setSelectedProjects((prev) => {
      if (prev.find((p) => p.id === project.id)) return prev;
      const newList = [...prev, project];
      return newList.slice(-3); // Keep only last 3
    });
  };

  const startComparison = (project: Project, allProjects: Project[]) => {
    // 1. Add the clicked project
    const list = [project];
    
    // 2. Pick 2 others from allProjects that aren't the current one
    const others = allProjects
      .filter(p => p.id !== project.id)
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 2);
    
    const finalSelection = [...list, ...others];
    setSelectedProjects(finalSelection);
    sessionStorage.setItem("hackprep_compare", JSON.stringify(finalSelection));
  };

  const removeFromCompare = (projectId: string) => {
    setSelectedProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const clearCompare = () => {
    setSelectedProjects([]);
  };

  const isInCompare = (projectId: string) => {
    return selectedProjects.some((p) => p.id === projectId);
  };

  return (
    <CompareContext.Provider
      value={{ selectedProjects, addToCompare, startComparison, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
