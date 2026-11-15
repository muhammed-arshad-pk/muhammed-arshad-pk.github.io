import { useRef, useState } from "react";
import { useCanvasLoop, rgba, localPoint } from "@/lib/canvas";
import clsx from "clsx";

type Mode = "raw" | "overlay" | "mask";

const TISSUE = [
  { name: "Epithelial", raw: "214,140,140", cls: "244,114,182" },
  { name: "Granulation", raw: "150,30,38", cls: "239,68,68" },
  { name: "Slough", raw: "196,170,96", cls: "250,204,21" },
  { name: "Necrotic", raw: "40,26,24", cls: "120,113,108" },
];

function blob(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, seed: number, t: number, sx = 1.25) {
  ctx.beginPath();
  const n = 64;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k =
      1 +
      0.13 * Math.sin(a * 3 + seed) +
      0.08 * Math.sin(a * 5 + seed * 2.1 + t * 0.6) +
      0.05 * Math.sin(a * 9 + seed * 0.7);
    const x = cx + Math.cos(a) * r * k * sx;
    const y = cy + Math.sin(a) * r * k;
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.closePath();
}

export default function WoundSeg() {
  const [mode, setMode] = useState<Mode>("overlay");
  // Fraction 0..1 set by dragging; holds briefly after release, then auto-sweep resumes.
  const scrub = useRef<{ f: number; until: number } | null>(null);
  const tNow = useRef(0);

  const { ref, redraw } = useCanvasLoop((ctx, t, w, h, c) => {
    tNow.current = t;
    // Sit the wound a little high and smaller on phones so the legend never covers it
    const narrow = w < 520;
    const cx = w / 2, cy = narrow ? h * 0.45 : h / 2 + 6, R = Math.min(w, h) * (narrow ? 0.22 : 0.26);
    const layers = [
      { r: R * 1.12, seed: 1.3, dx: 0, dy: 0, ti: 0 },
      { r: R * 0.92, seed: 2.2, dx: 0, dy: 0, ti: 1 },
      { r: R * 0.38, seed: 4.1, dx: R * 0.42, dy: -R * 0.18, ti: 2 },
      { r: R * 0.22, seed: 0.6, dx: -R * 0.5, dy: R * 0.25, ti: 3 },
    ];

    const drawRaw = () => {
      const skin = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, Math.max(w, h) * 0.7);
      skin.addColorStop(0, "rgb(176,124,98)");
      skin.addColorStop(1, "rgb(92,60,46)");
      ctx.fillStyle = skin;
      ctx.fillRect(0, 0, w, h);
      for (const L of layers) {
        blob(ctx, cx + L.dx, cy + L.dy, L.r, L.seed, t);
        ctx.fillStyle = `rgb(${TISSUE[L.ti].raw})`;
        ctx.fill();
      }
      // texture speckle
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      for (let i = 0; i < 70; i++) {
        const a = i * 2.39, rr = (i / 70) * R;
        ctx.fillRect(cx + Math.cos(a) * rr * 1.2, cy + Math.sin(a) * rr, 2, 2);
      }
    };

    const drawMask = (alpha: number) => {
      for (const L of layers) {
        blob(ctx, cx + L.dx, cy + L.dy, L.r, L.seed, t);
        ctx.fillStyle = `rgba(${TISSUE[L.ti].cls},${alpha})`;
        ctx.fill();
      }
      blob(ctx, cx, cy, layers[0].r, layers[0].seed, t);
      ctx.strokeStyle = rgba(c.ice, 0.95);
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    if (mode === "mask") {
      ctx.fillStyle = "rgb(8,9,12)";
      ctx.fillRect(0, 0, w, h);
      drawMask(1);
    } else {
      drawRaw();
      if (mode === "overlay") {
        // inference sweep reveals the predicted mask
        const s = scrub.current;
        if (s && t > s.until) scrub.current = null;
        const sweep = scrub.current ? scrub.current.f * w : ((t * 0.35) % 1.4) * w;
        ctx.save();
        ctx.beginPath(); ctx.rect(0, 0, sweep, h); ctx.clip();
        drawMask(0.55);
        ctx.restore();
        ctx.strokeStyle = rgba(c.ice, 0.9);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sweep, 0); ctx.lineTo(sweep, h); ctx.stroke();
      }
    }

    // HUD
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(`U-Net · ${mode.toUpperCase()}`, 14, 22);
    const area = (12.4 + 0.15 * Math.sin(t * 0.6)).toFixed(1);
    ctx.fillText(`area ≈ ${area} cm²`, 14, h - 14);
    const label = "illustrative";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText(label, w - ctx.measureText(label).width - 14, h - 14);
  });

  const dragging = useRef(false);
  const setScrub = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = localPoint(e);
    scrub.current = { f: Math.min(1, Math.max(0, p.x / p.w)), until: tNow.current + 2.5 };
    if (mode !== "overlay") setMode("overlay");
    redraw();
  };

  return (
    <>
      <canvas
        ref={ref}
        className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y"
        role="img"
        aria-label="Illustrative wound segmentation: drag across the image to reveal the predicted tissue mask"
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); setScrub(e); }}
        onPointerMove={(e) => { if (dragging.current) setScrub(e); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      />
      <div className="absolute right-3 top-3 flex gap-1 rounded-full bg-black/55 p-1 backdrop-blur">
        {(["raw", "overlay", "mask"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); scrub.current = null; }}
            aria-pressed={mode === m}
            className={clsx(
              "min-h-[40px] min-w-[44px] rounded-full px-3 py-1 font-mono text-[11px] transition",
              mode === m ? "bg-white text-black" : "text-white/70 hover:text-white",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="absolute bottom-9 left-3 flex flex-wrap gap-x-3 gap-y-1 rounded-lg bg-black/55 px-2.5 py-1.5 backdrop-blur">
        {TISSUE.map((tz) => (
          <span key={tz.name} className="flex items-center gap-1.5 font-mono text-[10.5px] text-white/85">
            <i className="h-2 w-2 rounded-full" style={{ background: `rgb(${tz.cls})` }} />
            {tz.name}
          </span>
        ))}
      </div>
    </>
  );
}
