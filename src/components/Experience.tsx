import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { experience } from "@/data";
import { Reveal, Section, SectionHead } from "./ui";

export default function Experience() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });

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
        aside={<p>Five roles across industry R&D, academic research and embedded hardware. Tap a role to open it.</p>}
      />

      <ol className="border-t hairline">
        {experience.map((r, i) => {
          const isOpen = open.has(i);
          const id = `role-${i}`;
          return (
            <li key={r.org + r.period} className="border-b hairline">
              <Reveal delay={i * 0.04}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  className="group grid w-full gap-x-10 gap-y-2 py-7 text-left md:grid-cols-12 md:items-center md:py-9"
                >
                  <span className="flex items-center gap-2.5 font-mono text-xs text-muted md:col-span-3">
                    {r.current && <span className="live-dot" />}
                    {r.period}
                  </span>
                  <span className="flex items-start justify-between gap-4 md:col-span-9">
                    <span>
                      <span className="block font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-ice sm:text-2xl">
                        {r.org}
                      </span>
                      <span className="mt-1 block text-fg/75">{r.title}</span>
                    </span>
                    <span
                      className={clsx(
                        "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border hairline transition-transform duration-300",
                        isOpen && "rotate-45 border-fg/30",
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-x-10 pb-9 md:grid-cols-12">
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-marigold md:col-span-3 md:mb-0">{r.tag}</p>
                        <div className="md:col-span-9">
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
