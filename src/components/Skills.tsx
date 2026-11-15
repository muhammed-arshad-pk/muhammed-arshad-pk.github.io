import { skills } from "@/data";
import { Reveal, Section, SectionHead } from "./ui";

export default function Skills() {
  return (
    <Section id="skills" className="bg-surface/40">
      <SectionHead
        index="05"
        label="Toolkit"
        title={<>The stack, from sensor to server.</>}
        aside={<p>Data collection and annotation, training, deployment and the hardware the model runs next to.</p>}
      />
      <div className="border-t hairline">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.04}>
            <div className="group grid gap-4 border-b hairline py-7 md:grid-cols-12 md:items-center">
              <p className="flex items-baseline gap-4 md:col-span-4">
                <span className="font-mono text-xs text-marigold">0{i + 1}</span>
                <span className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-ice">{g.group}</span>
              </p>
              <div className="flex flex-wrap gap-2 md:col-span-8">
                {g.items.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
