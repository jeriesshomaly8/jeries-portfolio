import type { Metadata } from "next";
import {
  caseStudies,
  education,
  experience,
  identity,
  professionalProjects,
  skillGroups,
} from "@/content/profile";
import "./cv.css";

export const metadata: Metadata = {
  title: "CV",
  robots: { index: false, follow: false },
};

const summary =
  "Full Stack Developer with 2.5+ years of production experience across Python and Node.js backends and React/Next.js frontends. On a multi-tenant AI-agent platform I led the outbound data-protection layer, built the trainer feedback loop, and built streamed answers end to end. Before that I worked on nightly data pipelines and precomputed metrics for a high-volume ad-tech dashboard. Strong foundation in data structures, operating systems and networking, with a focus on predictable, well-tested systems.";

export default function CvPage() {
  return (
    <div className="cv">
      <main className="cv-page">
        <header>
          <h1>{identity.name}</h1>
          <p className="cv-title">{identity.title}</p>
          <p className="cv-contact">
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <span aria-hidden>·</span>
            <a href={identity.linkedin}>linkedin.com/in/jeries-shomaly-a28b93235</a>
            {identity.github && (
              <>
                <span aria-hidden>·</span>
                <a href={identity.github}>{identity.github.replace("https://", "")}</a>
              </>
            )}
          </p>
        </header>

        <section>
          <h2>Professional summary</h2>
          <p>{summary}</p>
        </section>

        <section>
          <h2>Technical skills</h2>
          {skillGroups.map((group) => (
            <p key={group.id} className="cv-skill-row">
              <span className="cv-skill-label">{group.cvLabel}:</span>
              <span>{group.skills.join(", ")}</span>
            </p>
          ))}
        </section>

        <section>
          <h2>Professional experience</h2>
          {experience.map((job) => (
            <div key={`${job.role}-${job.period}`} className="cv-entry">
              <div className="cv-entry-head">
                <h3>
                  {job.role} <span>— {job.company}</span>
                </h3>
                <p className="cv-period">{job.period}</p>
              </div>
              <ul className="cv-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          {caseStudies.map((study) => (
            <div key={study.id} className="cv-entry">
              <div className="cv-entry-head">
                <h3>
                  {study.name} <span>— {study.tagline}</span>
                </h3>
                <p className="cv-period">{study.period}</p>
              </div>
              <ul className="cv-bullets">
                {study.stories.map((story) => (
                  <li key={story.title}>
                    <strong>{story.title}.</strong> {story.result}
                  </li>
                ))}
              </ul>
              <p className="cv-tech">{study.tech.join(" · ")}</p>
            </div>
          ))}
          {professionalProjects.map((project) => (
            <div key={project.id} className="cv-entry">
              <div className="cv-entry-head">
                <h3>
                  {project.name} <span>— {project.tagline}</span>
                </h3>
              </div>
              <ul className="cv-bullets">
                <li>{project.description}</li>
              </ul>
              <p className="cv-tech">{project.tech.join(" · ")}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          <div className="cv-entry">
            <div className="cv-entry-head">
              <h3>
                {education.degree} <span>— {education.school}</span>
              </h3>
              <p className="cv-period">{education.period}</p>
            </div>
            <ul className="cv-bullets">
              <li>Relevant coursework: {education.coursework}.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Languages</h2>
          <p>
            {identity.languages
              .map((l) => `${l.name} — ${l.level.charAt(0).toUpperCase() + l.level.slice(1)}`)
              .join("  ·  ")}
          </p>
        </section>
      </main>
    </div>
  );
}
