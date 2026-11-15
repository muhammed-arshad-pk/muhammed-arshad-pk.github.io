import { useCanvasLoop, rgba, roundRect } from "@/lib/canvas";

const flow = (t: number) =>
  Math.max(1, Math.min(30, 14 + 7 * Math.sin(t * 0.45) + 2.2 * Math.sin(t * 1.9) + 0.8 * Math.sin(t * 5.3)));

export default function FlowMeter() {
  const ref = useCanvasLoop((ctx, t, w, h, c) => {
    ctx.fillStyle = rgba(c.surface, 1);
    ctx.fillRect(0, 0, w, h);

    const v = flow(t);
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

    // gauge
    const gx = px + pw / 2, gy = py + ph * (narrow ? 0.72 : 0.58), gr = Math.min(pw * 0.36, ph * 0.42);
    const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    ctx.lineCap = "round";
    ctx.lineWidth = 9;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath(); ctx.arc(gx, gy, gr, a0, a1); ctx.stroke();
    const grad = ctx.createLinearGradient(gx - gr, 0, gx + gr, 0);
    grad.addColorStop(0, "rgb(56,189,248)");
    grad.addColorStop(1, "rgb(74,222,128)");
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
    const total = (1284.6 + t * 0.24).toFixed(1);
    ctx.fillText(`total ${total} L`, gx, py + 22);
    ctx.textAlign = "left";

    // --- cloud sparkline ---
    const sx = narrow ? 14 : px + pw + 22;
    const sy = narrow ? py + ph + 18 : py + 18;
    const sw = narrow ? w - 28 : w - sx - 14;
    const sh = narrow ? h - sy - 30 : ph - 40;
    ctx.strokeStyle = rgba(c.fg, 0.07);
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = sy + (sh / 3) * i;
      ctx.beginPath(); ctx.moveTo(sx, y); ctx.lineTo(sx + sw, y); ctx.stroke();
    }
    ctx.beginPath();
    const pts = 80;
    for (let i = 0; i <= pts; i++) {
      const tt = t - (pts - i) * 0.15;
      const x = sx + (i / pts) * sw;
      const y = sy + sh - (flow(tt) / 30) * sh;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.strokeStyle = rgba(c.leaf, 1);
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.lineTo(sx + sw, sy + sh); ctx.lineTo(sx, sy + sh); ctx.closePath();
    ctx.fillStyle = rgba(c.leaf, 0.08);
    ctx.fill();

    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.fillStyle = rgba(c.fg, 0.8);
    ctx.fillText("ESP32 · YF-S201 · TFT", 14, 22);
    const synced = "☁ synced · uptime 24×7";
    ctx.fillStyle = rgba(c.leaf, 1);
    ctx.fillText(synced, w - ctx.measureText(synced).width - 14, 22);
    ctx.fillStyle = rgba(c.muted, 1);
    ctx.fillText("calibrated ±1–2% · 1–30 L/min", sx, h - 12);
  });

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" role="img" aria-label="Animated flow meter showing live litres per minute and a cloud chart" />;
}
