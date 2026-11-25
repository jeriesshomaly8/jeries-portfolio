import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: number;
  title: string;
};

export function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 flex items-center gap-4">
        <span aria-hidden className="font-mono text-sm font-semibold text-accent">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <span aria-hidden className="h-px grow bg-line" />
      </div>
    </Reveal>
  );
}
