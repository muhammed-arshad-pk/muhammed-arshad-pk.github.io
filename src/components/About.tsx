import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { education, metrics, profile } from "@/data";
import { Reveal, Section, SectionHead } from "./ui";
import walk from "@/assets/img/walk.webp";

const stack = ["YOLO11", "U-Net", "PyTorch", "OpenCV", "LangChain", "RAG", "Gemini", "MARL", "GCN-GRU", "LSTM", "FastAPI", "Docker", "ESP32", "TensorFlow"];

export function Marquee() {
  const row = [...stack, ...stack];
  return (
    <div className="relative overflow-hidden border-y hairline py-5" aria-hidden>
      <div className="marquee flex w-max gap-10">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-light text-fg/70 md:text-3xl">
            {s}
            <span className="text-marigold">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHead
        index="01"
        label="About"
        title={
          <>
            I like problems you can
            <br className="hidden md:block" /> <span className="text-gradient">point a camera at.</span>
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="relative overflow-hidden rounded-[24px] border hairline">
            <img src={walk} alt="Muhammed Arshad on a marigold-lined path" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
              <p>
                I'm <span className="text-fg">Arshad</span>, a Computer Vision & AI Engineer at{" "}
                <span className="text-fg">{profile.company}</span>, where I teach site cameras to notice a missing helmet before anyone gets hurt.
              </p>
              <p>
                Before that I spent a year in medical-imaging R&D at <span className="text-fg">Aerobiosys</span>, building wound segmentation that
                clinicians could trust, wired to an LLM that reads the textbooks so they don't have to. At <span className="text-fg">NIT Karnataka</span>{" "}
                I worked on multi-agent RL and trajectory prediction for autonomous driving, and at <span className="text-fg">Haz Labs</span> I built hardware that ran 24×7 in the field.
              </p>
              <p>
                The common thread is simple: <span className="text-fg">perception that ends in a decision.</span> A model is only interesting to me when it changes what happens next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="card p-5">
                <GraduationCap size={18} className="text-ice" />
                <p className="mt-4 text-sm text-fg">{education.degree}</p>
                <p className="mt-1 text-xs text-muted">{education.school} · CGPA {education.cgpa}</p>
              </div>
              <div className="card p-5">
                <Sparkles size={18} className="text-ice" />
                <p className="mt-4 text-sm text-fg">IEEE published</p>
                <p className="mt-1 text-xs text-muted">2 regional prizes · 5 research & industry roles</p>
              </div>
              <div className="card p-5">
                <MapPin size={18} className="text-ice" />
                <p className="mt-4 text-sm text-fg">{profile.location}</p>
                <p className="mt-1 text-xs text-muted">Open to collaborations & hard problems</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* metrics */}
      <div className="mt-20 grid grid-cols-2 border-l border-t hairline lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.06} className="border-b border-r hairline p-4 sm:p-8">
            <p className="whitespace-nowrap font-display text-[1.7rem] font-semibold tracking-tight sm:text-4xl md:text-5xl">{m.value}</p>
            <p className="mt-3 text-sm text-fg">{m.label}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{m.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
