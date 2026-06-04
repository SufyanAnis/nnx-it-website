"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";

const ABOUT_TEXT =
  "Founded in 2020 by Veronica Mboweni — a software engineer with over a decade of QA experience — NNX IT Consulting and Training is a wholly Black woman-owned company based in Waterfall, Midrand. We engineer quality into every product and process, delivering brilliant training, free consultations and round-the-clock support. Beyond the code, we're committed to building skills and creating opportunity across South Africa. Let's build something dependable together.";

const CAPABILITY_GROUPS = [
  { label: "Testing & QA", items: ["Manual Testing", "Test Automation", "Regression", "Functional", "UAT"] },
  { label: "Delivery", items: ["Project Management", "Business Analysis", "Process Improvement"] },
  { label: "Data", items: ["Data Management", "Analytics", "Reporting", "Dashboards"] },
  { label: "Enablement", items: ["Training", "Mentoring", "Free Consults", "24/7 Support"] },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Soft decorative orbs in the corners (warm/magenta to match accent) */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-[#BE4C00]/20 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#B600A8]/15 blur-[100px]" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About us
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed text-[#D7E2EA] max-w-[640px]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />

          {/* Capabilities */}
          <FadeIn delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {CAPABILITY_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                >
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:w-44 sm:shrink-0 sm:text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-3 py-1 text-sm text-[#D7E2EA]/80 hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
