import { BugHunt } from "./BugHunt";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SkillDrop } from "./SkillDrop";

export function Playground() {
  return (
    <section id="playground" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24">
      <SectionHeading index={5} title="Playground" />
      <Reveal>
        <p className="-mt-6 mb-10 max-w-2xl text-muted">
          Portfolios are usually static. This one isn&apos;t — two small toys, built from scratch
          with no game libraries. The physics, the collisions, the bugs: all hand-rolled.
        </p>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <h3 className="mb-3 font-display text-lg font-semibold">Skill Drop</h3>
          <SkillDrop />
        </Reveal>
        <Reveal delay={0.1} className="min-w-0">
          <h3 className="mb-3 font-display text-lg font-semibold">Bug Hunt</h3>
          <BugHunt />
        </Reveal>
      </div>
    </section>
  );
}
