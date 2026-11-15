import { useRef } from "react";
import { useCanvasLoop, rgba, roundRect, localPoint } from "@/lib/canvas";

const T = 9; // loop seconds
const sig = (x: number) => 1 / (1 + Math.exp(-x));

export default function Trajectory() {
  const offset = useRef(0); // time shift applied by scrubbing
  const tNow = useRef(0);
  const dragging = useRef(false);

  const { ref, redraw } = useCanvasLoop((ctx, t0, w, h, c) => {
    tNow.current = t0;
    const t = t0 + offset.current;
    const laneH = Math.min(h * 0.22, 80, (h - 112) / 3);
    const top = Math.max((h - laneH * 3) / 2 + 6, 74);
    const laneY = (l: number) => top + laneH * (l + 0.5);
    // path: s in [0,1] → x across width, lane change from lane 1 to lane 0 around s=0.55
    const px = (s: number) => w * (0.04 + s * 0.92);
    const py = (s: number) => laneY(1) - laneH * sig((s - 0.55) * 18);

    const sNow = 0.12 + ((((t % T) + T) % T) / T) * 0.62;
    const hist = 0.14, horizon = 0.24;

    // road
    ctx.fillStyle = rgba(c.surface, 1);
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = rgba(c.fg, 0.35);
    ctx.lineWidth = 1.5;
    [top, top + laneH * 3].forEach((y) => { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); });
    ctx.strokeStyle = rgba(c.fg, 0.16);
    ctx.setLineDash([18, 16]);
    for (let l = 1; l < 3; l++) { ctx.beginPath(); ctx.moveTo(0, top + laneH * l); ctx.lineTo(w, top + laneH * l); ctx.stroke(); }
    ctx.setLineDash([]);

    // neighbours (context the pooling attends to)
    const nb = [
      { s: (sNow + 0.3) % 1, l: 1 },
      { s: (sNow + 0.55) % 1, l: 2 },
      { s: (sNow - 0.08 + 1) % 1, l: 2 },
    ];
    for (const n of nb) {
      const x = px(n.s), y = laneY(n.l);
      roundRect(ctx, x - 17, y - laneH * 0.22, 34, laneH * 0.44, 5);
      ctx.strokeStyle = rgba(c.muted, 0.8); ctx.lineWidth = 1.2; ctx.stroke();
      ctx.strokeStyle = rgba(c.ice, 0.18); ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(px(sNow), py(sNow)); ctx.lineTo(x, y); ctx.stroke();
      ctx.setLineDash([]);
    }

    // uncertainty cone around predicted future
    ctx.beginPath();
    const N = 30;
    for (let i = 0; i <= N; i++) {
      const s = sNow + (i / N) * horizon;
      const spread = 2 + (i / N) * laneH * 0.45;
      if (i) ctx.lineTo(px(s), py(s) - spread); else ctx.moveTo(px(s), py(s) - spread);
    }
    for (let i = N; i >= 0; i--) {
      const s = sNow + (i / N) * horizon;
      const spread = 2 + (i / N) * laneH * 0.45;
      ctx.lineTo(px(s), py(s) + spread);
    }
    ctx.closePath();
    ctx.fillStyle = rgba(c.ice, 0.12);
    ctx.fill();

    // predicted path
    ctx.strokeStyle = rgba(c.ice, 1);
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const s = sNow + (i / N) * horizon;
      if (i) ctx.lineTo(px(s), py(s)); else ctx.moveTo(px(s), py(s));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // observed history dots (3 s)
    for (let i = 0; i <= 12; i++) {
      const s = sNow - hist + (i / 12) * hist;
      if (s < 0) continue;
      ctx.fillStyle = rgba(c.marigold, 0.25 + (i / 12) * 0.75);
      ctx.beginPath(); ctx.arc(px(s), py(s), 2.6, 0, Math.PI * 2); ctx.fill();
    }

    // ego vehicle
    const ex = px(sNow), ey = py(sNow);
    const ang = Math.atan2(py(sNow + 0.005) - ey, px(sNow + 0.005) - ex);
    ctx.save();
    ctx.translate(ex, ey); ctx.rotate(ang);
    roundRect(ctx, -19, -laneH * 0.22, 38, laneH * 0.44, 6);
    ctx.fillStyle = rgba(c.marigold, 1); ctx.fill();
    ctx.restore();

    // manoeuvre probabilities
    const pL = 0.04 + 0.9 * sig((sNow - 0.38) * 26) * (1 - sig((sNow - 0.66) * 30));
    const pK = 1 - pL - 0.03;
    const rows: [string, number, string][] = [
      ["lane-change ←", pL, c.ice],
      ["keep lane", pK, c.muted],
      ["lane-change →", 0.03, c.muted],
    ];
    ctx.font = '500 10.5px "JetBrains Mono", monospace';
    const bx = w - 176, by = 14;
    rows.forEach(([name, p, col], i) => {
      const y = by + i * 17;
      ctx.fillStyle = rgba(c.fg, 0.75);
      ctx.fillText(name, bx, y + 9);
      ctx.fillStyle = rgba(c.fg, 0.08);
      ctx.fillRect(bx + 96, y + 2, 60, 8);
      ctx.fillStyle = rgba(col, 0.95);
      ctx.fillRect(bx + 96, y + 2, 60 * p, 8);
    });

    ctx.fillStyle = rgba(c.fg, 0.8);
    ctx.fillText("LSTM enc–dec · NGSIM", 14, 22);
    ctx.fillStyle = rgba(c.marigold, 1);
    ctx.fillText("● 3 s observed", 14, h - 14);
    ctx.fillStyle = rgba(c.ice, 1);
    ctx.fillText("- - 5 s predicted", 128, h - 14);
  });

  const scrubTo = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = localPoint(e);
    // map pointer x onto the car's position along the road (s = 0.12…0.74)
    const s = (p.x / p.w - 0.04) / 0.92;
    const f = Math.min(1, Math.max(0, (s - 0.12) / 0.62));
    offset.current = f * T - tNow.current;
    redraw();
  };

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y"
      role="img"
      aria-label="Interactive trajectory forecast: drag sideways to scrub the car through time and watch the predicted manoeuvre change"
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); scrubTo(e); }}
      onPointerMove={(e) => { if (dragging.current) scrubTo(e); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    />
  );
}
