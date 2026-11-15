import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, ArrowUpRight, FileText, User, Layers, Briefcase, BookOpen, Cpu, Mail } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data";

const links = [
  { id: "about", label: "About", icon: User },
  { id: "work", label: "Work", icon: Layers },
  { id: "experience", label: "Experience", short: "Exp", icon: Briefcase },
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
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              aria-label="Open résumé (PDF)"
              className="grid h-11 w-11 place-items-center rounded-full border hairline text-fg sm:hidden"
            >
              <FileText size={17} />
            </a>
            <button
              onClick={toggleTheme}
              className="grid h-11 w-11 place-items-center rounded-full border hairline text-fg transition hover:border-fg/40"
              aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
            >
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / tablet dock: thumb-reachable section nav */}
      <nav
        aria-label="Sections"
        className={clsx(
          "fixed inset-x-0 z-50 flex justify-center px-3 transition-all duration-500 lg:hidden",
          scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      >
        <ul className="flex w-full max-w-md items-stretch justify-between rounded-full border hairline bg-bg/80 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {links.map((l) => {
            const on = active === l.id;
            return (
              <li key={l.id} className="flex-1">
                <a
                  href={`#${l.id}`}
                  aria-current={on ? "true" : undefined}
                  className={clsx(
                    "relative flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-full text-[10px] transition-colors",
                    on ? "text-bg" : "text-muted active:text-fg",
                  )}
                >
                  {on && <motion.span layoutId="dock-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                  <l.icon size={17} className="relative" />
                  <span className="relative">{l.short ?? l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
