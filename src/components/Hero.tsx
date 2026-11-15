import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "@/data";
import portrait from "@/assets/img/hero.webp";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-32 lg:min-h-screen">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[720px] w-[720px] rounded-full bg-ice/10 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-marigold/[0.06] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--line) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-page items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* copy */}
        <div className="order-2 lg:order-1">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow mb-6">
            Hi, I'm
          </motion.p>
          <h1 className="font-display text-[clamp(3.2rem,7.6vw,8.4rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
              {profile.first}
            </motion.span>
            <motion.span
              className="text-gradient block pb-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease }}
            >
              {profile.last}.
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            <p className="mt-6 font-mono text-[0.8rem] uppercase tracking-[0.32em] text-fg/90 sm:text-sm">
              Computer Vision <span className="text-marigold">&</span> AI Engineer
            </p>
            <div className="mt-6 h-px w-14 bg-fg/40" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-solid">
                See the work <ArrowUpRight size={17} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Let's talk
              </a>
              <div className="ml-1 flex items-center gap-1">
                <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-fg">
                  <Github size={19} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-fg">
                  <Linkedin size={19} />
                </a>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              <span className="flex items-center gap-2.5">
                <span className="live-dot" />
                Now at <span className="text-fg">{profile.company}</span>
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {profile.location}
              </span>
            </div>
          </motion.div>
        </div>

        {/* portrait viewport */}
        <motion.div
          className="order-1 mx-auto w-full max-w-[min(440px,82vw)] lg:order-2 lg:max-w-[480px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="relative">
            <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-ice/10 blur-3xl" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border hairline bg-surface shadow-2xl shadow-black/40">
              <img src={portrait} alt="Portrait of Muhammed Arshad" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="relative mx-auto mt-14 hidden w-max items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-muted transition hover:text-fg lg:flex"
      >
        <ArrowDown size={14} className="animate-bounce" /> SCROLL
      </a>
    </section>
  );
}
