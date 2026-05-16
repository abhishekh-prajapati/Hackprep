"use client";

import { useCompare } from "@/context/CompareContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Globe, Users, Star, BrainCircuit, Zap, ChevronRight, X, Trophy, TrendingUp, CheckCircle2 } from "lucide-react";
import "./compare.css";
import CapabilityRadar from "@/app/components/CapabilityRadar";
import "@/app/components/CapabilityRadar.css";

/* ─── Constants ──────────────────────────────────────────── */
const IDEA_COLORS = ["#ff5a1f", "#1a1a1a", "#f59e0b"];
const IDEA_BG_COLORS = ["#fff0eb", "#f3f3f3", "#fef3c7"];

/* ─── Stable score seeder ────────────────────────────────── */
/** Generates a deterministic number 0-1 from any string + salt */
function hashSeed(str: string, salt: number): number {
  let h = salt * 2654435761;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 2246822519);
    h ^= h >>> 13;
  }
  return ((h >>> 0) % 1000) / 1000;
}

/** Maps a 0-1 seed to a value in [min, max] */
const inRange = (seed: number, min: number, max: number) =>
  Math.round(min + seed * (max - min));

/* ─── Data builder ───────────────────────────────────────── */
const METRIC_RANGES: Record<string, [number, number]> = {
  Feasibility:    [68, 97],
  Innovation:     [62, 99],
  Impact:         [70, 96],
  "Team Match":   [65, 98],
  "Market Demand":[60, 97],
};

const METRIC_KEYS = Object.keys(METRIC_RANGES);

const buildMetrics = (projectId: string) =>
  METRIC_KEYS.map((label, i) => ({
    label,
    value: inRange(hashSeed(projectId, i + 7), ...METRIC_RANGES[label]),
  }));

const STAT_BUILD_TIMES = ["18h", "24h", "32h", "36h", "48h"];
const STAT_MARKETS = ["Large", "Large", "Medium", "Niche", "Emerging"];
const PROS_POOL = [
  "High market demand",
  "Clear monetization path",
  "Strong AI use case",
  "Developer-first niche",
  "GitHub integration",
  "High novelty score",
  "Rapid MVP potential",
  "Strong community fit",
  "Proven tech stack",
  "Low competition",
];
const CONS_POOL = [
  "Competitive space",
  "API cost scaling",
  "Complex integration",
  "Longer build time",
  "Niche audience",
  "Needs external data",
];

const getProjectData = (project: { id: string; title: string; category?: string }, _index: number) => {
  const seed = (salt: number) => hashSeed(project.id, salt);
  const metrics = buildMetrics(project.id);
  const avgScore = Math.round(metrics.reduce((s, m) => s + m.value, 0) / metrics.length);
  const teamFit = metrics.find(m => m.label === "Team Match")?.value ?? 80;

  // Pick 3 pros and 2 cons deterministically
  const prosIndices = [0, 1, 2].map(i => inRange(seed(20 + i), 0, PROS_POOL.length - 1));
  const consIndices = [0, 1].map(i => inRange(seed(30 + i), 0, CONS_POOL.length - 1));
  const pros = [...new Set(prosIndices)].slice(0, 3).map(i => PROS_POOL[i]);
  const cons = [...new Set(consIndices)].slice(0, 2).map(i => CONS_POOL[i]);

  return {
    category: project.category || "AI/ML",
    title: project.title,
    id: project.id,
    avgScore,
    metrics,
    stats: [
      { icon: "clock",  label: "Build",    value: STAT_BUILD_TIMES[inRange(seed(40), 0, STAT_BUILD_TIMES.length - 1)] },
      { icon: "globe",  label: "Market",   value: STAT_MARKETS[inRange(seed(50), 0, STAT_MARKETS.length - 1)] },
      { icon: "users",  label: "Team Fit", value: `${teamFit}%` },
    ],
    pros: pros.length ? pros : ["Solid concept", "Clear scope", "Good fit"],
    cons: cons.length ? cons : ["Needs refinement"],
  };
};

/* ─── Helpers ────────────────────────────────────────────── */
const getIconComponent = (name: string) => {
  switch (name) {
    case "clock":  return <Clock size={16} />;
    case "globe":  return <Globe size={16} />;
    case "users":  return <Users size={16} />;
    default:       return null;
  }
};

/** Maps winner margin (0-37 pts) to a confidence % between 70-98 */
const calcConfidence = (winnerAvg: number, runnerAvg: number): number => {
  const margin = Math.max(0, winnerAvg - runnerAvg);
  const base   = 70;
  const boost  = Math.min(28, Math.round(margin * 1.8));
  return Math.min(98, base + boost + Math.round(winnerAvg / 10));
};

/** Returns the metric label where the winner leads most */
const topWinningMetric = (
  winner: ReturnType<typeof getProjectData>,
  others: ReturnType<typeof getProjectData>[]
): string => {
  let bestLabel = "Feasibility";
  let bestDiff  = -Infinity;
  for (const m of winner.metrics) {
    const avgOther =
      others.reduce((s, o) => {
        const match = o.metrics.find(x => x.label === m.label);
        return s + (match?.value ?? 0);
      }, 0) / others.length;
    if (m.value - avgOther > bestDiff) {
      bestDiff  = m.value - avgOther;
      bestLabel = m.label;
    }
  }
  return bestLabel;
};

/* ─── Confirm-selection modal ────────────────────────────── */
function ConfirmModal({
  project,
  color,
  onConfirm,
  onCancel,
}: {
  project: ReturnType<typeof getProjectData>;
  color: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <CheckCircle2 size={28} color={color} />
          <h2 className="modal-title">Lock in this idea?</h2>
        </div>
        <div className="modal-banner" style={{ borderLeft: `4px solid ${color}` }}>
          <span className="modal-banner-label">Selected Idea</span>
          <span className="modal-banner-value">{project.title}</span>
          <span className="modal-banner-meta">{project.category} • Avg score {project.avgScore}%</span>
        </div>
        <p className="modal-body">
          You're about to commit to building <strong>{project.title}</strong> for the hackathon.
          This will open the project reference so you can start planning.
        </p>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onCancel}>Go back</button>
          <button
            className="modal-confirm-btn"
            style={{ background: color }}
            onClick={onConfirm}
          >
            <Zap size={16} fill="currentColor" /> Yes, Build This!
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ComparePage() {
  const { selectedProjects, removeFromCompare } = useCompare();
  const router = useRouter();
  const [isReady,     setIsReady]     = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [chosenIdx,   setChosenIdx]   = useState<number | null>(null);
  const [modalData,   setModalData]   = useState<{
    project: ReturnType<typeof getProjectData>;
    color: string;
    link: string;
  } | null>(null);

  useEffect(() => { setIsReady(true); }, []);

  if (!isReady) return (
    <div className="compare-page">
      <div className="loading-view">
        <div className="spinner" />
        <p>Analyzing side-by-side metrics...</p>
      </div>
    </div>
  );

  if (selectedProjects.length === 0) {
    return (
      <div className="compare-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>
            Select ideas from Explore page to compare
          </h1>
          <p style={{ color: "#666", marginBottom: "24px" }}>Minimum 2 ideas required for comparison</p>
          <Link href="/explore" className="idea-chip" style={{ textDecoration: "none", display: "inline-flex" }}>
            Browse Ideas
          </Link>
        </div>
      </div>
    );
  }

  /* ── Compute comparison data ── */
  const sliced         = selectedProjects.slice(0, 3);
  const comparisonData = sliced.map((p, i) => getProjectData(p, i));

  /* ── Find the actual winner by highest average score ── */
  const bestIdx        = comparisonData.reduce(
    (bestI, d, i) => (d.avgScore > comparisonData[bestI].avgScore ? i : bestI),
    0
  );
  const bestProject    = comparisonData[bestIdx];
  const runnerUp       = comparisonData.filter((_, i) => i !== bestIdx);
  const runnerAvg      = runnerUp.reduce((s, d) => s + d.avgScore, 0) / (runnerUp.length || 1);
  const confidence     = calcConfidence(bestProject.avgScore, runnerAvg);
  const bestColor      = IDEA_COLORS[bestIdx];
  const bestBg         = IDEA_BG_COLORS[bestIdx];
  const winMetric      = topWinningMetric(bestProject, runnerUp);
  const bestProjectLink = sliced[bestIdx]?.link || "/explore";

  /* ── Handle "Select This Idea" / "Build This Idea" ── */
  const openModal = (projData: ReturnType<typeof getProjectData>, idx: number) => {
    const link = sliced[idx]?.link || "/explore";
    setModalData({ project: projData, color: IDEA_COLORS[idx], link });
  };

  const handleConfirm = () => {
    if (!modalData) return;
    setModalData(null);
    // Navigate to the project link (external) or explore page
    if (modalData.link && modalData.link.startsWith("http")) {
      window.open(modalData.link, "_blank", "noopener,noreferrer");
    } else {
      router.push("/explore");
    }
  };

  return (
    <>
      {/* ── Confirm Modal ── */}
      {modalData && (
        <ConfirmModal
          project={modalData.project}
          color={modalData.color}
          onConfirm={handleConfirm}
          onCancel={() => setModalData(null)}
        />
      )}

      <div className="compare-page">
        <header className="compare-header">
          <h1 className="compare-title">Compare Ideas</h1>
          <p className="compare-subtitle">AI-powered side-by-side analysis</p>
        </header>

        {/* ── Selector Bar ── */}
        <section
          className="ideas-selector-bar"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <label className="selector-label">Select up to 3 Ideas to compare:</label>
            <div className="chip-container">
              {selectedProjects.map((p) => (
                <div key={p.id} className="idea-chip">
                  <span style={{ fontSize: "12px" }}>●</span>
                  {p.title}
                  <button
                    onClick={() => { removeFromCompare(p.id); setIsComparing(false); setChosenIdx(null); }}
                    style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "0 0 0 8px", display: "flex", alignItems: "center" }}
                    aria-label={`Remove ${p.title}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {selectedProjects.length < 3 && (
                <Link href="/explore" className="idea-chip unselected" style={{ textDecoration: "none" }}>
                  Add an Idea...
                </Link>
              )}
            </div>
          </div>

          <button
            className="build-now-btn"
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              ...(selectedProjects.length < 2 ? { opacity: 0.4, cursor: "not-allowed", pointerEvents: "none", filter: "grayscale(100%)" } : {}),
            }}
            disabled={selectedProjects.length < 2}
            onClick={() => setIsComparing(true)}
          >
            Compare All
          </button>
        </section>

        {/* ── Comparison Grid ── */}
        <div className="comparison-grid" data-count={comparisonData.length}>
          {comparisonData.map((data, idx) => {
            const isWinner   = idx === bestIdx;
            const isChosen   = chosenIdx === idx;
            const cardColor  = IDEA_COLORS[idx];
            const cardBg     = IDEA_BG_COLORS[idx];

            return (
              <div
                key={idx}
                className={`idea-card ${isWinner && isComparing ? "recommended" : ""} ${isChosen ? "chosen" : ""}`}
                style={{ borderTop: `4px solid ${cardColor}` }}
              >
                {isWinner && isComparing && (
                  <div className="ai-recommended-tag" style={{ background: cardColor }}>
                    <Star size={12} fill="currentColor" /> AI RECOMMENDED
                  </div>
                )}
                {isChosen && (
                  <div className="chosen-tag">
                    <CheckCircle2 size={12} /> SELECTED
                  </div>
                )}

                <div className="card-top">
                  <span className="card-category" style={{ background: cardBg, color: cardColor }}>
                    {data.category}
                  </span>
                  <h2 className="card-title">{data.title}</h2>
                  {isComparing && (
                    <span className="card-avg-score" style={{ color: cardColor }}>
                      Avg {data.avgScore}%
                    </span>
                  )}
                </div>

                {isComparing && (
                  <>
                    <div className="metrics-group">
                      {data.metrics.map((m, i) => (
                        <div key={i} className="metric-row">
                          <div className="metric-header">
                            <span>{m.label}</span>
                            <span className="metric-val">{m.value}%</span>
                          </div>
                          <div className="bar-bg">
                            <div className="bar-fill" style={{ width: `${m.value}%`, background: cardColor }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="stats-grid">
                      {data.stats.map((s, i) => (
                        <div key={i} className="stat-item">
                          <span className="stat-icon" style={{ color: cardColor }}>{getIconComponent(s.icon)}</span>
                          <span className="stat-number">{s.value}</span>
                          <span className="stat-label">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="highlights-container">
                      {data.pros.map((p, i) => (
                        <div key={i} className="highlight-row">
                          <div className="dot" style={{ background: cardColor }} />
                          <span>{p}</span>
                        </div>
                      ))}
                      {data.cons.map((c, i) => (
                        <div key={i} className="highlight-row">
                          <div className="dot neutral" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`card-select-btn ${isWinner ? "" : "secondary"} ${isChosen ? "chosen-btn" : ""}`}
                      style={isWinner && !isChosen ? { background: cardColor } : {}}
                      onClick={() => {
                        setChosenIdx(idx);
                        openModal(data, idx);
                      }}
                    >
                      {isChosen
                        ? <><CheckCircle2 size={16} /> Selected!</>
                        : <>{isWinner ? "Build This Idea" : "Select This Idea"} {isWinner && <ChevronRight size={16} />}</>
                      }
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {selectedProjects.length < 2 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#666", background: "#fff", borderRadius: "16px", border: "1px dashed #ccc" }}>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>Add at least one more idea to start comparison</p>
          </div>
        )}

        {selectedProjects.length >= 2 && !isComparing && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#666", background: "#fff", borderRadius: "16px", border: "1px dashed #ccc" }}>
            <p style={{ fontSize: "16px", fontWeight: 600 }}>Click Compare All to generate deep AI analysis</p>
          </div>
        )}

        {/* ── Analysis Grid ── */}
        {selectedProjects.length >= 2 && isComparing && (
          <div className="analysis-grid">
            {/* Capability Radar */}
            <section className="radar-section">
              <h3 className="section-label">Capability Radar</h3>
              <CapabilityRadar
                projects={comparisonData.map((d, i) => ({
                  title: d.title,
                  metrics: d.metrics,
                  color: IDEA_COLORS[i],
                }))}
              />
            </section>

            {/* AI Verdict Card */}
            <section className="verdict-box">
              <div className="verdict-header-row">
                <div className="verdict-icon-sq" style={{ color: bestColor, background: bestBg }}>
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>AI Verdict</h3>
                  <span style={{ fontSize: "12px", color: "#999" }}>Confidence-weighted analysis</span>
                </div>
              </div>

              {/* Winner banner */}
              <div className="best-idea-banner">
                <div className="banner-sub" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Trophy size={12} color={bestColor} />
                  Best Idea for Your Team
                </div>
                <h4 className="banner-title">{bestProject.title}</h4>
                <p className="banner-meta">
                  {bestProject.category} • Avg score{" "}
                  <strong style={{ color: bestColor }}>{bestProject.avgScore}%</strong>
                </p>

                {/* Per-metric edge pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                  {bestProject.metrics
                    .filter((m) => {
                      const avgOther =
                        runnerUp.reduce((s, o) => {
                          const match = o.metrics.find(x => x.label === m.label);
                          return s + (match?.value ?? 0);
                        }, 0) / (runnerUp.length || 1);
                      return m.value > avgOther;
                    })
                    .map((m) => (
                      <span
                        key={m.label}
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "20px",
                          background: bestColor + "18",
                          color: bestColor,
                        }}
                      >
                        ↑ {m.label}
                      </span>
                    ))}
                </div>
              </div>

              {/* Confidence bar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="confidence-row">
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#888" }}>Confidence Score</span>
                  <span className="confidence-score-big" style={{ color: bestColor }}>{confidence}%</span>
                </div>
                <div className="bar-bg" style={{ height: "8px" }}>
                  <div className="bar-fill" style={{ width: `${confidence}%`, background: bestColor }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#bbb", fontWeight: 600 }}>
                  <span>Low confidence</span>
                  <span>High confidence</span>
                </div>
              </div>

              {/* Margin indicator */}
              {runnerUp.length > 0 && (
                <div
                  style={{
                    background: bestColor + "0d",
                    border: `1px solid ${bestColor}30`,
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#444",
                  }}
                >
                  <TrendingUp size={15} color={bestColor} />
                  Leads by{" "}
                  <strong style={{ color: bestColor }}>
                    {Math.max(0, bestProject.avgScore - Math.round(runnerAvg))} pts
                  </strong>{" "}
                  avg · strongest in <strong>{winMetric}</strong>
                </div>
              )}

              {/* Verdict text */}
              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#666", margin: 0 }}>
                Based on metric scoring across {bestProject.metrics.length} dimensions,{" "}
                <strong style={{ color: bestColor }}>{bestProject.title}</strong> ranks highest with an average
                score of <strong>{bestProject.avgScore}%</strong>. Its strongest advantage is in{" "}
                <strong>{winMetric}</strong>, making it the most viable choice within hackathon timeframes.
              </p>

              {/* CTA */}
              <button
                className="build-now-btn"
                style={{ background: bestColor }}
                onClick={() => {
                  setChosenIdx(bestIdx);
                  openModal(bestProject, bestIdx);
                }}
              >
                <Zap size={18} fill="currentColor" /> Build This Idea
              </button>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
