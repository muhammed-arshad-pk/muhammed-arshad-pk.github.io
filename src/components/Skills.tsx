import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Briefcase, FolderGit2 } from "lucide-react";
import clsx from "clsx";
import { experience, projects, skills } from "@/data";
import { Reveal, Section, SectionHead } from "./ui";

const norm = (s: string) => s.toLowerCase().replace(/ api$/, "").trim();
const tokens = (s: string) => norm(s).split(/[\s/]+/);

// Skills whose evidence uses a different name in the stacks
const ALIASES: Record<string, string[]> = {
  "reinforcement learning": ["marl", "ctde"],
  "object detection": ["yolo11", "yolov8"],
  segmentation: ["u-net"],
  cnns: ["u-net", "yolo11"],
  transformers: ["gemini"],
};

function uses(skill: string, stack: string[]) {
  const k = norm(skill);
  const alts = [k, ...(ALIASES[k] ?? [])];
  return stack.some((item) => alts.some((a) => norm(item) === a || tokens(item).includes(a)));
}

export default function Skills() {
  const [selected, setSelected] = useState<string | null>("PyTorch");

  const evidence = useMemo(() => {
    if (!selected) return null;
    return {
      projects: projects.filter((p) => uses(selected, p.stack)),
      roles: experience.filter((r) => uses(selected, r.stack)),
    };
  }, [selected]);

  return (
    <Section id="skills" className="bg-surface/40">
      <SectionHead
        index="05"
        label="Toolkit"
        title={<>The stack, from sensor to server.</>}
        aside={<p>Tap any skill to see exactly where I've used it.</p>}
      />
      <div className="border-t hairline">
        {skills.map((g, i) => {
          const here = selected !== null && g.items.includes(selected);
          return (
            <Reveal key={g.group} delay={i * 0.04}>
              <div className="border-b hairline py-6 md:py-7">
                <div className="grid gap-4 md:grid-cols-12 md:items-center">
                  <p className="flex items-baseline gap-4 md:col-span-4">
                    <span className="font-mono text-xs text-marigold">0{i + 1}</span>
                    <span className={clsx("font-display text-xl font-semibold tracking-tight transition-colors", here && "text-ice")}>{g.group}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 md:col-span-8">
                    {g.items.map((s) => {
                      const active = s === selected;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelected(active ? null : s)}
                          aria-pressed={active}
                          className={clsx(
                            "chip min-h-[40px] min-w-[44px] cursor-pointer justify-center px-3.5 transition",
                            active ? "!border-ice !bg-ice !text-bg" : "hover:border-fg/30 hover:text-fg",
                          )}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {here && evidence && (
                    <motion.div
                      key={selected}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden md:ml-[33.333%]"
                    >
                      <div className="mt-5 rounded-2xl border hairline bg-bg/60 p-4 sm:p-5" aria-live="polite">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                          Where I used <span className="text-ice">{selected}</span>
                        </p>
                        {evidence.projects.length + evidence.roles.length === 0 ? (
                          <p className="mt-3 text-sm text-muted">Part of my everyday toolkit, across coursework, research and side builds.</p>
                        ) : (
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {evidence.projects.map((p) => (
                              <li key={p.id}>
                                <a href={`#project-${p.id}`} className="group flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-surface">
                                  <FolderGit2 size={16} className="shrink-0 text-marigold" />
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-fg">{p.title}</span>
                                    <span className="block truncate text-xs text-muted">{p.kicker}</span>
                                  </span>
                                  <ArrowUpRight size={14} className="shrink-0 text-muted transition group-hover:text-fg" />
                                </a>
                              </li>
                            ))}
                            {evidence.roles.map((r) => (
                              <li key={r.org + r.period}>
                                <a href="#experience" className="group flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-surface">
                                  <Briefcase size={16} className="shrink-0 text-ice" />
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-fg">{r.org}</span>
                                    <span className="block truncate text-xs text-muted">{r.title}</span>
                                  </span>
                                  <ArrowUpRight size={14} className="shrink-0 text-muted transition group-hover:text-fg" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
