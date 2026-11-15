import { experience } from "@/data";
import { Reveal, Section, SectionHead } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" className="bg-surface/40">
      <SectionHead
        index="03"
        label="Experience"
        title={
          <>
            From research labs
            <br className="hidden md:block" /> to the factory floor.
          </>
        }
        aside={<p>Five roles across industry R&D, academic research and embedded hardware. Each one shipped something that ran outside a notebook.</p>}
      />

      <ol className="border-t hairline">
        {experience.map((r, i) => (
          <li key={r.org + r.period} className="border-b hairline">
            <Reveal delay={i * 0.04}>
              <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-12">
                <div className="md:col-span-4">
                  <p className="flex items-center gap-2.5 font-mono text-xs text-muted">
                    {r.current && <span className="live-dot" />}
                    {r.period}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{r.org}</h3>
                  <p className="mt-1 text-fg/80">{r.title}</p>
                  <p className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-marigold">{r.tag}</p>
                </div>
                <div className="md:col-span-8">
                  <ul className="space-y-3">
                    {r.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-fg/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {r.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
