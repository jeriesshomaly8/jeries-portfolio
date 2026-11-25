"use client";

import { useEffect, useRef, useState } from "react";
import { identity, navSections } from "@/content/profile";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const section of navSections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass = (isActive: boolean) =>
    `rounded px-3 py-2.5 transition-colors ${
      isActive
        ? "text-ink underline decoration-accent decoration-2 underline-offset-8"
        : "text-muted hover:text-ink"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#main" className="font-display text-sm font-semibold tracking-tight text-ink">
          {identity.name}
        </a>

        <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "location" : undefined}
                className={linkClass(active === section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded md:hidden"
        >
          <span
            aria-hidden
            className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-paper md:hidden"
      >
        <ul className="mx-auto max-w-5xl px-5 py-2">
          {navSections.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-base font-medium ${
                  active === section.id ? "text-accent" : "text-muted"
                }`}
              >
                <span aria-hidden className="me-3 font-mono text-sm text-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
