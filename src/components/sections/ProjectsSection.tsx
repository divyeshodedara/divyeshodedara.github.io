import { useState } from "react";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { TimelineDiagram } from "@/components/diagrams/TimelineDiagram";
import { RESUME } from "@/lib/resume";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [socially, subman] = RESUME.projects;

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section aria-label="Projects" style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--color-text-dim)",
          marginBottom: 16,
          paddingLeft: 2,
        }}
      >
        // projects
      </div>

      <BentoGrid>
        {/* ── Socially ───────────────────────────────────── */}
        <BentoTile colSpan={2} style={{ transition: "all 0.3s ease" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.4px",
                }}
              >
                {socially.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--color-text-muted)",
                  marginTop: 5,
                }}
              >
                {socially.tagline}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span className="badge">{socially.status}</span>
              <button
                className="expand-btn"
                onClick={() => toggle(socially.id)}
                aria-expanded={expandedId === socially.id}
              >
                {expandedId === socially.id ? "collapse" : "expand ↓"}
              </button>
            </div>
          </div>

          {/* Architecture diagram — always visible */}
          <ArchitectureDiagram />

          {/* Expanded detail */}
          {expandedId === socially.id && (
            <div
              style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: "1px solid var(--color-border-subtle)",
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                {socially.description}
              </p>
            </div>
          )}

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
            {socially.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          {/* GitHub link */}
          <div style={{ marginTop: 16 }}>
            <a
              href={socially.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                color: "var(--color-text-dim)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border-subtle)",
                paddingBottom: 2,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-text-dim)")}
            >
              → view on GitHub
            </a>
          </div>
        </BentoTile>

        {/* ── Subscription Manager ───────────────────────── */}
        <BentoTile colSpan={1}>
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 500,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.3px",
                lineHeight: 1.3,
              }}
            >
              {subman.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--color-text-muted)",
                marginTop: 5,
              }}
            >
              {subman.tagline}
            </div>
          </div>

          <TimelineDiagram steps={subman.timeline} />

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {subman.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <a
              href={subman.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                color: "var(--color-text-dim)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border-subtle)",
                paddingBottom: 2,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-text-dim)")}
            >
              → view on GitHub
            </a>
          </div>
        </BentoTile>
      </BentoGrid>
    </section>
  );
}
