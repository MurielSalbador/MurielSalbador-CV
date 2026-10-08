import { LineReveal, Reveal } from "./Reveal";

export default function SectionHeading({ index, eyebrow, lines, children }) {
  return (
    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal className="eyebrow flex items-center gap-3">
          <span className="text-acid">{index}</span>
          <span className="h-px w-10 bg-white/20" />
          {eyebrow}
        </Reveal>
        <h2 className="mt-6 text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.045em]">
          <LineReveal lines={lines} />
        </h2>
      </div>
      {children && (
        <Reveal delay={0.2} className="text-base leading-relaxed text-zinc-400 md:col-span-4 md:pb-3">
          {children}
        </Reveal>
      )}
    </div>
  );
}
