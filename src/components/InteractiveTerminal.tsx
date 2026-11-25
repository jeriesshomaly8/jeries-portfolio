"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  caseStudies,
  experience,
  identity,
  professionalProjects,
  sideProjects,
  skillGroups,
} from "@/content/profile";

type Line = { kind: "cmd" | "out" | "hint" | "ok" | "err"; text: string };
type Action = "clear" | "cv" | "playground";

const MAX_LINES = 80;
const BOOT_TYPE_MS = 50;
const BOOT_CMD = "whoami";

const BOOT_RESULT: Line[] = [
  { kind: "cmd", text: BOOT_CMD },
  {
    kind: "ok",
    text: `${identity.name.toLowerCase().replace(" ", ".")} — ${identity.title.toLowerCase()}`,
  },
  { kind: "out", text: identity.subtitle },
  { kind: "hint", text: "this terminal is real — type 'help' and press enter" },
];

const HELP: Line[] = [
  { kind: "out", text: "available commands:" },
  { kind: "out", text: "  about        who I am" },
  { kind: "out", text: "  skills       tech I work with" },
  { kind: "out", text: "  experience   where I've worked" },
  { kind: "out", text: "  projects     what I've built" },
  { kind: "out", text: "  contact      how to reach me" },
  { kind: "out", text: "  cv           download my CV" },
  { kind: "out", text: "  playground   go play the toys" },
  { kind: "out", text: "  clear        clean the screen" },
  { kind: "hint", text: "…and a few undocumented ones. try things." },
];

function runCommand(raw: string): { lines: Line[]; action?: Action } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
    case "?":
      return { lines: HELP };
    case "about":
    case "whoami":
      return {
        lines: [
          {
            kind: "ok",
            text: `${identity.name.toLowerCase().replace(" ", ".")} — ${identity.title.toLowerCase()}`,
          },
          { kind: "out", text: identity.subtitle },
        ],
      };
    case "skills":
    case "stack":
      return {
        lines: skillGroups.map((g) => ({
          kind: "out" as const,
          text: `  ${g.label}: ${g.skills.join(", ")}`,
        })),
      };
    case "experience":
      return {
        lines: experience.map((job) => ({
          kind: "out" as const,
          text: `  ${job.period} — ${job.role} @ ${job.company}`,
        })),
      };
    case "projects":
    case "ls":
      return {
        lines: [...caseStudies, ...professionalProjects, ...sideProjects].map((p) => ({
          kind: "out" as const,
          // wide enough for the longest project name, so taglines line up
          text: `  ${p.name.padEnd(27)} ${p.tagline}`,
        })),
      };
    case "contact":
    case "email":
      return {
        lines: [
          { kind: "out", text: `  email:    ${identity.email}` },
          { kind: "out", text: `  linkedin: ${identity.linkedin}` },
          ...(identity.github ? [{ kind: "out" as const, text: `  github:   ${identity.github}` }] : []),
        ],
      };
    case "cv":
    case "resume":
      return { lines: [{ kind: "ok", text: "opening /cv.pdf …" }], action: "cv" };
    case "playground":
    case "play":
      return { lines: [{ kind: "ok", text: "warping to the playground …" }], action: "playground" };
    case "clear":
    case "cls":
      return { lines: [], action: "clear" };
    case "sudo hire-me":
    case "hire-me":
    case "hire me":
      return {
        lines: [
          { kind: "out", text: "[sudo] password for recruiter: ********" },
          { kind: "ok", text: "access granted ✓ — let's talk:" },
          { kind: "out", text: `  ${identity.email}` },
        ],
      };
    case "rm -rf /":
    case "rm -rf":
      return { lines: [{ kind: "err", text: "nice try. this portfolio is immutable :)" }] };
    case "exit":
    case "quit":
      return { lines: [{ kind: "hint", text: "there is no escape. only scrolling." }] };
    default:
      return {
        lines: [{ kind: "err", text: `command not found: ${cmd} — try 'help'` }],
      };
  }
}

function Prompt() {
  return (
    <span className="shrink-0 text-term-green">
      jeries@dev<span className="text-term-faint">:~$</span>&nbsp;
    </span>
  );
}

const LINE_COLOR: Record<Line["kind"], string> = {
  cmd: "text-term-text",
  out: "text-term-muted",
  hint: "text-term-faint italic",
  ok: "text-term-green",
  err: "text-term-amber",
};

export function InteractiveTerminal() {
  const reduceMotion = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [booted, setBooted] = useState(false);
  const [bootChars, setBootChars] = useState(0);
  const [input, setInput] = useState("");
  const [lastCmd, setLastCmd] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      setLines(BOOT_RESULT);
      setBooted(true);
      return;
    }
    if (bootChars < BOOT_CMD.length) {
      const t = setTimeout(() => setBootChars((c) => c + 1), BOOT_TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines(BOOT_RESULT);
      setBooted(true);
    }, 400);
    return () => clearTimeout(t);
  }, [reduceMotion, bootChars]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = () => {
    const { lines: result, action } = runCommand(input);
    if (action === "clear") {
      setLines([]);
    } else {
      setLines((prev) =>
        [...prev, { kind: "cmd" as const, text: input }, ...result].slice(-MAX_LINES)
      );
    }
    if (action === "cv") window.open("/cv.pdf", "_blank");
    if (action === "playground") {
      document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" });
    }
    if (input.trim()) setLastCmd(input);
    setInput("");
  };

  return (
    // click-to-focus is a convenience layered over the real, keyboard-focusable input
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className="flex h-72 flex-col sm:h-80" onClick={() => inputRef.current?.focus()}>
      <div
        ref={scrollRef}
        className="terminal-scroll grow space-y-1 overflow-y-auto pe-1 font-mono text-[13px] leading-relaxed sm:text-sm"
        aria-live="polite"
      >
        {!booted && !reduceMotion && (
          <p>
            <Prompt />
            <span className="text-term-text">{BOOT_CMD.slice(0, bootChars)}</span>
            <span className="cursor-blink" aria-hidden />
          </p>
        )}
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <p key={i} className="flex">
              <Prompt />
              <span className="min-w-0 break-all text-term-text">{line.text}</span>
            </p>
          ) : (
            <p
              key={i}
              className={`whitespace-pre-wrap [overflow-wrap:anywhere] ${LINE_COLOR[line.kind]}`}
            >
              {line.text}
            </p>
          )
        )}
        {booted && (
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Prompt />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && lastCmd) {
                  e.preventDefault();
                  setInput(lastCmd);
                }
              }}
              aria-label="Terminal input — type 'help' for available commands"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              // text-base (16px) on mobile — anything smaller makes iOS zoom the page on focus
              className="w-full min-w-0 grow bg-transparent font-mono text-base text-term-text caret-term-green outline-none sm:text-sm"
            />
          </form>
        )}
      </div>
    </div>
  );
}
