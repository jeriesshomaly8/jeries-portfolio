"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const DURATION_MS = 1300;

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  // SSR and no-JS render the real value; the count-up only runs client-side
  const [current, setCurrent] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduceMotion || started.current) return;
    started.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}
