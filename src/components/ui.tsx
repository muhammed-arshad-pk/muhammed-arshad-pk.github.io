import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

// Numbers not glued to a letter (so "YOLO11" stays as-is, "2.4×" animates).
// Checked manually instead of a regex lookbehind, which older iOS Safari can't parse.
const NUM = /\d+(?:\.\d+)?/g;
const gluedToWord = (s: string, i: number) => i > 0 && /[A-Za-z]/.test(s[i - 1]);

/** Counts every number in a label (e.g. "98–99%", "±1–2%") up from zero when scrolled into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 1300);
      setP(1 - Math.pow(1 - k, 3));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const text = value.replace(NUM, (m, i: number) => {
    if (gluedToWord(value, i)) return m;
    const dec = m.includes(".") ? m.split(".")[1].length : 0;
    return (parseFloat(m) * p).toFixed(dec);
  });

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}

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
    <section id={id} className={clsx("relative scroll-mt-16 px-4 py-20 sm:px-6 md:scroll-mt-20 md:py-36", className)}>
      <div className="mx-auto max-w-page">{children}</div>
    </section>
  );
}
