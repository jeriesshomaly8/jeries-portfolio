import { education, experience } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionHeading index={3} title="Experience" />
      <ol className="divide-y divide-line border-y border-line">
        {experience.map((job, i) => (
          <Reveal
            as="li"
            key={`${job.role}-${job.period}`}
            delay={i * 0.08}
            className="grid gap-3 py-10 sm:grid-cols-[200px_1fr] sm:gap-6"
          >
            <p className="font-mono text-sm text-soft">{job.period}</p>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                {job.role} <span className="font-normal text-muted">· {job.company}</span>
              </h3>
              <ul className="mt-4 max-w-2xl space-y-2.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden className="mt-0.5 select-none font-mono text-accent">
                      ▹
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <Reveal as="li" delay={0.16} className="grid gap-3 py-10 sm:grid-cols-[200px_1fr] sm:gap-6">
          <p className="font-mono text-sm text-soft">{education.period}</p>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">
              {education.degree}{" "}
              <span className="font-normal text-muted">· {education.school}</span>
            </h3>
          </div>
        </Reveal>
      </ol>
    </section>
  );
}
