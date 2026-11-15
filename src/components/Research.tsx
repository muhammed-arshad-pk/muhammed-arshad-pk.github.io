import { BookOpen, GraduationCap } from "lucide-react";
import { awards, education, publication } from "@/data";
import { Reveal, Section, SectionHead } from "./ui";

export default function Research() {
  return (
    <Section id="research">
      <SectionHead index="04" label="Research & recognition" title={<>Published, awarded, still studying.</>} />

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <article className="card relative h-full overflow-hidden p-7 md:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ice/10 blur-3xl" />
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <BookOpen size={15} className="text-ice" /> IEEE CONFERENCE PAPER · {publication.year}
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{publication.title}</h3>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {publication.venue}
              <br />
              {publication.place}
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <article className="card flex h-full flex-col p-7 md:p-10">
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <GraduationCap size={15} className="text-ice" /> EDUCATION
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{education.degree}</h3>
            <p className="mt-2 text-muted">{education.school}</p>
            <div className="mt-auto flex items-end justify-between pt-10">
              <div>
                <p className="font-display text-5xl font-semibold tracking-tight">8.93</p>
                <p className="mt-1 font-mono text-xs text-muted">CGPA / 10</p>
              </div>
              <p className="font-mono text-xs text-muted">{education.period}</p>
            </div>
          </article>
        </Reveal>

        {awards.map((a, i) => (
          <Reveal key={a.title} delay={0.06 * i} className="lg:col-span-6">
            <article className="card flex h-full gap-6 p-7 md:p-9">
              <p className="font-display text-5xl font-semibold leading-none tracking-tight text-marigold md:text-6xl">
                {a.place.replace(/\D/g, "")}
                <sup className="ml-0.5 align-super text-lg">{a.place.replace(/\d/g, "")}</sup>
              </p>
              <div>
                <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-1 text-xs text-muted">{a.event} · {a.date}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{a.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
