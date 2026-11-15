import { useEffect, useRef } from "react";

type Palette = Record<"bg" | "surface" | "fg" | "muted" | "ice" | "marigold" | "leaf" | "danger", string>;
const KEYS: (keyof Palette)[] = ["bg", "surface", "fg", "muted", "ice", "marigold", "leaf", "danger"];

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const p = {} as Palette;
  for (const k of KEYS) p[k] = s.getPropertyValue(`--${k}`).trim().replace(/\s+/g, ",");
  return p;
}

/** rgba() helper for a palette channel triple like "138,180,255". */
export const rgba = (triple: string, a = 1) => `rgba(${triple},${a})`;

export type DrawFn = (ctx: CanvasRenderingContext2D, t: number, w: number, h: number, c: Palette) => void;

/**
 * Drives a canvas animation: handles DPR sizing, theme palette,
 * pauses off-screen, and renders a single still frame under reduced motion.
 */
export function useCanvasLoop(draw: DrawFn) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  // Set inside the effect; lets interactions force a frame (needed under reduced motion).
  const redrawRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let palette = readPalette();
    let w = 0, h = 0, raf = 0, visible = false;
    const start = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce || !visible) frame(performance.now());
    };
    let frozenT = 6;
    const frame = (now: number, live = false) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const t = reduce && !live ? frozenT : (now - start) / 1000;
      if (live) frozenT = t;
      drawRef.current(ctx, t, w, h, palette);
    };
    redrawRef.current = () => frame(performance.now(), true);
    const loop = (now: number) => {
      frame(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => { palette = readPalette(); frame(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    resize();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, []);

  return { ref, redraw: () => redrawRef.current() };
}

/** Pointer position in CSS pixels relative to the canvas. */
export function localPoint(e: { clientX: number; clientY: number; currentTarget: Element }) {
  const r = e.currentTarget.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Small mono label with filled background, like a detector's class tag. */
export function tag(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, bg: string, fg = "#0b0b0b") {
  ctx.font = '500 10px "JetBrains Mono", monospace';
  const tw = ctx.measureText(text).width + 8;
  ctx.fillStyle = bg;
  ctx.fillRect(x, y - 14, tw, 14);
  ctx.fillStyle = fg;
  ctx.fillText(text, x + 4, y - 4);
}
