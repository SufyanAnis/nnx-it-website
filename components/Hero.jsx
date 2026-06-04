"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["quality", "testing", "delivery", "data", "trust"];

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const dur = 1400;
        let start;
        const tick = (t) => {
          if (start === undefined) start = t;
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <b ref={ref}>
      {val}
      {suffix}
    </b>
  );
}

export default function Hero() {
  const [text, setText] = useState("");

  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = WORDS[wordIdx];
      if (!deleting) {
        charIdx++;
        setText(word.slice(0, charIdx));
        if (charIdx === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
      } else {
        charIdx--;
        setText(word.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % WORDS.length;
        }
      }
      timer = setTimeout(tick, deleting ? 55 : 110);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner reveal in">
        <div className="badge">
          <span className="pulse" /> Est. 2020 · 100% Black woman-owned
        </div>
        <h1 className="hero-title">
          <span className="line">
            Leading <span className="grad">Software Testing</span>
          </span>
          <span className="line">&amp; IT Solutions for the</span>
          <span className="line">
            future of <span className="type">{text}</span>
            <span className="caret" />
          </span>
        </h1>
        <p className="hero-sub">
          We engineer quality. From QA automation to business analysis, project
          management and data analytics — NNX IT helps individuals, businesses
          and government build with confidence, while empowering women in tech.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary" data-magnetic>
            <span>Start a project</span>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#services" className="btn btn-ghost" data-magnetic>
            Explore services
          </a>
        </div>

        <div className="stats">
          <div className="stat">
            <Counter target={10} suffix="+" />
            <span>yrs QA expertise</span>
          </div>
          <div className="stat">
            <Counter target={4} />
            <span>core services</span>
          </div>
          <div className="stat">
            <Counter target={24} />
            <span>/7 support</span>
          </div>
          <div className="stat">
            <Counter target={100} suffix="%" />
            <span>client-first</span>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-hint">
        Scroll <span />
      </a>
    </section>
  );
}
