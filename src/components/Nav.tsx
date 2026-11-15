import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, ArrowUpRight, Menu, X, Github, Linkedin, User, Layers, Briefcase, BookOpen, Cpu, Mail } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data";

const links = [
  { id: "about", label: "About", icon: User },
  { id: "work", label: "Work", icon: Layers },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "research", label: "Research", icon: BookOpen },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Logo() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
      <path d="M14 50 32 12l18 38" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M8 18V8h10M56 18V8H46M8 46v10h10M56 46v10H46" fill="none" className="stroke-marigold" strokeWidth="3" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // While the menu is open: lock page scroll, close on Escape, close if resized to desktop
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);
  const [light, setLight] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "light");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  // Close the menu first, then scroll once the scroll lock is released.
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${id}`);
      }),
    );
  };

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch { /* storage unavailable */ }
  };

  return (
    <>
      {/* reading progress */}
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-ice to-marigold" style={{ scaleX: progress }} />

      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500",
          scrolled ? "border-b hairline bg-bg/75 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6 md:h-20">
          <a href="#top" className="flex min-h-[44px] min-w-[44px] items-center gap-3 text-fg" aria-label="Back to top">
            <Logo />
            <span className="hidden font-mono text-xs tracking-[0.2em] text-muted sm:inline">ARSHAD.PK</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={clsx("relative rounded-full px-4 py-2 text-sm transition-colors", active === l.id ? "text-fg" : "text-muted hover:text-fg")}
                >
                  {l.label}
                  {active === l.id && <motion.span layoutId="nav-underline" className="absolute inset-x-4 -bottom-0.5 h-px bg-fg" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost hidden min-h-[44px] !py-2 text-sm sm:inline-flex">
              Résumé <ArrowUpRight size={15} />
            </a>
            <button
              onClick={toggleTheme}
              className="grid h-11 w-11 place-items-center rounded-full border hairline text-fg transition hover:border-fg/40"
              aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
            >
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border hairline text-fg lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </nav>
      </header>

      {/*
        Mobile menu. Rendered OUTSIDE <header> on purpose: the header's backdrop-blur
        creates a containing block, which would trap a fixed overlay inside the bar.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-bg px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between">
              <a href="#top" onClick={(e) => go(e, "top")} className="flex min-h-[44px] min-w-[44px] items-center text-fg" aria-label="Back to top">
                <Logo />
              </a>
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border hairline text-fg"
                aria-label="Close menu"
                autoFocus
              >
                <X size={19} />
              </button>
            </div>

            <ul className="mt-6 flex-1 space-y-1">
              {links.map((l, i) => {
                const on = active === l.id;
                return (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => go(e, l.id)}
                      aria-current={on ? "true" : undefined}
                      className={clsx(
                        "flex min-h-[56px] items-center gap-4 rounded-2xl px-3 transition-colors",
                        on ? "bg-surface text-fg" : "text-fg/80 active:bg-surface",
                      )}
                    >
                      <span className="w-6 font-mono text-xs text-marigold">0{i + 1}</span>
                      <span className="flex-1 font-display text-[1.7rem] font-semibold tracking-tight">{l.label}</span>
                      <l.icon size={18} className={on ? "text-ice" : "text-muted"} />
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-4">
              <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-solid w-full justify-center">
                Download résumé <ArrowUpRight size={16} />
              </a>
              <div className="flex items-center justify-center gap-2">
                <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border hairline text-muted">
                  <Github size={18} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border hairline text-muted">
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full border hairline text-muted">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
