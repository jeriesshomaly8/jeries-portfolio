"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { primaryStack, skillGroups } from "@/content/profile";

const GRAVITY = 1700;
const RESTITUTION = 0.42;
const AIR_FRICTION = 0.999;
const FLOOR_FRICTION = 0.94;
const FLING_SCALE = 16;
const MAX_DT = 0.032;

const LABELS = [...new Set([...primaryStack, ...skillGroups.flatMap((g) => g.skills)])];

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  dragging: boolean;
};

export function SkillDrop() {
  const reduceMotion = useReducedMotion();
  const arenaRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodies = useRef<Body[]>([]);
  const pointer = useRef({ id: -1, index: -1, dx: 0, dy: 0, lastX: 0, lastY: 0, vx: 0, vy: 0 });
  const [running, setRunning] = useState(false);

  const drop = () => {
    const arena = arenaRef.current;
    if (!arena) return;
    const width = arena.clientWidth;
    bodies.current = LABELS.map((_, i) => {
      const el = chipRefs.current[i];
      const w = el?.offsetWidth ?? 80;
      const h = el?.offsetHeight ?? 32;
      return {
        x: Math.random() * Math.max(1, width - w),
        // stagger spawn heights so chips rain rather than appear as one block
        y: -h - Math.random() * 500 - i * 14,
        vx: (Math.random() - 0.5) * 120,
        vy: 0,
        w,
        h,
        dragging: false,
      };
    });
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const arena = arenaRef.current;
    if (!arena) return;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(MAX_DT, (now - last) / 1000);
      last = now;
      const W = arena.clientWidth;
      const H = arena.clientHeight;
      const list = bodies.current;

      for (const b of list) {
        if (b.dragging) continue;
        b.vy += GRAVITY * dt;
        b.vx *= AIR_FRICTION;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx) * RESTITUTION;
        }
        if (b.x + b.w > W) {
          b.x = W - b.w;
          b.vx = -Math.abs(b.vx) * RESTITUTION;
        }
        if (b.y + b.h > H) {
          b.y = H - b.h;
          b.vy = -Math.abs(b.vy) * RESTITUTION;
          b.vx *= FLOOR_FRICTION;
          if (Math.abs(b.vy) < 40) b.vy = 0;
        }
        if (b.y < -600) b.y = -600;
      }

      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i];
          const b = list[j];
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox <= 0 || oy <= 0) continue;
          if (ox < oy) {
            const dir = a.x + a.w / 2 < b.x + b.w / 2 ? -1 : 1;
            const aShare = a.dragging ? 0 : b.dragging ? 1 : 0.5;
            a.x += dir * ox * aShare;
            b.x -= dir * ox * (1 - aShare);
            const swap = (a.vx - b.vx) * 0.4;
            if (!a.dragging) a.vx -= swap;
            if (!b.dragging) b.vx += swap;
          } else {
            const dir = a.y + a.h / 2 < b.y + b.h / 2 ? -1 : 1;
            const aShare = a.dragging ? 0 : b.dragging ? 1 : 0.5;
            a.y += dir * oy * aShare;
            b.y -= dir * oy * (1 - aShare);
            if (!a.dragging && dir === -1) a.vy = Math.min(a.vy, 0);
            if (!b.dragging && dir === 1) b.vy = Math.min(b.vy, 0);
          }
        }
      }

      for (let i = 0; i < list.length; i++) {
        const el = chipRefs.current[i];
        if (el) el.style.transform = `translate(${list[i].x}px, ${list[i].y}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const onPointerDown = (index: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!running) return;
    const b = bodies.current[index];
    const arena = arenaRef.current;
    if (!b || !arena) return;
    const rect = arena.getBoundingClientRect();
    b.dragging = true;
    pointer.current = {
      id: e.pointerId,
      index,
      dx: e.clientX - rect.left - b.x,
      dy: e.clientY - rect.top - b.y,
      lastX: e.clientX,
      lastY: e.clientY,
      vx: 0,
      vy: 0,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (p.index < 0 || e.pointerId !== p.id) return;
    const arena = arenaRef.current;
    const b = bodies.current[p.index];
    if (!arena || !b) return;
    const rect = arena.getBoundingClientRect();
    b.x = Math.max(0, Math.min(rect.width - b.w, e.clientX - rect.left - p.dx));
    b.y = Math.max(-60, Math.min(rect.height - b.h, e.clientY - rect.top - p.dy));
    p.vx = p.vx * 0.6 + (e.clientX - p.lastX) * 0.4;
    p.vy = p.vy * 0.6 + (e.clientY - p.lastY) * 0.4;
    p.lastX = e.clientX;
    p.lastY = e.clientY;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (p.index < 0 || e.pointerId !== p.id) return;
    const b = bodies.current[p.index];
    if (b) {
      b.dragging = false;
      b.vx = p.vx * FLING_SCALE;
      b.vy = p.vy * FLING_SCALE;
    }
    pointer.current.index = -1;
  };

  if (reduceMotion) {
    return (
      <div className="flex h-96 items-center justify-center rounded-xl border border-line bg-card p-6 text-center">
        <p className="max-w-sm text-sm text-muted">
          This toy is all motion — a gravity playground for the tech stack — so it sits out when
          your system asks for reduced motion.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-96 touch-none overflow-hidden rounded-xl border border-line bg-card">
      {running ? (
        <button
          type="button"
          onClick={drop}
          className="absolute end-3 top-3 z-10 min-h-11 rounded-md border border-line-strong bg-paper/90 px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Drop again
        </button>
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="font-display text-lg font-semibold">The stack obeys gravity.</p>
          <p className="max-w-xs text-sm text-muted">
            Every technology on this page, as a physics object. Drag them, throw them, bury
            PostgreSQL under the frontend.
          </p>
          <button
            type="button"
            onClick={drop}
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Drop the stack
          </button>
        </div>
      )}
      {LABELS.map((label, i) => (
        <div
          key={label}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          onPointerDown={onPointerDown(i)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`absolute start-0 top-0 cursor-grab select-none rounded-md border border-line-strong bg-paper px-2.5 py-1.5 font-mono text-[13px] text-ink active:cursor-grabbing ${
            running ? "" : "invisible"
          }`}
          style={{ transform: "translate(0px, -600px)" }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
