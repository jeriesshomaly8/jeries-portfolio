"use client";

import { useEffect, useRef, useState } from "react";

const RESET_MS = 2000;

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // clipboard blocked (permissions / insecure context) — the address is shown as text
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), RESET_MS);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="min-h-11 rounded-md border border-line-strong px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {state === "idle" ? "Copy" : state === "copied" ? "Copied ✓" : "Select it manually"}
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : ""}
        {state === "failed" ? "Copying failed — select the address manually" : ""}
      </span>
    </button>
  );
}
