import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "@/data";
import portrait from "@/assets/img/hero.webp";

const ease = [0.22, 1, 0.36, 1] as const;

/** Portrait card that tilts toward a fine pointer (mouse/trackpad). Touch devices get a static card. */
function TiltPortrait() {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 55%)`);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div className="relative [perspective:1200px]" onPointerMove={onMove} onPointerLeave={reset}>
      <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-ice/10 blur-3xl" />
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="relative aspect-[4/5] overflow-hidden rounded-[24px] border hairline bg-surface shadow-2xl shadow-black/40 md:aspect-[3/4] sm:rounded-[28px]"
      >
        <img
          src={portrait}
          alt="Portrait of Muhammed Arshad"
          width={960}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden mix-blend-soft-light [@media(hover:hover)]:block"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 md:pt-32 lg:min-h-[100svh]">
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

      {/* Phone: intro → portrait → details. Desktop: intro + details left, portrait right. */}
      <div className="relative mx-auto grid max-w-page gap-x-8 gap-y-8 md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[auto_auto] md:items-center lg:gap-x-10">
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow mb-4 sm:mb-6">
            Hi, I'm
          </motion.p>
          <h1 className="font-display text-[clamp(3rem,7.2vw,8.4rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
              {profile.first}
            </motion.span>
            <motion.span className="text-gradient block pb-2" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.12, ease }}>
              {profile.last}.
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.26em] text-fg/90 sm:mt-6 sm:text-sm sm:tracking-[0.32em]"
          >
            Computer Vision <span className="text-marigold">&</span> AI Engineer
          </motion.p>
        </div>

        <motion.div
          className="mx-auto w-full max-w-[min(400px,100%)] md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-[min(480px,calc((100svh-6rem)*0.75))] [@media(max-height:520px)]:self-start"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <TiltPortrait />
        </motion.div>

        <motion.div
          className="md:col-start-1 md:row-start-2 md:self-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="hidden h-px w-14 bg-fg/40 md:block" />
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mt-6">{profile.tagline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <a href="#work" className="btn btn-solid flex-1 justify-center sm:flex-none">
              See the work <ArrowUpRight size={17} />
            </a>
            <a href="#contact" className="btn btn-ghost flex-1 justify-center sm:flex-none">
              Let's talk
            </a>
            <div className="flex items-center gap-1">
              <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-fg">
                <Github size={19} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-fg">
                <Linkedin size={19} />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted sm:mt-12">
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

      <a
        href="#about"
        className="relative mx-auto mt-14 hidden w-max items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-muted transition hover:text-fg lg:flex"
      >
        <ArrowDown size={14} className="animate-bounce" /> SCROLL
      </a>
    </section>
  );
}
