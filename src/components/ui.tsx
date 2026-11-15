import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, label, title, aside }: { index: string; label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-8">
        <p className="eyebrow mb-5">
          <span className="text-marigold">{index}</span> <span className="mx-2 opacity-50">/</span> {label}
        </p>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {aside && (
        <Reveal delay={0.1} className="text-muted md:col-span-4 md:pb-2">
          {aside}
        </Reveal>
      )}
    </div>
  );
}

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={clsx("relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-36", className)}>
      <div className="mx-auto max-w-page">{children}</div>
    </section>
  );
}
