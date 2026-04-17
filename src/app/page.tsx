import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { AnimatedStatsCard } from "@/components/ui/AnimatedStatsCard";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RESUME } from "@/lib/resume";
import { useCounter } from "@/hooks/useCounter";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `${RESUME.name} · Backend Software Engineer`,
  description: RESUME.summary,
  openGraph: {
    title: `${RESUME.name} · Backend Software Engineer`,
    description: RESUME.summary,
    type: "website",
  },
  robots: { index: true, follow: true },
};

// ─── Academic tile (server component safe) ───────────────────────────────────
function AcademicTile() {
  return (
    <BentoTile>
      <div className="tile-label">// academic</div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-muted)",
          marginBottom: 4,
        }}
      >
        {RESUME.education.institution}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          color: "var(--color-text-dim)",
          marginBottom: 14,
        }}
      >
        {RESUME.education.degree}
      </div>

      {/* CGPA — large display number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "3rem",
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
          fontSize: 10.5,
          color: "var(--color-text-muted)",
          marginTop: 5,
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
          fontSize: 13,
          color: "var(--color-text-secondary)",
          lineHeight: 1.75,
        }}
      >
        {RESUME.summary}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
        {RESUME.skills.languages.map((lang) => (
          <span key={lang} className="tag">{lang}</span>
        ))}
      </div>
    </BentoTile>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "28px 20px 60px",
      }}
    >
      {/* Section eyebrow */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "var(--color-text-dim)",
          marginBottom: 12,
        }}
      >
        // portfolio · {new Date().getFullYear()}
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Info row ──────────────────────────────────────── */}
      <BentoGrid style={{ marginBottom: 12 }}>
        <AcademicTile />
        <TechMarquee />
        <AnimatedStatsCard />
      </BentoGrid>

      {/* ── Summary ───────────────────────────────────────── */}
      <BentoGrid style={{ marginBottom: 12 }}>
        <SummaryTile />
        <BentoTile colSpan={2}>
          <div className="tile-label">// expertise</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
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
                    fontSize: 9.5,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--color-text-dim)",
                    marginBottom: 8,
                  }}
                >
                  {area}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11.5,
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