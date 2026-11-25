import { primaryStack, skillGroups } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionHeading index={2} title="Skills" />
      <Reveal>
        <div className="mb-10 flex flex-wrap items-center gap-2.5 rounded-xl border border-accent/30 bg-accent-wash px-5 py-4">
          <span className="me-2 font-mono text-sm font-semibold text-accent">Core stack</span>
          {primaryStack.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-line-strong bg-card px-3 py-1.5 font-mono text-sm font-medium text-ink"
            >
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
      <ul className="divide-y divide-line border-y border-line">
        {skillGroups.map((group, i) => (
          <Reveal
            as="li"
            key={group.id}
            delay={i * 0.05}
            className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-6"
          >
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">
              {group.cvLabel}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line bg-card px-2.5 py-1 font-mono text-sm text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
