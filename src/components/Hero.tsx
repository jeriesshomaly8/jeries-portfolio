"use client";

import { motion, useReducedMotion } from "motion/react";
import { heroStats, identity } from "@/content/profile";
import { CountUp } from "./CountUp";
import { InteractiveTerminal } from "./InteractiveTerminal";
import { TerminalWindow } from "./TerminalWindow";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const entrance = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.21, 0.68, 0.38, 1] as const },
        };

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden className="grid-paper absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <motion.p {...entrance(0)} className="mb-5 font-mono text-sm font-medium text-accent">
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            {...entrance(0.08)}
            className="font-display text-5xl font-bold tracking-tight text-ink sm:text-7xl"
          >
            {identity.name}
          </motion.h1>
          <motion.p {...entrance(0.16)} className="mt-5 font-mono text-sm leading-relaxed text-soft">
            {identity.title}
          </motion.p>
          <motion.p {...entrance(0.24)} className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            {identity.subtitle}
          </motion.p>
          <motion.div {...entrance(0.36)} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              View my work
            </a>
            <a
              href="/cv.pdf"
              download="Jeries_Shomaly_CV.pdf"
              className="inline-block rounded-lg border border-line-strong bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </motion.div>
          <motion.dl {...entrance(0.48)} className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-ink">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </dd>
                <dd aria-hidden className="mt-1 text-sm text-soft">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...entrance(0.28)} className="min-w-0">
          <TerminalWindow title="jeries@dev: ~ — try me" className="shadow-xl shadow-ink/10">
            <InteractiveTerminal />
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}
