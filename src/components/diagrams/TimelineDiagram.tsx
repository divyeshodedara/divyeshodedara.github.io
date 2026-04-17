import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  step: string;
  detail: string;
}

interface TimelineDiagramProps {
  steps: readonly TimelineStep[];
  className?: string;
}

/**
 * Vertically stepped pipeline timeline.
 * Each step reveals sequentially when the component enters the viewport.
 */
export function TimelineDiagram({ steps, className }: TimelineDiagramProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          let i = 0;
          const timer = setInterval(() => {
            i++;
            setVisibleCount(i);
            if (i >= steps.length) clearInterval(timer);
          }, 200);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div ref={ref} className={cn(className)}>
      {steps.map((item, i) => {
        const visible = i < visibleCount;
        return (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            {/* Spine */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                className={cn("timeline-dot", visible && "active")}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.5)",
                  transition: "all 0.3s ease",
                }}
              />
              {i < steps.length - 1 && (
                <div
                  className="timeline-line"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.4s ease 0.1s",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div
              style={{
                paddingBottom: i < steps.length - 1 ? 18 : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-8px)",
                transition: "all 0.35s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                  marginBottom: 3,
                }}
              >
                {item.step}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--color-text-dim)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.detail}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
