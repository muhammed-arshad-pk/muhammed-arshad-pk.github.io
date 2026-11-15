import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [light, setLight] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
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
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b hairline bg-bg/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6 md:h-20">
        <a href="#top" className="flex items-center gap-3 text-fg" aria-label="Back to top">
          <Logo />
          <span className="hidden font-mono text-xs tracking-[0.2em] text-muted sm:inline">ARSHAD.PK</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === l.id ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {l.label}
                {active === l.id && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-fg" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost hidden !py-2 text-sm sm:inline-flex">
            Résumé <ArrowUpRight size={15} />
          </a>
          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border hairline text-fg transition hover:border-fg/40"
            aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
          >
            {light ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border hairline lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border hairline" aria-label="Close menu">
              <X size={18} />
            </button>
          </div>
          <ul className="mt-14 space-y-2">
            {links.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold">
                  <span className="font-mono text-xs text-marigold">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-solid mt-auto justify-center">
            Download résumé <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
