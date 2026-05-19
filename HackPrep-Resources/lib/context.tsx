"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface SavedIdeasContextType {
  savedIdeas: any[];
  unseenCount: number;
  saveIdea: (idea: any) => void;
  removeIdea: (id: number) => void;
  updateIdea: (id: number, updatedIdea: any) => void;
  markAllAsSeen: () => void;
}

const SavedIdeasContext = createContext<SavedIdeasContextType | undefined>(undefined);

export function SavedIdeasProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({
    ideas: [] as any[],
    unseenCount: 0,
  });

  const saveIdea = useCallback((idea: any) => {
    setState((prev) => {
      if (prev.ideas.find((i) => i.id === idea.id)) return prev;
      return {
        ideas: [...prev.ideas, idea],
        unseenCount: prev.unseenCount + 1,
      };
    });
  }, []);

  const removeIdea = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      ideas: prev.ideas.filter((i) => i.id !== id),
    }));
  }, []);

  const updateIdea = useCallback((id: number, updatedIdea: any) => {
    setState((prev) => ({
      ...prev,
      ideas: prev.ideas.map((i) => (i.id === id ? { ...i, ...updatedIdea } : i)),
    }));
  }, []);

  const markAllAsSeen = useCallback(() => {
    setState((prev) => {
      if (prev.unseenCount === 0) return prev; // Avoid unnecessary re-renders
      return {
        ...prev,
        unseenCount: 0,
      };
    });
  }, []);

  return (
    <SavedIdeasContext.Provider 
      value={{ 
        savedIdeas: state.ideas, 
        unseenCount: state.unseenCount, 
        saveIdea, 
        removeIdea,
        updateIdea,
        markAllAsSeen 
      }}
    >
      {children}
    </SavedIdeasContext.Provider>
  );
}

export function useSavedIdeas() {
  const context = useContext(SavedIdeasContext);
  if (context === undefined) {
    throw new Error("useSavedIdeas must be used within a SavedIdeasProvider");
  }
  return context;
}
