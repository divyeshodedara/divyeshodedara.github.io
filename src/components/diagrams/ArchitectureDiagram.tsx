import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  className?: string;
}

/**
 * Inline SVG diagram showing the Socially project architecture:
 *   Client ←→ Node.js/Socket.IO → Redis → MongoDB
 *
 * Animated strokeDashoffset paths simulate data packet flow for:
 *  1. WebSocket bi-directional connection (Client ↔ Server)
 *  2. Redis Cache-Aside pattern (Server → Cache → [hit] Server | [miss] → MongoDB)
 */
export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  return (
    <div className={cn(className)}>
      <svg
        viewBox="0 0 560 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", overflow: "visible" }}
        aria-label="Socially architecture: Client connects via WebSocket to Node.js server, which uses Redis cache-aside and MongoDB persistence"
      >
        <defs>
          {/* Arrow markers */}
          <marker id="arr-fwd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="oklch(0.55 0 0)" />
          </marker>
          <marker id="arr-back" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
            <path d="M6,0 L0,3 L6,6 Z" fill="oklch(0.38 0 0)" />
          </marker>
          <marker id="arr-cache" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="oklch(0.70 0 0)" />
          </marker>
        </defs>

        {/* ── Node boxes ───────────────────────────────────── */}

        {/* Client */}
        <rect
          x="10"
          y="72"
          width="96"
          height="56"
          rx="8"
          fill="oklch(0.10 0 0)"
          stroke="oklch(0.20 0 0)"
          strokeWidth="0.5"
        />
        <text x="58" y="98" textAnchor="middle" fill="oklch(0.80 0 0)" fontFamily="var(--font-mono)" fontSize="11">
          Client
        </text>
        <text x="58" y="114" textAnchor="middle" fill="oklch(0.38 0 0)" fontFamily="var(--font-mono)" fontSize="9">
          browser / app
        </text>

        {/* Node.js + Socket.IO (center) */}
        <rect
          x="170"
          y="60"
          width="120"
          height="80"
          rx="8"
          fill="oklch(0.115 0 0)"
          stroke="oklch(0.25 0 0)"
          strokeWidth="0.5"
        />
        <text x="230" y="88" textAnchor="middle" fill="oklch(0.88 0 0)" fontFamily="var(--font-mono)" fontSize="11">
          Node.js
        </text>
        <text x="230" y="103" textAnchor="middle" fill="oklch(0.55 0 0)" fontFamily="var(--font-mono)" fontSize="9">
          + Socket.IO
        </text>
        <text x="230" y="118" textAnchor="middle" fill="oklch(0.32 0 0)" fontFamily="var(--font-mono)" fontSize="8">
          Express · JWT · bcrypt
        </text>

        {/* Redis */}
        <rect
          x="350"
          y="30"
          width="96"
          height="52"
          rx="8"
          fill="oklch(0.10 0 0)"
          stroke="oklch(0.20 0 0)"
          strokeWidth="0.5"
        />
        <text x="398" y="54" textAnchor="middle" fill="oklch(0.75 0 0)" fontFamily="var(--font-mono)" fontSize="11">
          Redis
        </text>
        <text x="398" y="69" textAnchor="middle" fill="oklch(0.38 0 0)" fontFamily="var(--font-mono)" fontSize="9">
          cache-aside
        </text>

        {/* MongoDB */}
        <rect
          x="350"
          y="118"
          width="96"
          height="52"
          rx="8"
          fill="oklch(0.10 0 0)"
          stroke="oklch(0.18 0 0)"
          strokeWidth="0.5"
        />
        <text x="398" y="142" textAnchor="middle" fill="oklch(0.65 0 0)" fontFamily="var(--font-mono)" fontSize="11">
          MongoDB
        </text>
        <text x="398" y="157" textAnchor="middle" fill="oklch(0.32 0 0)" fontFamily="var(--font-mono)" fontSize="9">
          persistent store
        </text>

        {/* Security shield label */}
        <rect
          x="465"
          y="60"
          width="84"
          height="80"
          rx="8"
          fill="oklch(0.09 0 0)"
          stroke="oklch(0.16 0 0)"
          strokeWidth="0.5"
          strokeDasharray="3,3"
        />
        <text x="507" y="86" textAnchor="middle" fill="oklch(0.30 0 0)" fontFamily="var(--font-mono)" fontSize="8.5">
          8× rate limit
        </text>
        <text x="507" y="100" textAnchor="middle" fill="oklch(0.30 0 0)" fontFamily="var(--font-mono)" fontSize="8.5">
          JWT HttpOnly
        </text>
        <text x="507" y="114" textAnchor="middle" fill="oklch(0.30 0 0)" fontFamily="var(--font-mono)" fontSize="8.5">
          bcrypt(12)
        </text>
        <text x="507" y="128" textAnchor="middle" fill="oklch(0.30 0 0)" fontFamily="var(--font-mono)" fontSize="8.5">
          Multer→Sharp
        </text>

        {/* ── Static connector lines ───────────────────────── */}

        {/* Client ↔ Node.js (WebSocket) — upper */}
        <line x1="106" y1="93" x2="170" y2="93" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />
        {/* Client ↔ Node.js (WebSocket) — lower */}
        <line x1="106" y1="107" x2="170" y2="107" stroke="oklch(0.22 0 0)" strokeWidth="0.5" />

        {/* Node.js → Redis */}
        <line
          x1="290"
          y1="75"
          x2="350"
          y2="55"
          stroke="oklch(0.20 0 0)"
          strokeWidth="0.5"
          markerEnd="url(#arr-cache)"
        />

        {/* Redis → MongoDB (cache miss) */}
        <line x1="398" y1="82" x2="398" y2="118" stroke="oklch(0.18 0 0)" strokeWidth="0.5" strokeDasharray="4,3" />

        {/* MongoDB → Node.js (return) */}
        <line x1="350" y1="144" x2="290" y2="125" stroke="oklch(0.18 0 0)" strokeWidth="0.5" strokeDasharray="4,3" />

        {/* ── Animated data flow particles ────────────────── */}

        {/* Forward: Client → Node.js (WebSocket) */}
        <line
          x1="106"
          y1="93"
          x2="170"
          y2="93"
          stroke="oklch(0.72 0 0)"
          strokeWidth="1.5"
          strokeDasharray="300"
          className="flow-fwd"
        />

        {/* Backward: Node.js → Client (WebSocket response) */}
        <line
          x1="170"
          y1="107"
          x2="106"
          y2="107"
          stroke="oklch(0.48 0 0)"
          strokeWidth="1.5"
          strokeDasharray="300"
          className="flow-back"
        />

        {/* Cache: Node.js → Redis */}
        <line
          x1="290"
          y1="78"
          x2="350"
          y2="56"
          stroke="oklch(0.65 0 0)"
          strokeWidth="1.5"
          strokeDasharray="300"
          className="flow-cache"
          style={{ animationDuration: "1.8s", animationDelay: "0.8s" }}
        />

        {/* ── Labels ──────────────────────────────────────── */}
        <text x="138" y="87" textAnchor="middle" fill="oklch(0.42 0 0)" fontFamily="var(--font-mono)" fontSize="8.5">
          WS
        </text>
        <text x="138" y="117" textAnchor="middle" fill="oklch(0.30 0 0)" fontFamily="var(--font-mono)" fontSize="8.5">
          WS
        </text>
        <text x="315" y="58" fill="oklch(0.38 0 0)" fontFamily="var(--font-mono)" fontSize="8">
          cache
        </text>
        <text x="403" y="103" fill="oklch(0.28 0 0)" fontFamily="var(--font-mono)" fontSize="8">
          miss
        </text>
      </svg>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 10,
          flexWrap: "wrap",
        }}
      >
        {[
          { color: "oklch(0.72 0 0)", label: "WebSocket (client→server)" },
          { color: "oklch(0.48 0 0)", label: "WebSocket (server→client)" },
          { color: "oklch(0.65 0 0)", label: "Redis cache lookup" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 20,
                height: 1.5,
                background: color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                color: "var(--color-text-dim)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
