import { RESUME } from "@/lib/resume";
import { cn } from "@/lib/utils";

interface TechMarqueeProps {
  className?: string;
}

/** Shuffle array deterministically by rotating */
function rotate<T>(arr: T[], n: number): T[] {
  const offset = n % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

export function TechMarquee({ className }: TechMarqueeProps) {
  const stack = RESUME.techStack;

  // Each row uses a different rotation of the stack for variety
  const rows = [
    { items: [...stack, ...stack], duration: "45s", direction: "normal", opacity: 1 },
    { items: [...rotate([...stack], 4).reverse(), ...rotate([...stack], 4).reverse()], duration: "55s", direction: "reverse", opacity: 0.7 },
    { items: [...rotate([...stack], 8), ...rotate([...stack], 8)], duration: "50s", direction: "normal", opacity: 0.85 },
    { items: [...rotate([...stack], 2).reverse(), ...rotate([...stack], 2).reverse()], duration: "60s", direction: "reverse", opacity: 0.6 },
    { items: [...rotate([...stack], 6), ...rotate([...stack], 6)], duration: "48s", direction: "normal", opacity: 0.75 },
  ];

  return (
    <div className={cn("tile", className)}>
      <div className="tile-label">// tech stack</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {rows.map((row, idx) => (
          <div key={idx} style={{ overflow: "hidden" }}>
            <div
              className="marquee-track"
              style={{
                display: "flex",
                gap: 12,
                width: "max-content",
                animationDuration: row.duration,
                animationDirection: row.direction,
              }}
            >
              {row.items.map((tech, i) => (
                <span
                  key={i}
                  className="badge"
                  style={{ whiteSpace: "nowrap", flexShrink: 0, opacity: row.opacity }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
