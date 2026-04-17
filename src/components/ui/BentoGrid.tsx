import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Root Bento Grid container.
 * Uses CSS Grid with named template areas for the desktop layout,
 * collapsing to a single column on mobile.
 */
export function BentoGrid({ children, className, style }: BentoGridProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  style?: React.CSSProperties;
}

/**
 * Individual tile within the Bento Grid.
 * Handles column/row spanning and base styling.
 */
export function BentoTile({ children, className, colSpan = 1, rowSpan = 1, style }: BentoTileProps) {
  return (
    <div
      className={cn("tile", className)}
      style={{
        gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
        gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
