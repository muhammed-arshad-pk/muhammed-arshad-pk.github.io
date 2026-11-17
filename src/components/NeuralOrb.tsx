import { useEffect, useRef } from "react";

type V3 = [number, number, number];

const N = 90; // nodes
const LINK_DIST = 0.62; // max 3D distance (unit sphere) for an edge
const PULSES = 14;

function readRGB(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? v.split(/\s+/).join(",") : fallback;
}

/**
 * A rotating 3D "brain" of neurons: points on a sphere, edges between neighbours,
 * and signal pulses travelling along the edges. Drag / move the pointer to tilt it.
 */
export default function NeuralOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci sphere with a little jitter so it looks organic
    const nodes: V3[] = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * Math.PI * (3 - Math.sqrt(5));
      const j = 0.88 + Math.random() * 0.12;
      return [Math.cos(t) * r * j, y * j, Math.sin(t) * r * j];
    });
    const edges: [number, number][] = [];
    for (let a = 0; a < N; a++)
      for (let b = a + 1; b < N; b++) {
        const [x, y, z] = nodes[a];
        const [p, q, s] = nodes[b];
        if (Math.hypot(x - p, y - q, z - s) < LINK_DIST) edges.push([a, b]);
      }
    const pulses = Array.from({ length: PULSES }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      v: 0.006 + Math.random() * 0.01,
      gold: Math.random() < 0.35,
    }));
    const firing = new Float32Array(N); // glow per node, decays

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rotY = 0, rotX = -0.25;
    let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
      targetX = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
    };
    const onLeave = () => { targetX = targetY = 0; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(canvas);

    let ice = readRGB("--ice", "138,180,255");
    let gold = readRGB("--marigold", "245,165,36");
    let fg = readRGB("--fg", "238,242,248");
    const mo = new MutationObserver(() => {
      ice = readRGB("--ice", ice); gold = readRGB("--marigold", gold); fg = readRGB("--fg", fg);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });

    const proj = new Array<[number, number, number]>(N);
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || !w) return;

      if (!reduce) rotY += 0.0028;
      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;
      const ay = rotY + tiltY, ax = rotX + tiltX;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const R = Math.min(w, h) * 0.36;
      const ox = w / 2, oy = h * 0.48;

      for (let i = 0; i < N; i++) {
        const [x, y, z] = nodes[i];
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        const p = 2.6 / (2.6 + z2); // perspective
        proj[i] = [ox + x1 * R * p, oy + y2 * R * p, z2];
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // soft core glow
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R * 1.3);
      g.addColorStop(0, `rgba(${ice},0.16)`);
      g.addColorStop(1, `rgba(${ice},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // edges (fade toward the back)
      ctx.lineWidth = 0.8;
      for (const [a, b] of edges) {
        const depth = (2 - (proj[a][2] + proj[b][2])) / 4; // 0 back .. 1 front
        ctx.strokeStyle = `rgba(${fg},${0.03 + depth * 0.14})`;
        ctx.beginPath();
        ctx.moveTo(proj[a][0], proj[a][1]);
        ctx.lineTo(proj[b][0], proj[b][1]);
        ctx.stroke();
      }

      // pulses travelling along edges
      for (const p of pulses) {
        if (!reduce) p.t += p.v;
        if (p.t >= 1) {
          const end = edges[p.e][1];
          firing[end] = 1;
          // hop to a connected edge so signals propagate through the net
          const next = edges.map((e, i) => (e[0] === end ? i : -1)).filter((i) => i >= 0);
          p.e = next.length ? next[Math.floor(Math.random() * next.length)] : Math.floor(Math.random() * edges.length);
          p.t = 0;
        }
        const [a, b] = edges[p.e];
        const x = proj[a][0] + (proj[b][0] - proj[a][0]) * p.t;
        const y = proj[a][1] + (proj[b][1] - proj[a][1]) * p.t;
        const c = p.gold ? gold : ice;
        ctx.strokeStyle = `rgba(${c},0.9)`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        const tt = Math.max(0, p.t - 0.25);
        ctx.moveTo(proj[a][0] + (proj[b][0] - proj[a][0]) * tt, proj[a][1] + (proj[b][1] - proj[a][1]) * tt);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${c},1)`;
        ctx.shadowColor = `rgba(${c},1)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // nodes, back to front
      const order = [...proj.keys()].sort((i, j) => proj[j][2] - proj[i][2]);
      for (const i of order) {
        const [x, y, z] = proj[i];
        const depth = (1 - z) / 2;
        const f = firing[i];
        firing[i] *= 0.95;
        const r = 1.2 + depth * 2.2 + f * 3;
        if (f > 0.05) {
          ctx.fillStyle = `rgba(${gold},${f * 0.35})`;
          ctx.beginPath();
          ctx.arc(x, y, r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = f > 0.05 ? `rgba(${gold},${0.5 + f * 0.5})` : `rgba(${ice},${0.25 + depth * 0.7})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-ice/[0.06] via-transparent to-marigold/[0.05]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-pan-y"
        role="img"
        aria-label="Animated 3D neural network with signals firing between neurons"
      />
      <div className="pointer-events-none absolute inset-x-5 top-5 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>neural.net</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-marigold" /> live
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-5 bottom-5 flex justify-between font-mono text-[11px] text-muted">
        <span>{N} neurons</span>
        <span>perception → decision</span>
      </div>
    </div>
  );
}
