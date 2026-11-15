import { useRef } from "react";
import { useCanvasLoop, rgba, roundRect } from "@/lib/canvas";

const LANES = 4;
type Car = { x: number; lane: number; laneF: number; vr: number; agent: boolean; id: number; timer: number };

function init(w: number): Car[] {
  const cars: Car[] = [];
  const agentX = [0.18, 0.34, 0.5, 0.64, 0.8];
  agentX.forEach((fx, i) => {
    const lane = [0, 2, 1, 3, 2][i];
    cars.push({ x: fx * w, lane, laneF: lane, vr: 0, agent: true, id: i + 1, timer: 1 + i * 0.7 });
  });
  for (let i = 0; i < 9; i++) {
    const lane = i % LANES;
    cars.push({ x: (i / 9) * w * 1.3 + 40, lane, laneF: lane, vr: -(30 + ((i * 37) % 40)), agent: false, id: 0, timer: 0 });
  }
  return cars;
}

const blocked = (cars: Car[], self: Car, lane: number, gap: number) =>
  cars.some((o) => o !== self && (o.lane === lane || Math.round(o.laneF) === lane) && Math.abs(o.x - self.x) < gap);

export default function Highway() {
  const sim = useRef<{ cars: Car[]; last: number; w: number; dash: number } | null>(null);

  const ref = useCanvasLoop((ctx, t, w, h, c) => {
    if (!sim.current || Math.abs(sim.current.w - w) > 40) sim.current = { cars: init(w), last: t, w, dash: 0 };
    const S = sim.current;
    const dt = Math.min(Math.max(t - S.last, 0), 0.05);
    S.last = t;

    const laneH = Math.min(h * 0.19, 68, (h - 84) / LANES);
    const roadTop = (h - laneH * LANES) / 2 + 8;
    const laneY = (l: number) => roadTop + laneH * (l + 0.5);
    const carW = Math.min(38, w * 0.07), carH = laneH * 0.5;

    // --- simulate ---
    S.dash = (S.dash + dt * 120) % 40;
    for (const car of S.cars) {
      if (car.agent) {
        car.timer -= dt;
        const ahead = S.cars.find((o) => !o.agent && o.lane === car.lane && o.x > car.x && o.x - car.x < carW * 3);
        if ((car.timer <= 0 || ahead) && car.lane === car.laneF) {
          const options = [car.lane - 1, car.lane + 1].filter((l) => l >= 0 && l < LANES && !blocked(S.cars, car, l, carW * 1.8));
          if (options.length) car.lane = options[Math.floor((t * 7 + car.id) % options.length)];
          car.timer = 2.5 + ((car.id * 1.3) % 2);
        }
        car.x += Math.sin(t * 0.5 + car.id) * 4 * dt;
      } else {
        const agentBehind = S.cars.some((o) => o.agent && Math.round(o.laneF) === car.lane && car.x > o.x && car.x - o.x < carW * 1.4);
        car.x += (agentBehind ? 10 : car.vr) * dt;
        if (car.x < -carW * 2) {
          car.x = w + carW * 2 + ((car.vr * 13) % 60);
          const l = Math.abs(Math.floor(t * 3 + car.vr)) % LANES;
          car.lane = l; car.laneF = l;
        }
      }
      const d = car.lane - car.laneF;
      car.laneF += Math.sign(d) * Math.min(Math.abs(d), dt * 1.4);
    }

    // --- draw road ---
    ctx.fillStyle = rgba(c.surface, 1);
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = rgba(c.fg, 0.035);
    ctx.fillRect(0, roadTop, w, laneH * LANES);
    ctx.strokeStyle = rgba(c.fg, 0.35);
    ctx.lineWidth = 1.5;
    [roadTop, roadTop + laneH * LANES].forEach((y) => { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); });
    ctx.strokeStyle = rgba(c.fg, 0.18);
    ctx.setLineDash([20, 20]);
    ctx.lineDashOffset = S.dash;
    for (let l = 1; l < LANES; l++) {
      const y = roadTop + laneH * l;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.setLineDash([]);

    // --- coordination graph (GCN edges) ---
    const agents = S.cars.filter((a) => a.agent);
    ctx.strokeStyle = rgba(c.ice, 0.28);
    ctx.lineWidth = 1;
    for (let i = 0; i < agents.length; i++)
      for (let j = i + 1; j < agents.length; j++) {
        const a = agents[i], b = agents[j];
        if (Math.abs(a.x - b.x) < w * 0.22) {
          ctx.beginPath(); ctx.moveTo(a.x, laneY(a.laneF)); ctx.lineTo(b.x, laneY(b.laneF)); ctx.stroke();
        }
      }

    // --- cars ---
    for (const car of S.cars) {
      const y = laneY(car.laneF);
      const tilt = (car.lane - car.laneF) * 0.25;
      ctx.save();
      ctx.translate(car.x, y);
      ctx.rotate(tilt);
      roundRect(ctx, -carW / 2, -carH / 2, carW, carH, 5);
      if (car.agent) {
        ctx.fillStyle = rgba(c.ice, 0.95);
        ctx.shadowColor = rgba(c.ice, 0.6);
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.font = '600 9px "JetBrains Mono", monospace';
        ctx.fillText(`A${car.id}`, -7, 3);
      } else {
        ctx.strokeStyle = rgba(c.muted, 0.8);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();
      if (car.agent && car.lane !== car.laneF) {
        const dir = Math.sign(car.lane - car.laneF);
        ctx.strokeStyle = rgba(c.marigold, 1);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(car.x + carW / 2 + 4, y);
        ctx.quadraticCurveTo(car.x + carW + 14, y, car.x + carW + 18, y + dir * laneH * 0.6);
        ctx.stroke();
      }
    }

    // --- HUD ---
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.fillStyle = rgba(c.fg, 0.8);
    ctx.fillText("MQLC · CTDE · 5 agents", 14, 22);
    ctx.fillStyle = rgba(c.muted, 1);
    ctx.fillText("reward 120.41  ·  collisions 0", 14, h - 14);
    if (w > 480) {
      ctx.fillStyle = rgba(c.marigold, 1);
      const l2 = "→ lane-change intent";
      ctx.fillText(l2, w - ctx.measureText(l2).width - 14, h - 14);
    }
  });

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" role="img" aria-label="Animated simulation of five cooperating autonomous cars changing lanes" />;
}
