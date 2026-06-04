"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    let particles = [];
    let raf;
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.min(
        90,
        Math.floor((window.innerWidth * window.innerHeight) / 16000)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * dpr,
        vy: (Math.random() - 0.5) * 0.4 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
      }));
    };

    const link = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.x * dpr;
      const my = mouse.y * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // subtle mouse repulsion
        const dxm = p.x - mx;
        const dym = p.y - my;
        const dm = Math.hypot(dxm, dym);
        if (dm < 120 * dpr && dm > 0) {
          p.x += (dxm / dm) * 0.8;
          p.y += (dym / dm) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(91, 140, 255, 0.75)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < link * dpr) {
            const a = (1 - dist / (link * dpr)) * 0.35;
            ctx.strokeStyle = `rgba(129, 122, 255, ${a})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    if (!prefersReduced) {
      draw();
      window.addEventListener("mousemove", onMove);
    } else {
      draw();
      cancelAnimationFrame(raf);
    }
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // ---- Custom cursor + scroll progress ----
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    let rx = 0,
      ry = 0,
      tx = 0,
      ty = 0,
      raf;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e) => {
      if (e.target.closest("a, button, [data-tilt], input, textarea, select"))
        ring.classList.add("hover");
    };
    const out = (e) => {
      if (e.target.closest("a, button, [data-tilt], input, textarea, select"))
        ring.classList.remove("hover");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  useEffect(() => {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const onScroll = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (dh > 0 ? (st / dh) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef} />
      <div className="grid-overlay" />
      <div className="noise" />
      <div className="cursor-dot" id="cursorDot" />
      <div className="cursor-ring" id="cursorRing" />
      <div className="scroll-progress" id="scrollProgress" />
    </>
  );
}
