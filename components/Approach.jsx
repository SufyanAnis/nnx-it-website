"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";

const STEPS = [
  {
    number: "01",
    category: "Discover",
    name: "Free Consultation",
    description:
      "We listen first. Tell us your challenge and we map the fastest route to value — no cost, no pressure, just a clear picture of what's possible.",
    points: ["Scope & goals", "Risk review", "No-cost", "Clear next steps"],
  },
  {
    number: "02",
    category: "Plan",
    name: "Strategy & Analysis",
    description:
      "We analyse your processes and define a tailored plan with clear deliverables, timelines and quality gates so everyone knows exactly what success looks like.",
    points: ["Business analysis", "Test strategy", "Roadmap", "Quality gates"],
  },
  {
    number: "03",
    category: "Execute",
    name: "Build & Test",
    description:
      "Our QA-first team executes, validates and hardens — catching issues long before your users ever could, across manual and automated testing.",
    points: ["Manual + automated", "Regression", "Defect tracking", "UAT"],
  },
  {
    number: "04",
    category: "Sustain",
    name: "Launch & 24/7 Support",
    description:
      "We don't disappear at handover. Round-the-clock support and ongoing mentoring keep you running, improving and confident long after go-live.",
    points: ["Go-live support", "Monitoring", "Mentoring", "Continuous improvement"],
  },
];

function StepCard({ step, index, total }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky h-[78vh] sm:h-[80vh] w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto flex h-full w-full flex-col justify-between gap-6 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 md:p-14"
      >
        {/* Top: number + meta */}
        <div className="flex flex-row items-start gap-4 sm:gap-8 md:gap-12">
          <div
            className="shrink-0 font-black text-[#D7E2EA] leading-none"
            style={{ fontSize: "clamp(2.5rem, 10vw, 140px)" }}
          >
            {step.number}
          </div>
          <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0">
            <span
              className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
              style={{ fontSize: "clamp(0.65rem, 1.2vw, 1rem)" }}
            >
              {step.category}
            </span>
            <h3
              className="font-medium uppercase text-[#D7E2EA] leading-tight"
              style={{ fontSize: "clamp(1.4rem, 4vw, 3.2rem)" }}
            >
              {step.name}
            </h3>
          </div>
        </div>

        {/* Middle: description */}
        <p
          className="font-light leading-relaxed text-[#D7E2EA]/70 max-w-3xl"
          style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}
        >
          {step.description}
        </p>

        {/* Bottom: point chips */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {step.points.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[#D7E2EA]/20 px-4 py-1.5 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/70"
            >
              {p}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

export default function Approach() {
  return (
    <section
      id="approach"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Approach
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {STEPS.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} total={STEPS.length} />
        ))}
      </div>
    </section>
  );
}
