import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Phone } from "lucide-react";
import { profile } from "@/data";
import { Logo } from "./Nav";
import { Reveal, Section } from "./ui";

function useIST() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useIST();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Hello from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n- ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const links = [
    { icon: Github, label: "GitHub", value: "muhammed-arshad-pk", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: "in/muhammed-arshad-p-k", href: profile.linkedin },
    { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: FileText, label: "Résumé", value: "PDF · 2 pages", href: profile.resume },
  ];

  const field =
    "w-full rounded-xl border hairline bg-bg/60 px-4 py-3 text-fg placeholder:text-muted/70 outline-none transition focus:border-ice/60";

  return (
    <>
      <Section id="contact" className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-[50%] border-t border-ice/30 bg-[radial-gradient(ellipse_at_top,rgb(var(--ice)/0.12),transparent_60%)]" />

        <Reveal>
          <p className="eyebrow mb-6">
            <span className="text-marigold">06</span> <span className="mx-2 opacity-50">/</span> Contact
          </p>
          <h2 className="font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            Let's build something
            <br />
            <span className="text-gradient">that sees.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-md text-lg text-muted">
              Vision systems, applied ML research, or something that needs a model and a soldering iron. My inbox is open.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="break-all font-display text-xl font-semibold underline decoration-fg/20 underline-offset-8 transition hover:decoration-ice sm:text-2xl">
                {profile.email}
              </a>
              <button onClick={copy} className="grid h-10 w-10 place-items-center rounded-full border hairline text-muted transition hover:text-fg" aria-label="Copy email address">
                {copied ? <Check size={16} className="text-leaf" /> : <Copy size={16} />}
              </button>
              <span role="status" className="sr-only">{copied ? "Email copied" : ""}</span>
            </div>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border hairline bg-fg/[0.06] sm:grid-cols-2">
              {links.map((l) => (
                <li key={l.label} className="bg-bg">
                  <a href={l.href} target={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "_blank" : undefined} rel="noopener" className="group flex items-center gap-4 p-5 transition hover:bg-surface">
                    <l.icon size={18} className="text-muted transition group-hover:text-ice" />
                    <span className="min-w-0">
                      <span className="block text-sm text-fg">{l.label}</span>
                      <span className="block truncate font-mono text-[11px] text-muted">{l.value}</span>
                    </span>
                    <ArrowUpRight size={15} className="ml-auto text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <form onSubmit={onSubmit} className="card space-y-4 bg-surface/80 p-6 backdrop-blur md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">Name</span>
                  <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">Email</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Message</span>
                <textarea name="message" required rows={5} placeholder="What are you building?" className={field + " resize-none"} />
              </label>
              <button type="submit" className="btn btn-solid w-full justify-center">
                Send message <ArrowUpRight size={16} />
              </button>
              <p className="text-center text-xs text-muted">Opens your mail app with the message ready to send.</p>
            </form>
          </Reveal>
        </div>
      </Section>

      <footer className="border-t hairline px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <div className="flex items-center gap-3 text-fg">
            <Logo />
            <span className="text-sm text-muted">© {new Date().getFullYear()} {profile.name}</span>
          </div>
          <p className="font-mono text-xs">
            {time} IST · {profile.location}
          </p>
          <a href="#top" className="font-mono text-xs transition hover:text-fg">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  );
}
