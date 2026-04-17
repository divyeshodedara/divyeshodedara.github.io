import { AnimatedTerminal } from "@/components/ui/AnimatedTerminal";
import { RESUME } from "@/lib/resume";

export function HeroSection() {
  return (
    <section aria-label="Introduction" style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {/* Terminal — left */}
        <AnimatedTerminal />

        {/* Identity card — right */}
        <div
          className="tile"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 280,
          }}
        >
          {/* Name */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.2rem",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.8px",
                color: "var(--color-text-primary)",
                marginBottom: 8,
              }}
            >
              {RESUME.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "var(--color-text-muted)",
                letterSpacing: "0.5px",
              }}
            >
              {RESUME.role}
            </div>
          </div>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
            {[RESUME.email, RESUME.phone, RESUME.education.institution].map((val) => (
              <span
                key={val}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "var(--color-text-muted)",
                }}
              >
                {val}
              </span>
            ))}
          </div>

          {/* Period badge */}
          <div style={{ marginTop: 20 }}>
            <span className="badge">{RESUME.education.period}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
