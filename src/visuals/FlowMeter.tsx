import { useRef, useState } from "react";
import clsx from "clsx";
import { useCanvasLoop, rgba, roundRect } from "@/lib/canvas";

const base = (t: number) =>
  Math.max(1, Math.min(30, 12 + 6 * Math.sin(t * 0.45) + 2 * Math.sin(t * 1.9) + 0.7 * Math.sin(t * 5.3)));

const SAMPLES = 80, STEP = 0.15;

export default function FlowMeter() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;
  const S = useRef<{ last: number; valve: number; acc: number; hist: number[]; total: number } | null>(null);

  const { ref, redraw } = useCanvasLoop((ctx, t, w, h, c) => {
    if (!S.current) {
      S.current = { last: t, valve: 0, acc: 0, total: 1284.6, hist: Array.from({ length: SAMPLES }, (_, i) => base(t - (SAMPLES - i) * STEP)) };
    }
    const st = S.current;
    const dt = Math.min(Math.max(t - st.last, 0), 0.1);
    st.last = t;
    // valve eases open while held, closes when released
    st.valve += ((openRef.current ? 1 : 0) - st.valve) * Math.min(1, dt * (openRef.current ? 3 : 1.6));
    const b = base(t);
    const v = b + st.valve * (29.2 - b);
    st.total += (v * dt) / 60;
    st.acc += dt;
    while (st.acc >= STEP) { st.acc -= STEP; st.hist.push(v); st.hist.shift(); }

    ctx.fillStyle = rgba(c.surface, 1);
    ctx.fillRect(0, 0, w, h);
    const narrow = w < 460;

    // --- TFT device panel ---
    const pw = narrow ? w - 28 : Math.min(250, w * 0.42);
    const ph = narrow ? h * 0.5 : h - 70;
    const px = 14, py = 40;
    roundRect(ctx, px, py, pw, ph, 14);
    ctx.fillStyle = "rgb(10,14,20)";
    ctx.fill();
    ctx.strokeStyle = rgba(c.fg, 0.15);
    ctx.stroke();

    const gx = px + pw / 2, gy = py + ph * (narrow ? 0.66 : 0.58), gr = Math.min(pw * 0.36, ph * 0.38);
    const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    ctx.lineCap = "round";
    ctx.lineWidth = 9;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath(); ctx.arc(gx, gy, gr, a0, a1); ctx.stroke();
    const grad = ctx.createLinearGradient(gx - gr, 0, gx + gr, 0);
    grad.addColorStop(0, "rgb(56,189,248)");
    grad.addColorStop(1, st.valve > 0.5 ? "rgb(250,204,21)" : "rgb(74,222,128)");
    ctx.strokeStyle = grad;
    ctx.beginPath(); ctx.arc(gx, gy, gr, a0, a0 + (a1 - a0) * (v / 30)); ctx.stroke();
    ctx.lineCap = "butt";

    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(236,253,245)";
    ctx.font = `600 ${Math.round(gr * 0.55)}px "JetBrains Mono", monospace`;
    ctx.fillText(v.toFixed(1), gx, gy + gr * 0.12);
    ctx.font = '500 10px "JetBrains Mono", monospace';
    ctx.fillStyle = "rgba(236,253,245,0.6)";
    ctx.fillText("L/min", gx, gy + gr * 0.42);
    ctx.fillText(`total ${st.total.toFixed(1)} L`, gx, py + 22);
    ctx.textAlign = "left";

    // --- cloud sparkline ---
    const sx = narrow ? 14 : px + pw + 22;
    const sy = narrow ? py + ph + 16 : py + 18;
    const sw = narrow ? w - 28 : w - sx - 14;
    const sh = narrow ? h - sy - 34 : ph - 40;
    ctx.strokeStyle = rgba(c.fg, 0.07);
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = sy + (sh / 3) * i;
      ctx.beginPath(); ctx.moveTo(sx, y); ctx.lineTo(sx + sw, y); ctx.stroke();
    }
    ctx.beginPath();
    st.hist.forEach((val, i) => {
      const x = sx + (i / (SAMPLES - 1)) * sw;
      const y = sy + sh - (val / 30) * sh;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    });
    ctx.strokeStyle = rgba(c.leaf, 1);
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.lineTo(sx + sw, sy + sh); ctx.lineTo(sx, sy + sh); ctx.closePath();
    ctx.fillStyle = rgba(c.leaf, 0.08);
    ctx.fill();

    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.fillStyle = rgba(c.fg, 0.8);
    ctx.fillText("ESP32 · YF-S201 · TFT", 14, 22);
    const synced = narrow ? "☁ synced" : "☁ synced · uptime 24×7";
    ctx.fillStyle = rgba(c.leaf, 1);
    ctx.fillText(synced, w - ctx.measureText(synced).width - 14, 22);
    if (!narrow) {
      ctx.fillStyle = rgba(c.muted, 1);
      ctx.fillText("calibrated ±1–2% · 1–30 L/min", sx, h - 12);
    }
  });

  const press = (on: boolean) => { setOpen(on); openRef.current = on; redraw(); };

  return (
    <>
      <canvas ref={ref} className="absolute inset-0 h-full w-full" role="img" aria-label="Live flow meter with gauge and cloud chart" />
      <button
        type="button"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); press(true); }}
        onPointerUp={() => press(false)}
        onPointerCancel={() => press(false)}
        onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) press(true); }}
        onKeyUp={() => press(false)}
        onContextMenu={(e) => e.preventDefault()}
        aria-pressed={open}
        className={clsx(
          "absolute bottom-3 right-3 min-h-[40px] select-none rounded-full px-4 font-mono text-[11px] transition touch-none",
          open ? "scale-95 bg-marigold text-black" : "bg-white/90 text-black hover:bg-white",
        )}
        style={{ WebkitTouchCallout: "none" }}
      >
        {open ? "valve open…" : "hold to open valve"}
      </button>
    </>
  );
}
