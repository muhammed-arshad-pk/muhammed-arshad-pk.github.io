import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Plus, Minus, Hand } from "lucide-react";
import clsx from "clsx";
import { projects, type Project } from "@/data";
import { CountUp, Reveal, Section, SectionHead } from "./ui";
import SafetyCam from "@/visuals/SafetyCam";
import WoundSeg from "@/visuals/WoundSeg";
import Highway from "@/visuals/Highway";
import Trajectory from "@/visuals/Trajectory";
import FlowMeter from "@/visuals/FlowMeter";

const visuals: Record<Project["id"], ComponentType> = {
  safety: SafetyCam,
  wound: WoundSeg,
  mqlc: Highway,
  trajectory: Trajectory,
  flow: FlowMeter,
};

function ProjectRow({ p, flip }: { p: Project; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const Visual = visuals[p.id];

  return (
    <article id={`project-${p.id}`} className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal className={clsx("lg:col-span-7", flip && "lg:order-2")}>
        <div className="group relative aspect-[4/3] overflow-hidden rounded-[20px] border hairline bg-surface sm:aspect-[16/10] sm:rounded-[24px]">
          <Visual />
        </div>
        <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted">
          <Hand size={13} className="shrink-0 text-marigold" />
          {p.hint}
        </p>
      </Reveal>

      <Reveal delay={0.08} className={clsx("lg:col-span-5", flip && "lg:order-1")}>
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-marigold">{p.index}</span>
          <span className="h-px w-8 bg-fg/20" />
          <span>{p.year}</span>
          {p.status && (
            <span className="ml-auto flex items-center gap-2 text-leaf">
              <span className="live-dot" /> live
            </span>
          )}
        </div>
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>
        <p className="mt-2 text-fg/80">{p.kicker}</p>
        <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>

        <dl className="mt-7 grid grid-cols-3 gap-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="border-l hairline pl-3">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-xl font-semibold tabular-nums tracking-tight md:text-2xl">
                <CountUp value={m.value} />
              </dd>
              <dd className="mt-1 text-[11px] leading-tight text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-8 flex min-h-[48px] w-full items-center justify-between border-y hairline py-3.5 text-left text-sm text-fg transition hover:text-ice"
        >
          How it works
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 py-2 text-sm leading-relaxed text-muted first:pt-4">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-marigold" />
                  {pt}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener" className="btn btn-solid">
              Live demo <ArrowUpRight size={16} />
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener" className="btn btn-ghost">
              <Github size={16} /> Source
            </a>
          )}
          {p.status && <p className="text-sm text-muted">{p.status}</p>}
        </div>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="work">
      <SectionHead
        index="02"
        label="Selected work"
        title={
          <>
            Models that leave
            <br className="hidden md:block" /> the notebook.
          </>
        }
        aside={<p>Every visual here is a live, code-drawn sketch of how the system behaves, and every one responds to touch. Go ahead and poke them.</p>}
      />
      <div className="space-y-24 md:space-y-40">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} p={p} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
