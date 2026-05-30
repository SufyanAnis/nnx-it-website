import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Interactions from "@/components/Interactions";

const SERVICES = [
  {
    num: "01",
    title: "Software Testing",
    copy: "Quality assurance, bug identification and functionality validation — manual and automated — so you ship with zero surprises.",
    link: "Get tested →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m9 12 2 2 4-4" />
        <path d="M12 3 4 7v5c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Project Management",
    copy: "Planning, executing, monitoring and closing projects with precision — keeping scope, time and budget perfectly aligned.",
    link: "Plan with us →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 4v5M8 14h8M8 17h5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Business Analysis",
    copy: "Process improvement and organizational effectiveness — we translate goals into clear, measurable, achievable solutions.",
    link: "Analyze →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 3v18h18" />
        <path d="m7 14 3-4 4 3 5-7" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Data Management & Analytics",
    copy: "Organization, storage, security and analysis — turning raw data into decisions you can trust and act on instantly.",
    link: "Unlock data →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: "01",
    title: "Free Consultation",
    copy: "We listen first. Tell us your challenge and we'll map the fastest route to value — no cost, no pressure.",
  },
  {
    n: "02",
    title: "Strategy & Analysis",
    copy: "We analyze your processes and define a tailored plan with clear deliverables, timelines and quality gates.",
  },
  {
    n: "03",
    title: "Build & Test",
    copy: "Our QA-first team executes, validates and hardens — catching issues long before your users ever could.",
  },
  {
    n: "04",
    title: "Support 24/7",
    copy: "We don't disappear at handover. Round-the-clock support keeps you running and continuously improving.",
  },
];

const MARQUEE = [
  "Quality Assurance",
  "Test Automation",
  "Business Analysis",
  "Project Management",
  "Data Analytics",
  "Empowering Women in Tech",
];

export default function Home() {
  return (
    <>
      <Background />
      <Nav />

      <main>
        <Hero />

        {/* Marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i}>
                {m}
                <span aria-hidden> • </span>
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <section className="about section" id="about">
          <Reveal className="section-head">
            <span className="eyebrow">01 — Who we are</span>
            <h2>
              Born from a mission to make tech{" "}
              <span className="grad">excellent &amp; inclusive</span>
            </h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              <p>
                Founded in 2020 by <strong>Veronica Mboweni</strong> — a software
                engineer with over a decade of QA experience — NNX IT Consulting
                and Training is a wholly Black woman-owned company based in
                Waterfall, Midrand.
              </p>
              <p>
                We deliver brilliant training courses, free consultations and
                round-the-clock support. Beyond the code, we're committed to
                addressing South Africa's unemployment through real business
                development and skills empowerment.
              </p>
              <div className="chips">
                <span>Women-led</span>
                <span>QA-first</span>
                <span>Midrand, SA</span>
                <span>Training &amp; mentoring</span>
              </div>
            </Reveal>
            <Reveal className="about-card glass" data-tilt>
              <div className="founder">
                <div className="founder-avatar">VM</div>
                <div>
                  <b>Veronica Mboweni</b>
                  <span>Founder &amp; Lead Engineer</span>
                </div>
              </div>
              <p className="quote">
                "Quality isn't a phase — it's a culture. We build it into every
                line, every process, every person we train."
              </p>
              <div className="mini-stats">
                <div>
                  <b>10+</b>
                  <span>Years in QA</span>
                </div>
                <div>
                  <b>2020</b>
                  <span>Founded</span>
                </div>
                <div>
                  <b>1</b>
                  <span>Bold vision</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section className="services section" id="services">
          <Reveal className="section-head">
            <span className="eyebrow">02 — What we do</span>
            <h2>
              Services engineered for <span className="grad">reliability</span>
            </h2>
          </Reveal>
          <div className="service-grid">
            {SERVICES.map((s) => (
              <Reveal as="article" className="service glass" data-tilt key={s.num}>
                <div className="service-num">{s.num}</div>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <a href="#contact" className="service-link">
                  {s.link}
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="process section" id="process">
          <Reveal className="section-head">
            <span className="eyebrow">03 — How we work</span>
            <h2>
              A clear path from <span className="grad">idea to impact</span>
            </h2>
          </Reveal>
          <div className="timeline">
            {STEPS.map((s) => (
              <Reveal className="step" key={s.n}>
                <div className="step-dot">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="section testimonial-section">
          <Reveal className="testimonial glass" data-tilt>
            <svg className="quote-mark" viewBox="0 0 24 24">
              <path
                d="M7 7h4v4c0 3-1 4-4 5l-1-2c1.5-.5 2-1 2-2H7V7Zm8 0h4v4c0 3-1 4-4 5l-1-2c1.5-.5 2-1 2-2h-1V7Z"
                fill="currentColor"
              />
            </svg>
            <p>
              "Very professional and helpful — flexible, responsive, and the
              resources are extremely well-trained. NNX IT delivered exactly what
              we needed."
            </p>
            <div className="testimonial-by">— Valued NNX IT Client</div>
          </Reveal>
        </section>

        {/* Contact */}
        <section className="contact section" id="contact">
          <div className="contact-grid">
            <Reveal className="contact-copy">
              <span className="eyebrow">04 — Let's build</span>
              <h2>
                Ready to ship <span className="grad">quality</span>?
              </h2>
              <p>
                Book a free consultation today. We'll get back to you within one
                business day.
              </p>
              <ul className="contact-list">
                <li>
                  <span className="ci">✉</span>
                  <a href="mailto:info@nnxit.co.za">info@nnxit.co.za</a>
                </li>
                <li>
                  <span className="ci">☎</span>
                  <a href="tel:+27731618176">+27 73 161 8176</a>
                </li>
                <li>
                  <span className="ci">◎</span>
                  <span>Waterfall, Midrand, South Africa</span>
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-mark">
              N<span className="brand-x">X</span>
            </span>
            <p>
              NNX IT Consulting and Training — empowering women in tech &amp;
              engineering quality across South Africa.
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <b>Company</b>
              <a href="#about">About</a>
              <a href="#process">How we work</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <b>Services</b>
              <a href="#services">Software Testing</a>
              <a href="#services">Business Analysis</a>
              <a href="#services">Data Analytics</a>
            </div>
            <div>
              <b>Reach us</b>
              <a href="mailto:info@nnxit.co.za">info@nnxit.co.za</a>
              <a href="tel:+27731618176">+27 73 161 8176</a>
              <span>Waterfall, Midrand</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 NNX IT Consulting and Training. All rights reserved.
          </span>
          <span>Designed for the future ⚡</span>
        </div>
      </footer>

      <Interactions />
    </>
  );
}
