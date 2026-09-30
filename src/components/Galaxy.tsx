"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
  A star field that sits behind the hero. Three depth layers slide against
  the pointer, so the plate feels deep, and a warp() call from the button
  stretches every star into a streak for a second and a half. Static when the
  reader prefers reduced motion.
*/
export const WARP_EVENT = "boobesh:warp";

type Star = { x: number; y: number; z: number; tw: number; hue: number };

export default function Galaxy() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let warp = 0;
    let warpUntil = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const stars: Star[] = Array.from({ length: 240 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.15 + Math.random() * 0.85,
      tw: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.18 ? 28 : Math.random() < 0.3 ? 215 : 40,
    }));

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      warp = t < warpUntil ? Math.min(1, warp + 0.08) : Math.max(0, warp - 0.05);

      const cx = w / 2;
      const cy = h / 2;
      for (const s of stars) {
        // slow upward drift, faster for the near layer
        s.y -= 0.00006 * s.z * (1 + warp * 30);
        if (s.y < -0.05) s.y = 1.05;

        const px = s.x * w - mouse.x * 46 * s.z;
        const py = s.y * h - mouse.y * 30 * s.z;
        const twinkle = 0.55 + 0.45 * Math.sin(t / 700 + s.tw);
        const alpha = (0.25 + 0.7 * s.z) * twinkle;
        ctx.strokeStyle = ctx.fillStyle = `hsla(${s.hue} 80% 88% / ${alpha})`;

        if (warp > 0.02) {
          const k = 1 + warp * s.z * 0.9;
          ctx.lineWidth = 0.6 + s.z * 1.2;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(cx + (px - cx) * k, cy + (py - cy) * k);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, 0.5 + s.z * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    const onWarp = () => {
      warpUntil = performance.now() + 1500;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener(WARP_EVENT, onWarp);

    if (reduced) {
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      window.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener(WARP_EVENT, onWarp);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}

export function warp() {
  window.dispatchEvent(new Event(WARP_EVENT));
}
