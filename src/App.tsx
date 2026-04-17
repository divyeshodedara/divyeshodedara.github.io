import { HeroSection } from "@/components/sections/HeroSection";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { AnimatedStatsCard } from "@/components/ui/AnimatedStatsCard";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RESUME } from "@/lib/resume";

// ─── Academic tile ───────────────────────────────────────────────────────────
function AcademicTile() {
  return (
    <BentoTile>
      <div className="tile-label">// academic</div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--color-text-muted)",
          marginBottom: 6,
        }}
      >
        {RESUME.education.institution}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--color-text-dim)",
          marginBottom: 18,
        }}
      >
        {RESUME.education.degree}
      </div>

      {/* CGPA — large display number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "3.5rem",
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "-2px",
          color: "var(--color-text-primary)",
        }}
      >
        {RESUME.education.cgpa}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--color-text-muted)",
          marginTop: 6,
        }}
      >
        CGPA / 10.00
      </div>

      <div style={{ marginTop: 14 }}>
        <span className="badge">{RESUME.education.period}</span>
      </div>
    </BentoTile>
  );
}

// ─── Summary tile ─────────────────────────────────────────────────────────────
function SummaryTile() {
  return (
    <BentoTile>
      <div className="tile-label">// about</div>
      <p
        style={{
          fontSize: 15,
          color: "var(--color-text-secondary)",
          lineHeight: 1.8,
        }}
      >
        {RESUME.summary}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
        {RESUME.skills.languages.map((lang) => (
          <span key={lang} className="tag">{lang}</span>
        ))}
      </div>
    </BentoTile>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <main
      style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "40px 40px 80px",
      }}
    >
      {/* Section eyebrow */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--color-text-dim)",
          marginBottom: 20,
        }}
      >
        // portfolio · {new Date().getFullYear()}
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Info row ──────────────────────────────────────── */}
      <BentoGrid style={{ marginBottom: 20 }}>
        <AcademicTile />
        <TechMarquee />
        <AnimatedStatsCard />
      </BentoGrid>

      {/* ── Summary ───────────────────────────────────────── */}
      <BentoGrid style={{ marginBottom: 20 }}>
        <SummaryTile />
        <BentoTile colSpan={2}>
          <div className="tile-label">// expertise</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {[
              { area: "Backend", items: RESUME.skills.backend },
              { area: "Frontend", items: RESUME.skills.frontend },
              { area: "Databases", items: RESUME.skills.databases },
              { area: "DevOps", items: RESUME.skills.devops },
            ].map(({ area, items }) => (
              <div key={area}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--color-text-dim)",
                    marginBottom: 10,
                  }}
                >
                  {area}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BentoTile>
      </BentoGrid>

      {/* ── Projects ──────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── Dock ──────────────────────────────────────────── */}
      <FloatingDock />
    </main>
  );
}
