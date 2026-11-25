import { identity } from "@/content/profile";
import { CopyEmailButton } from "./CopyEmailButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionHeading index={6} title="Contact" />
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-card px-6 py-12 text-center sm:px-12">
          <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Let&apos;s build something.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            I&apos;m open to full-time opportunities. If my work looks like a fit for your team, my
            inbox is open.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 font-mono text-sm text-ink">
            <span dir="ltr">{identity.email}</span>
            <CopyEmailButton email={identity.email} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${identity.email}`}
              className="inline-block rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Email me
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-line-strong bg-card px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn ↗
            </a>
            {identity.github && (
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-line-strong bg-card px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>
      <footer className="mt-24 border-t border-line pt-8 text-center">
        <p className="text-sm text-soft">
          © {new Date().getFullYear()} {identity.name} · Built with Next.js ·{" "}
          <span className="font-semibold text-accent">P.S.</span> the terminal up top accepts
          commands
        </p>
      </footer>
    </section>
  );
}
