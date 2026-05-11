import { Injectable } from '@nestjs/common';

export class Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  score: number;
  trending: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

@Injectable()
export class IdeasService {
  private readonly ideas: Idea[] = [
    {
      id: 1,
      title: "AI Resume Optimizer",
      description: "Auto-tailor resumes for job descriptions using LLMs with keyword scoring and gap analysis.",
      category: "AI/ML",
      tags: ["Python", "OpenAI", "React"],
      score: 94,
      trending: true,
      difficulty: "Intermediate",
      duration: "24h"
    },
    {
      id: 2,
      title: "DeFi Budget Tracker",
      description: "Real-time wallet analytics with gas fee predictions and automated savings insights.",
      category: "FinTech",
      tags: ["Solidity", "Web3.js", "Next.js"],
      score: 87,
      trending: false,
      difficulty: "Advanced",
      duration: "38h"
    },
    {
      id: 3,
      title: "Mental Health Check-In Bot",
      description: "Conversational mood tracker with personalized micro-journaling prompts and insights.",
      category: "Health",
      tags: ["Node.js", "NLP", "Vue"],
      score: 91,
      trending: true,
      difficulty: "Beginner",
      duration: "20h"
    },
    {
      id: 4,
      title: "Smart Garden Controller",
      description: "IoT system for automated plant watering based on soil moisture and local weather forecasts.",
      category: "IoT",
      tags: ["C++", "Arduino", "Firebase"],
      score: 82,
      trending: false,
      difficulty: "Intermediate",
      duration: "15h"
    },
    {
      id: 5,
      title: "Code Collab Real-time Editor",
      description: "Multiplayer code editor with integrated voice chat and AI pair programming assistance.",
      category: "DevTools",
      tags: ["Socket.io", "React", "Monaco"],
      score: 89,
      trending: true,
      difficulty: "Advanced",
      duration: "42h"
    },
    {
      id: 6,
      title: "Carbon Footprint Tracker",
      description: "Browser extension that calculates the carbon cost of your online shopping cart items.",
      category: "Climate",
      tags: ["JS", "API", "React"],
      score: 85,
      trending: false,
      difficulty: "Beginner",
      duration: "12h"
    }
  ];

  findAll(): Idea[] {
    return this.ideas;
  }

  findOne(id: number): Idea | undefined {
    return this.ideas.find(idea => idea.id === id);
  }

  search(q?: string, filter?: string): Idea[] {
    let result = this.ideas;

    if (filter && filter !== 'all') {
      result = result.filter(i => i.category.toLowerCase() === filter.toLowerCase());
    }

    if (q) {
      const query = q.toLowerCase();
      result = result.filter(i =>
        i.title.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query) ||
        i.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }
}
