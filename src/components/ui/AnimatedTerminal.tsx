import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { RESUME } from "@/lib/resume";

// ─── JSON payload rendered line-by-line ────────────────────────────────────
const JSON_LINES: Array<{ raw: string; parts: Array<{ text: string; cls: string }> }> = [
  {
    raw: "{",
    parts: [{ text: "{", cls: "json-punct" }],
  },
  {
    raw: `  "name": "${RESUME.name}",`,
    parts: [
      { text: '  "name"', cls: "json-key" },
      { text: ": ", cls: "json-punct" },
      { text: `"${RESUME.name}"`, cls: "json-str" },
      { text: ",", cls: "json-punct" },
    ],
  },
  {
    raw: `  "role": "${RESUME.role}",`,
    parts: [
      { text: '  "role"', cls: "json-key" },
      { text: ": ", cls: "json-punct" },
      { text: `"${RESUME.role}"`, cls: "json-str" },
      { text: ",", cls: "json-punct" },
    ],
  },
  {
    raw: `  "university": "${RESUME.education.institution}",`,
    parts: [
      { text: '  "university"', cls: "json-key" },
      { text: ": ", cls: "json-punct" },
      { text: `"${RESUME.education.institution}"`, cls: "json-str" },
      { text: ",", cls: "json-punct" },
    ],
  },
  {
    raw: `  "cgpa": ${RESUME.education.cgpa},`,
    parts: [
      { text: '  "cgpa"', cls: "json-key" },
      { text: ": ", cls: "json-punct" },
      { text: String(RESUME.education.cgpa), cls: "json-num" },
      { text: ",", cls: "json-punct" },
    ],
  },
  {
    raw: `  "stack": ["Node.js", "Redis", "Socket.IO", "MongoDB", "Docker", "AWS"],`,
    parts: [  
      { text: '  "stack"', cls: "json-key" },
      { text: ": ", cls: "json-punct" },
      { text: '["Node.js", "PostgreSQL" ,"Redis", "Socket.IO", "MongoDB", "Docker", "AWS"]', cls: "json-arr" },
      { text: ",", cls: "json-punct" },
    ],
  },
  {
    raw: `  "focus": "real-time architectures & secure REST APIs"`,
    parts: [
      { text: '  "focus"', cls: "json-key" },
      { text: ": ", cls: "json-punct" },
      { text: '"real-time architectures & secure REST APIs"', cls: "json-str" },
    ],
  },
  {
    raw: "}",
    parts: [{ text: "}", cls: "json-punct" }],
  },
];

interface AnimatedTerminalProps {
  className?: string;
}

export function AnimatedTerminal({ className }: AnimatedTerminalProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cmdTyped, setCmdTyped] = useState("");
  const FULL_CMD = "cat divyesh_odedara.json";

  // Phase 1: type the command
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCmdTyped(FULL_CMD.slice(0, i));
      if (i >= FULL_CMD.length) {
        clearInterval(timer);
        // Phase 2: reveal JSON lines
        setTimeout(() => {
          setShowCursor(false);
          let line = 0;
          const lineTimer = setInterval(() => {
            line++;
            setVisibleLines(line);
            if (line >= JSON_LINES.length) {
              clearInterval(lineTimer);
              setShowCursor(true);
            }
          }, 120);
        }, 400);
      }
    }, 55);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("tile", className)} style={{ minHeight: 320 }}>
      {/* Dot grid background */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          {["#3a1f1f", "#2e2a1a", "#1a2e1a"].map((bg, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: bg,
                border: "0.5px solid oklch(0.20 0 0)",
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12.5,
              color: "var(--color-text-dim)",
              marginLeft: 12,
            }}
          >
            bash — divyesh@portfolio ~
          </span>
        </div>

        {/* Command prompt */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            color: "var(--color-text-muted)",
            marginBottom: 18,
          }}
        >
          <span style={{ color: "var(--color-text-dim)" }}>$ </span>
          <span style={{ color: "var(--color-text-primary)" }}>{cmdTyped}</span>
          {cmdTyped.length < FULL_CMD.length && <span className="cursor" />}
        </div>

        {/* JSON output */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13.5,
            lineHeight: 1.85,
          }}
        >
          {JSON_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i}>
              {line.parts.map((part, j) => (
                <span key={j} className={part.cls}>
                  {part.text}
                </span>
              ))}
            </div>
          ))}
          {showCursor && <span className="cursor" />}
        </div>
      </div>
    </div>
  );
}
