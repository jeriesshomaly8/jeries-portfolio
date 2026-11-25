import Image from "next/image";
import { identity } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionHeading index={1} title="About" />
      <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
        <Reveal className="shrink-0">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -end-2.5 -top-2.5 size-full rounded-2xl border border-line-strong"
            />
            <Image
              src="/jeries.jpg"
              alt={`Portrait of ${identity.name}`}
              width={160}
              height={160}
              priority
              className="relative rounded-2xl border border-line"
            />
          </div>
        </Reveal>
        <div className="space-y-6">
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {identity.about}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-mono text-sm text-soft">
              <span className="font-semibold text-accent">Languages:</span>{" "}
              {identity.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
