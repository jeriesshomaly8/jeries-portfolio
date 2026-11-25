"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      data-reveal
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.68, 0.38, 1] }}
    >
      {children}
    </Tag>
  );
}
