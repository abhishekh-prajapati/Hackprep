"use client";

import { useState, useRef, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────────── */
interface Metric {
  label: string;
  value: number; // 0-100
}

interface RadarProject {
  title: string;
  metrics: Metric[];
  color: string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  projectTitle: string;
  metricLabel: string;
  metricValue: number;
  color: string;
}

/* ─── Geometry helpers ───────────────────────────────────── */
const CENTER = 50;
const RADIUS = 38;
const NUM_AXES = 5;

/** Angle for axis i (starting at top, clockwise) */
const axisAngle = (i: number) =>
  (Math.PI * 2 * i) / NUM_AXES - Math.PI / 2;

/** SVG coordinate for a given axis & normalised radius (0-1) */
const point = (axisIndex: number, norm: number) => ({
  x: CENTER + RADIUS * norm * Math.cos(axisAngle(axisIndex)),
  y: CENTER + RADIUS * norm * Math.sin(axisAngle(axisIndex)),
});

/** Build a "points" string for an SVG polygon */
const buildPolygon = (metrics: Metric[]) =>
  metrics
    .map((m, i) => {
      const p = point(i, m.value / 100);
      return `${p.x},${p.y}`;
    })
    .join(" ");

/* ─── Component ─────────────────────────────────────────── */
export default function CapabilityRadar({
  projects,
}: {
  projects: RadarProject[];
}) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    projectTitle: "",
    metricLabel: "",
    metricValue: 0,
    color: "",
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDotHover = useCallback(
    (
      e: React.MouseEvent<SVGCircleElement>,
      project: RadarProject,
      metric: Metric
    ) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        projectTitle: project.title,
        metricLabel: metric.label,
        metricValue: metric.value,
        color: project.color,
      });
    },
    []
  );

  const handleDotLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const ringScales = [0.2, 0.4, 0.6, 0.8, 1];
  const axisLabels = projects[0]?.metrics.map((m) => m.label) ?? [];

  return (
    <div className="cr-wrapper">
      {/* SVG radar */}
      <div className="cr-svg-container">
        <svg
          ref={svgRef}
          className="cr-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {projects.map((p, i) => (
              <filter key={i} id={`glow-${i}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* ── Scale rings ── */}
          {ringScales.map((scale) => {
            const pts = Array.from({ length: NUM_AXES }, (_, i) => {
              const p = point(i, scale);
              return `${p.x},${p.y}`;
            }).join(" ");
            return (
              <polygon
                key={scale}
                points={pts}
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="0.4"
              />
            );
          })}

          {/* ── Scale % labels on top axis ── */}
          {ringScales.map((scale) => {
            const p = point(0, scale);
            return (
              <text
                key={scale}
                x={p.x + 1.2}
                y={p.y}
                fontSize="2.4"
                fill="#bbb"
                dominantBaseline="middle"
              >
                {Math.round(scale * 100)}%
              </text>
            );
          })}

          {/* ── Axis spokes ── */}
          {Array.from({ length: NUM_AXES }, (_, i) => {
            const tip = point(i, 1);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={tip.x}
                y2={tip.y}
                stroke="#e5e5e5"
                strokeWidth="0.4"
              />
            );
          })}

          {/* ── Axis labels ── */}
          {axisLabels.map((label, i) => {
            const p = point(i, 1.18);
            let anchor: "start" | "middle" | "end" = "middle";
            if (p.x < CENTER - 5) anchor = "end";
            else if (p.x > CENTER + 5) anchor = "start";
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                fontSize="3.2"
                fontWeight="600"
                fill="#888"
                textAnchor={anchor}
                dominantBaseline="middle"
              >
                {label}
              </text>
            );
          })}

          {/* ── Data polygons ── */}
          {projects.map((proj, pi) => {
            const isActive = hoveredProject === null || hoveredProject === pi;
            return (
              <polygon
                key={pi}
                points={buildPolygon(proj.metrics)}
                fill={proj.color}
                fillOpacity={isActive ? 0.18 : 0.05}
                stroke={proj.color}
                strokeWidth={hoveredProject === pi ? 2.2 : 1.4}
                strokeLinejoin="round"
                filter={hoveredProject === pi ? `url(#glow-${pi})` : undefined}
                className="cr-polygon"
                onMouseEnter={() => setHoveredProject(pi)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  transition: "fill-opacity 0.25s, stroke-width 0.25s",
                  cursor: "pointer",
                }}
              />
            );
          })}

          {/* ── Vertex dots (hoverable) ── */}
          {projects.map((proj, pi) =>
            proj.metrics.map((m, mi) => {
              const p = point(mi, m.value / 100);
              const isActive =
                hoveredProject === null || hoveredProject === pi;
              return (
                <circle
                  key={`${pi}-${mi}`}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredProject === pi ? 2.2 : 1.4}
                  fill={proj.color}
                  fillOpacity={isActive ? 1 : 0.3}
                  stroke="#fff"
                  strokeWidth="0.6"
                  className="cr-dot"
                  onMouseEnter={(e) => {
                    setHoveredProject(pi);
                    handleDotHover(e, proj, m);
                  }}
                  onMouseLeave={() => {
                    setHoveredProject(null);
                    handleDotLeave();
                  }}
                  style={{
                    cursor: "crosshair",
                    transition: "r 0.2s, fill-opacity 0.2s",
                  }}
                />
              );
            })
          )}

          {/* ── Center dot ── */}
          <circle cx={CENTER} cy={CENTER} r="1" fill="#ddd" />
        </svg>

        {/* Floating tooltip (positioned relative to SVG container) */}
        {tooltip.visible && (
          <div
            className="cr-tooltip"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y - 36,
              borderLeft: `3px solid ${tooltip.color}`,
            }}
          >
            <span
              className="cr-tooltip-project"
              style={{ color: tooltip.color }}
            >
              {tooltip.projectTitle}
            </span>
            <span className="cr-tooltip-metric">{tooltip.metricLabel}</span>
            <span className="cr-tooltip-value">{tooltip.metricValue}%</span>
          </div>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="cr-legend">
        {projects.map((proj, i) => (
          <div
            key={i}
            className={`cr-legend-item ${hoveredProject === i ? "cr-legend-active" : ""}`}
            onMouseEnter={() => setHoveredProject(i)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{ borderColor: hoveredProject === i ? proj.color : "transparent" }}
          >
            <div
              className="cr-legend-dot"
              style={{ background: proj.color }}
            />
            <span className="cr-legend-label">{proj.title}</span>
            {/* avg score badge */}
            <span
              className="cr-legend-score"
              style={{ color: proj.color, background: proj.color + "18" }}
            >
              {Math.round(
                proj.metrics.reduce((s, m) => s + m.value, 0) /
                  proj.metrics.length
              )}
              %
            </span>
          </div>
        ))}
      </div>

      {/* ── Per-project metric breakdown on hover ── */}
      {hoveredProject !== null && (
        <div className="cr-breakdown">
          <div
            className="cr-breakdown-title"
            style={{ color: projects[hoveredProject].color }}
          >
            {projects[hoveredProject].title}
          </div>
          <div className="cr-breakdown-grid">
            {projects[hoveredProject].metrics.map((m, i) => (
              <div key={i} className="cr-breakdown-row">
                <span className="cr-breakdown-label">{m.label}</span>
                <div className="cr-breakdown-bar-bg">
                  <div
                    className="cr-breakdown-bar-fill"
                    style={{
                      width: `${m.value}%`,
                      background: projects[hoveredProject!].color,
                    }}
                  />
                </div>
                <span className="cr-breakdown-val">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
