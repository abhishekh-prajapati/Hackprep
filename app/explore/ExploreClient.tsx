"use client";

import { useState, useEffect } from "react";
import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";
import "./explore.css";

interface Project {
  id: string;
  title: string;
  description: string;
  event: string;
  techStack: string[];
  link: string;
  category: string;
}

const CATEGORIES = ["All", "AI", "Web3", "HealthTech", "FinTech", "Social Impact", "Gaming"];

export default function ExploreClient() {
  const { addToCompare, isInCompare, selectedProjects } = useCompare();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (searchQuery: string, activeFilter: string, isFeatured = false) => {
    if (!isFeatured) setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery || "popular hackathon projects", filter: activeFilter }),
      });
      const data = await res.json();
      if (data.error && !data.data) throw new Error(data.error.message);
      
      if (isFeatured) {
        setFeaturedProjects((data.data || []).slice(0, 3));
      } else {
        setProjects(data.data || []);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      if (!isFeatured) setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    // Fetch featured AI projects specifically
    fetchProjects("top best AI projects", "AI", true);
    // Fetch initial grid
    fetchProjects("", "All");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects(query, filter);
  };

  const handleCompareClick = (project: Project) => {
    if (!isInCompare(project.id) && selectedProjects.length >= 3) {
      setToastMessage("Maximum 3 ideas can be compared");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    
    if (!isInCompare(project.id)) {
      addToCompare(project);
    }
    router.push("/compare");
  };

  return (
    <div className="explore-container">
      <header className="explore-header">
        <h1 className="explore-title">Explore Projects</h1>
        <p className="explore-subtitle">
          Real-world hackathon submissions validated by Gemini AI. No generated data, only actual projects.
        </p>
      </header>

      {/* Compare Floating Indicator */}
      {selectedProjects.length > 0 && (
        <div className="compare-indicator" onClick={() => router.push("/compare")}>
          <div className="compare-count">{selectedProjects.length}</div>
          <span>Compare Ideas</span>
          <button className="compare-go-btn">→</button>
        </div>
      )}

      {/* Featured AI Section */}
      {!query && filter === "All" && featuredProjects.length > 0 && (
        <section className="featured-section">
          <div className="section-header">
            <h2 className="section-title">✨ Top Featured AI Projects</h2>
            <span className="section-badge">Curated by AI</span>
          </div>
          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <div key={`featured-${project.id}`} className="project-card featured">
                <div className="featured-badge">Featured</div>
                <div className="project-content">
                  <div className="card-top">
                    <span className="project-tag">{project.category}</span>
                    <button 
                      className={`compare-btn-icon ${isInCompare(project.id) ? "active" : ""} ${!isInCompare(project.id) && selectedProjects.length >= 3 ? "disabled" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCompareClick(project);
                      }}
                      title={isInCompare(project.id) ? "View Comparison" : "Add to Compare"}
                    >
                      {isInCompare(project.id) ? "✓" : "+"}
                    </button>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-meta">
                    <span className="project-event">{project.event}</span>
                    <div className="card-actions">
                      <a href={project.link} target="_blank" className="view-action-btn">View Project →</a>
                      <button 
                        className={`compare-action-btn ${isInCompare(project.id) ? "active" : ""} ${!isInCompare(project.id) && selectedProjects.length >= 3 ? "disabled" : ""}`}
                        onClick={() => handleCompareClick(project)}
                      >
                        {isInCompare(project.id) ? "Comparing..." : "Compare"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search real hackathon projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="filters-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? "active" : ""}`}
              onClick={() => {
                setFilter(cat);
                fetchProjects(query, cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && !projects.length && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="projects-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="loading-skeleton" />
            ))
          : projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="card-top">
                  <span className="project-tag">{project.category}</span>
                  <button 
                    className={`compare-btn-icon ${isInCompare(project.id) ? "active" : ""} ${!isInCompare(project.id) && selectedProjects.length >= 3 ? "disabled" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCompareClick(project);
                    }}
                  >
                    {isInCompare(project.id) ? "✓" : "+"}
                  </button>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="tech-stack">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-meta">
                  <span className="project-event">{project.event}</span>
                  <div className="card-actions">
                    <a href={project.link} target="_blank" className="view-action-btn">View Project →</a>
                    <button 
                      className={`compare-action-btn ${isInCompare(project.id) ? "active" : ""} ${!isInCompare(project.id) && selectedProjects.length >= 3 ? "disabled" : ""}`}
                      onClick={() => handleCompareClick(project)}
                    >
                      {isInCompare(project.id) ? "Comparing..." : "Compare"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && projects.length === 0 && !error && (
        <div className="empty-state">
          No real projects found for this search. Try a broader term.
        </div>
      )}

      {toastMessage && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
