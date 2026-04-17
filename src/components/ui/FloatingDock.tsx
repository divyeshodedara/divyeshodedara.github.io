import { RESUME } from "@/lib/resume";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "GitHub", href: RESUME.github },
  { label: "LinkedIn", href: RESUME.linkedin },
  { label: "LeetCode", href: RESUME.leetcode },
  { label: "Email", href: `mailto:${RESUME.email}` },
] as const;

interface FloatingDockProps {
  className?: string;
}

export function FloatingDock({ className }: FloatingDockProps) {
  return (
    <nav
      className={cn(className)}
      aria-label="Primary navigation"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "16px 28px",
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-xl)",
        flexWrap: "wrap",
        animation: "fadeInUp 0.6s ease 0.4s both",
      }}
    >
      {/* Contact info */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12.5,
          color: "var(--color-text-dim)",
          marginRight: 10,
        }}
      >
        {RESUME.email}
      </span>

      <div
        style={{
          width: "1px",
          height: 18,
          background: "var(--color-border)",
          marginRight: 10,
          flexShrink: 0,
        }}
      />

      {/* Nav links — all with security attributes for external URLs */}
      {LINKS.map(({ label, href }) => (
        <a key={label} href={href} className="dock-link" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ))}
    </nav>
  );
}
