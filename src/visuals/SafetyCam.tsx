import { useCanvasLoop, rgba, tag } from "@/lib/canvas";

const workers = [
  // x0 is a fraction of the wrap span so workers stay spread out at any width
  { z: 0.15, x0: 0.12, v: 18, helmet: true, vest: true },
  { z: 0.45, x0: 0.62, v: -14, helmet: false, vest: true },
  { z: 0.7, x0: 0.36, v: 11, helmet: true, vest: false },
  { z: 0.95, x0: 0.86, v: -20, helmet: true, vest: true },
];

export default function SafetyCam() {
  const ref = useCanvasLoop((ctx, t, w, h, c) => {
    const horizon = h * 0.38;
    // sky / wall
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, rgba(c.surface, 1));
    g.addColorStop(1, rgba(c.bg, 1));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // scaffolding silhouettes
    ctx.strokeStyle = rgba(c.muted, 0.18);
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const sx = w * (0.08 + i * 0.07);
      ctx.strokeRect(sx, horizon - 70, w * 0.07, 70);
      ctx.beginPath(); ctx.moveTo(sx, horizon - 70); ctx.lineTo(sx + w * 0.07, horizon); ctx.stroke();
    }
    ctx.strokeRect(w * 0.7, horizon - 95, w * 0.18, 95);
    for (let k = 1; k < 4; k++) {
      ctx.beginPath(); ctx.moveTo(w * 0.7, horizon - 95 + k * 24); ctx.lineTo(w * 0.88, horizon - 95 + k * 24); ctx.stroke();
    }

    // perspective floor grid
    ctx.strokeStyle = rgba(c.ice, 0.08);
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(w / 2 + i * 14, horizon); ctx.lineTo(w / 2 + i * w * 0.18, h); ctx.stroke();
    }
    for (let j = 1; j < 9; j++) {
      const y = horizon + (h - horizon) * Math.pow(j / 9, 1.8);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    let ok = 0;
    for (const wk of workers) {
      const s = (0.8 + wk.z * 1.1) * Math.min(1.2, Math.max(0.7, h / 420));
      const span = w + 120;
      const x = ((((wk.x0 * span + wk.v * t) % span) + span) % span) - 60;
      const base = horizon + 18 + wk.z * (h - horizon - 40);
      const bodyH = 46 * s, headR = 7 * s, bw = 18 * s;
      const top = base - bodyH - headR * 2 - 18 * s;
      const step = Math.sin(t * 6 + wk.x0 * 40) * 5 * s;

      // legs
      ctx.strokeStyle = rgba(c.fg, 0.55); ctx.lineWidth = 3.2 * s; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x - 3 * s, base - 18 * s); ctx.lineTo(x - 3 * s + step, base); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 3 * s, base - 18 * s); ctx.lineTo(x + 3 * s - step, base); ctx.stroke();
      // torso
      ctx.fillStyle = wk.vest ? "rgb(249,115,22)" : rgba(c.fg, 0.45);
      ctx.fillRect(x - bw / 2, base - 18 * s - bodyH * 0.62, bw, bodyH * 0.62);
      if (wk.vest) {
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fillRect(x - bw / 2, base - 18 * s - bodyH * 0.32, bw, 2.2 * s);
      }
      // head
      const hy = base - 18 * s - bodyH * 0.62 - headR - 2 * s;
      ctx.fillStyle = rgba(c.fg, 0.6);
      ctx.beginPath(); ctx.arc(x, hy, headR, 0, Math.PI * 2); ctx.fill();
      if (wk.helmet) {
        ctx.fillStyle = "rgb(250,204,21)";
        ctx.beginPath(); ctx.arc(x, hy - 1 * s, headR + 1.5 * s, Math.PI, 0); ctx.fill();
        ctx.fillRect(x - headR - 3 * s, hy - 1.5 * s, (headR + 3 * s) * 2, 2 * s);
      }

      const compliant = wk.helmet && wk.vest;
      if (compliant) ok++;
      if (x < 10 || x > w - 10) continue; // only box workers fully in frame
      const col = compliant ? c.leaf : c.danger;
      const bx = x - bw / 2 - 8 * s, by = hy - headR - 8 * s, bwid = bw + 16 * s, bh = base - by + 4;
      ctx.strokeStyle = rgba(col, 0.95); ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by, bwid, bh);
      const conf = (0.88 + 0.08 * Math.sin(t * 1.3 + wk.x0 * 40)).toFixed(2);
      const label = compliant ? `ppe_ok ${conf}` : `${!wk.helmet ? "no_helmet" : "no_vest"} ${conf}`;
      tag(ctx, label, Math.min(Math.max(2, bx - 0.75), w - 96), by, rgba(col, 0.95));
    }

    // HUD
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.fillStyle = rgba(c.fg, 0.8);
    ctx.fillText("CAM_03 · YOLO11 · 31 FPS", 14, 22);
    ctx.fillStyle = rgba(c.danger, Math.sin(t * 4) > 0 ? 1 : 0.25);
    ctx.beginPath(); ctx.arc(w - 50, 18, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = rgba(c.fg, 0.8);
    ctx.fillText("REC", w - 40, 22);
    ctx.fillStyle = rgba(c.muted, 1);
    ctx.fillText(`compliant ${ok}/${workers.length}  ·  alerts ${workers.length - ok}`, 14, h - 14);
  });

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-label="Animated illustration of a CCTV feed detecting PPE compliance on workers" role="img" />;
}
