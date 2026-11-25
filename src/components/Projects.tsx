import {
  caseStudies,
  professionalProjects,
  sideProjects,
  type CaseStudy,
  type Project,
} from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-3.5">
      {tech.map((t) => (
        <li key={t} className="font-mono text-xs text-soft">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Flow({ steps }: { steps: CaseStudy["flow"] }) {
  return (
    <figure className="mt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5 font-mono text-xs">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <span
              className={
                step.mine
                  ? "rounded-md border border-accent/60 bg-accent-wash px-2.5 py-1.5 font-semibold text-accent-deep"
                  : "rounded-md border border-line-strong bg-paper px-2.5 py-1.5 text-muted"
              }
            >
              {step.label}
              {step.mine && <span className="sr-only"> (my work)</span>}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-soft">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 flex items-center gap-2 text-xs text-soft">
        <span aria-hidden className="inline-block size-3 rounded-sm border border-accent/60 bg-accent-wash" />
        Highlighted: the parts I built
      </figcaption>
    </figure>
  );
}

const STORY_PARTS = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Approach" },
  { key: "result", label: "Result" },
] as const;

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{study.name}</h3>
          <p className="mt-1 font-medium text-accent">{study.tagline}</p>
        </div>
        <p className="font-mono text-xs text-soft">{study.period}</p>
      </header>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">{study.summary}</p>
      <p className="mt-3 text-sm text-soft">
        <span className="font-semibold text-accent">Role:</span> {study.role}
      </p>

      <Flow steps={study.flow} />

      <div className="mt-8 space-y-6">
        {study.stories.map((story) => (
          <section key={story.title} className="rounded-xl border border-line bg-paper p-5">
            <h4 className="font-display text-lg font-semibold text-ink">{story.title}</h4>
            <dl className="mt-3 grid gap-4 lg:grid-cols-3">
              {STORY_PARTS.map((part) => (
                <div key={part.key}>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                    {part.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{story[part.key]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <h4 className="mt-8 font-display text-base font-semibold text-ink">Also built</h4>
      <ul className="mt-3 space-y-2">
        {study.alsoBuilt.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span aria-hidden className="mt-0.5 select-none font-mono text-accent">
              ▹
            </span>
            {item}
          </li>
        ))}
      </ul>

      <TechList tech={study.tech} />
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isCode = project.url?.startsWith("https://github.com/") ?? false;
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-lg font-semibold text-ink">{project.name}</h4>
          <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${isCode ? "View the code for" : "Visit"} ${project.name} (opens in new tab)`}
            className="shrink-0 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {isCode ? "Code ↗" : "Visit ↗"}
          </a>
        )}
      </div>
      <p className="mt-3.5 grow text-[15px] leading-relaxed text-muted">{project.description}</p>
      {project.contribution && (
        <p className="mt-3.5 text-sm text-soft">
          <span className="font-semibold text-accent">Role:</span> {project.contribution}
        </p>
      )}
      <TechList tech={project.tech} />
    </article>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 mt-20 flex flex-wrap items-center gap-3 font-display text-xl font-semibold">
      {children}
    </h3>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionHeading index={4} title="Projects" />
      <Reveal>
        <p className="-mt-6 mb-10 max-w-2xl text-muted">
          The code for my work projects is private, so here are the problems I solved and how I
          solved them.
        </p>
      </Reveal>
      <div className="space-y-8">
        {caseStudies.map((study) => (
          <Reveal key={study.id}>
            <CaseStudyCard study={study} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <SubHeading>More work</SubHeading>
      </Reveal>
      <ul className="grid gap-5 sm:grid-cols-2">
        {professionalProjects.map((project, i) => (
          <Reveal as="li" key={project.id} delay={(i % 2) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <SubHeading>
          Side projects
          <span className="rounded-md border border-ochre/40 bg-ochre/10 px-2.5 py-1 font-mono text-xs font-medium text-ochre">
            in development
          </span>
        </SubHeading>
      </Reveal>
      <ul className="grid gap-5 sm:grid-cols-2">
        {sideProjects.map((project, i) => (
          <Reveal as="li" key={project.id} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
