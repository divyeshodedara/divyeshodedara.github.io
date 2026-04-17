import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";
import { RESUME } from "@/lib/resume";

interface AnimatedStatsCardProps {
  className?: string;
}

export function AnimatedStatsCard({ className }: AnimatedStatsCardProps) {
  const lc = RESUME.competitive.leetcode;
  const cc = RESUME.competitive.codechef;

  const { ref: ratingRef, value: ratingVal } = useCounter({ target: lc.rating, duration: 1600 });
  const { ref: solvedRef, value: solvedVal } = useCounter({ target: lc.solved, duration: 1400 });
  const { ref: rankRef, value: rankVal } = useCounter({ target: lc.globalRank, duration: 1800 });
  const { ref: ccRef, value: ccVal } = useCounter({ target: cc.maxRating, duration: 1500 });

  return (
    <div className={cn("tile", className)}>
      <div className="tile-label">// competitive programming</div>

      {/* LeetCode block */}
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--color-text-dim)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          LeetCode
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Rating */}
          <div>
            <div ref={ratingRef as React.RefObject<HTMLDivElement>} className="counter-num">
              {ratingVal}
            </div>
            <div
              style={{ fontSize: 12.5, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginTop: 5 }}
            >
              contest rating
            </div>
          </div>

          {/* Solved */}
          <div>
            <div ref={solvedRef as React.RefObject<HTMLDivElement>} className="counter-num">
              {solvedVal}+
            </div>
            <div
              style={{ fontSize: 12.5, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginTop: 5 }}
            >
              problems solved
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <span className="badge">{lc.percentile}</span>
          <span className="badge">
            # <span ref={rankRef as React.RefObject<HTMLSpanElement>}>{rankVal}</span> global · {lc.contest}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "0.5px",
          background: "var(--color-border-subtle)",
          margin: "0 0 14px",
        }}
      />

      {/* CodeChef block */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--color-text-dim)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          CodeChef
        </div>
        <div ref={ccRef as React.RefObject<HTMLDivElement>} className="counter-num">
          {ccVal}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginTop: 5 }}>
          max rating
        </div>
      </div>
    </div>
  );
}
