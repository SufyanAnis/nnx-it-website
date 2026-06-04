"use client";

import { useEffect } from "react";

/** Wires up magnetic buttons + 3D tilt cards across the page. */
export default function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Magnetic buttons
    const magnets = Array.from(document.querySelectorAll("[data-magnetic]"));
    const magnetHandlers = magnets.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      };
      const reset = () => (el.style.transform = "");
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return { el, move, reset };
    });

    // 3D tilt cards
    const tilts = Array.from(document.querySelectorAll("[data-tilt]"));
    const tiltHandlers = tilts.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${
          -py * 6
        }deg) translateY(-4px)`;
      };
      const reset = () => (el.style.transform = "");
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return { el, move, reset };
    });

    return () => {
      magnetHandlers.forEach(({ el, move, reset }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      });
      tiltHandlers.forEach(({ el, move, reset }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      });
    };
  }, []);

  return null;
}
