"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const GAME_SECONDS = 30;
const START_BUGS = 4;
const MAX_BUGS = 9;
const SPAWN_EVERY_MS = 4000;
const BUG_SIZE = 44;
const BEST_KEY = "bughunt-best";

type Bug = { id: number; x: number; y: number; vx: number; vy: number; nextTurn: number };
type Splat = { id: number; x: number; y: number };

function readBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // private mode / blocked storage — best score just won't persist
  }
}

let nextId = 1;

export function BugHunt() {
  const reduceMotion = useReducedMotion();
  const arenaRef = useRef<HTMLDivElement>(null);
  const bugData = useRef<Map<number, Bug>>(new Map());
  const bugEls = useRef<Map<number, HTMLButtonElement>>(new Map());
  const scoreRef = useRef(0);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [best, setBest] = useState(0);
  const [bugIds, setBugIds] = useState<number[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);

  useEffect(() => {
    setBest(readBest());
  }, []);

  const bounds = () => {
    const arena = arenaRef.current;
    return {
      w: (arena?.clientWidth ?? 300) - BUG_SIZE,
      h: (arena?.clientHeight ?? 300) - BUG_SIZE,
    };
  };

  const spawnBug = useCallback(() => {
    const { w, h } = bounds();
    const speed = 70 + Math.random() * 60 + scoreRef.current * 4;
    const angle = Math.random() * Math.PI * 2;
    const bug: Bug = {
      id: nextId++,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      nextTurn: 0,
    };
    bugData.current.set(bug.id, bug);
    setBugIds((ids) => [...ids, bug.id]);
  }, []);

  const start = () => {
    bugData.current.clear();
    scoreRef.current = 0;
    setScore(0);
    setSplats([]);
    setBugIds([]);
    setTimeLeft(GAME_SECONDS);
    setPhase("running");
    for (let i = 0; i < START_BUGS; i++) spawnBug();
  };

  useEffect(() => {
    if (phase !== "running") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPhase("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    const spawner = setInterval(() => {
      if (bugData.current.size < MAX_BUGS) spawnBug();
    }, SPAWN_EVERY_MS);
    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [phase, spawnBug]);

  useEffect(() => {
    if (phase !== "done") return;
    if (scoreRef.current > readBest()) {
      writeBest(scoreRef.current);
      setBest(scoreRef.current);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "running") return;

    const place = (bug: Bug) => {
      const el = bugEls.current.get(bug.id);
      if (el) {
        el.style.transform = `translate(${bug.x}px, ${bug.y}px) scaleX(${bug.vx < 0 ? -1 : 1})`;
      }
    };

    if (reduceMotion) {
      // discrete hops instead of continuous scurrying
      const hop = setInterval(() => {
        const { w, h } = bounds();
        for (const bug of bugData.current.values()) {
          bug.x = Math.max(0, Math.min(w, bug.x + (Math.random() - 0.5) * 180));
          bug.y = Math.max(0, Math.min(h, bug.y + (Math.random() - 0.5) * 180));
          place(bug);
        }
      }, 700);
      return () => clearInterval(hop);
    }

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { w, h } = bounds();
      for (const bug of bugData.current.values()) {
        bug.nextTurn -= dt;
        if (bug.nextTurn <= 0) {
          const speed = Math.hypot(bug.vx, bug.vy);
          const angle = Math.random() * Math.PI * 2;
          bug.vx = Math.cos(angle) * speed;
          bug.vy = Math.sin(angle) * speed;
          bug.nextTurn = 0.4 + Math.random() * 1.2;
        }
        bug.x += bug.vx * dt;
        bug.y += bug.vy * dt;
        if (bug.x < 0 || bug.x > w) bug.vx *= -1;
        if (bug.y < 0 || bug.y > h) bug.vy *= -1;
        bug.x = Math.max(0, Math.min(w, bug.x));
        bug.y = Math.max(0, Math.min(h, bug.y));
        place(bug);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, reduceMotion]);

  const squash = (id: number) => {
    const bug = bugData.current.get(id);
    if (!bug || phase !== "running") return;
    bugData.current.delete(id);
    scoreRef.current += 1;
    setScore(scoreRef.current);
    setBugIds((ids) => ids.filter((b) => b !== id));
    const splat: Splat = { id: bug.id, x: bug.x, y: bug.y };
    setSplats((s) => [...s, splat]);
    setTimeout(() => setSplats((s) => s.filter((sp) => sp.id !== splat.id)), 500);
    setTimeout(() => {
      if (bugData.current.size < MAX_BUGS) spawnBug();
    }, 500);
  };

  return (
    <div className="relative h-96 overflow-hidden rounded-xl border border-line bg-card">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-sm font-semibold">
        <span className="text-muted">
          Score <span className="font-mono text-ink">{score}</span>
          {best > 0 && (
            <span className="ms-3 text-soft">
              Best <span className="font-mono">{best}</span>
            </span>
          )}
        </span>
        {phase === "running" && (
          <span
            className={`font-mono ${timeLeft <= 5 ? "text-ochre" : "text-muted"}`}
            role="timer"
            aria-label={`${timeLeft} seconds left`}
          >
            0:{String(timeLeft).padStart(2, "0")}
          </span>
        )}
      </div>

      {phase !== "running" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {phase === "idle" ? (
            <>
              <p className="font-display text-lg font-semibold">Production has bugs.</p>
              <p className="max-w-xs text-sm text-muted">
                You have {GAME_SECONDS} seconds. Squash as many as you can — they get faster as
                you score.
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-semibold">
                {score} bug{score === 1 ? "" : "s"} squashed
              </p>
              <p className="max-w-xs text-sm text-muted" role="status">
                {score >= best && score > 0 ? "New personal best. " : ""}
                {score === 0
                  ? "The bugs remain in production."
                  : score < 15
                    ? "Not bad — QA would like a word anyway."
                    : "Ship it."}
              </p>
            </>
          )}
          <button
            type="button"
            onClick={start}
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            {phase === "idle" ? "Start hunting" : "Play again"}
          </button>
        </div>
      )}

      <div ref={arenaRef} className="absolute inset-0">
        {phase === "running" &&
          bugIds.map((id) => (
            <button
              key={id}
              type="button"
              ref={(el) => {
                if (el) bugEls.current.set(id, el);
                else bugEls.current.delete(id);
              }}
              onClick={() => squash(id)}
              aria-label="Squash bug"
              className="absolute start-0 top-0 flex size-11 cursor-crosshair items-center justify-center rounded-full text-2xl transition-none hover:drop-shadow-[0_0_8px_var(--color-accent)]"
              style={{ transform: "translate(-100px, -100px)" }}
            >
              🐛
            </button>
          ))}
        {splats.map((splat) => (
          <span
            key={splat.id}
            aria-hidden
            className="absolute start-0 top-0 text-2xl"
            style={{ transform: `translate(${splat.x}px, ${splat.y}px)` }}
          >
            💥
          </span>
        ))}
      </div>
    </div>
  );
}
