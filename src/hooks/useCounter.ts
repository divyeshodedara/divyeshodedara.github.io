import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  target: number;
  duration?: number; // ms
  decimals?: number;
  startOnView?: boolean;
}

/**
 * Animates a number from 0 to `target` when the returned ref enters the viewport.
 * Uses requestAnimationFrame + an easeOutExpo curve for a snappy feel.
 */
export function useCounter({ target, duration = 1400, decimals = 0, startOnView = true }: UseCounterOptions) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  // Intersection observer — fires once when element enters viewport
  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  // Animation loop
  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function easeOutExpo(t: number): number {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(parseFloat((eased * target).toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration, decimals]);

  return { ref, value: decimals > 0 ? value.toFixed(decimals) : Math.round(value) };
}
