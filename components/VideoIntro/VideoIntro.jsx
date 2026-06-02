"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export default function VideoIntro({ videoSrc = "/intro.mp4" }) {
  const rootRef = useRef(null);
  const mainVideoRef = useRef(null);
  const ambientVideoRef = useRef(null);

  const [hasVideo, setHasVideo] = useState(true);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Auto-hide "Tap for sound" after 5s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(`.${styles.topbar}`, { y: -24, opacity: 0, duration: 0.8 })
        .from(`.${styles.tagline}`, { y: 18, opacity: 0, duration: 0.7 }, 0.2)
        .from(
          `.${styles.nameInner}`,
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 },
          0.35
        )
        .from(`.${styles.subtitle}`, { y: 18, opacity: 0, duration: 0.7 }, 0.8)
        .from(`.${styles.subtitleSub}`, { y: 14, opacity: 0, duration: 0.7 }, 0.95)
        .from(
          `.${styles.bottombar}`,
          { y: 24, opacity: 0, duration: 0.8 },
          1.0
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Auto-mute when scrolled past the hero
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && mainVideoRef.current && !mainVideoRef.current.muted) {
          mainVideoRef.current.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0, rootMargin: "-50% 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleMute = () => {
    const v = mainVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowHint(false);
  };

  const togglePlay = () => {
    const main = mainVideoRef.current;
    const amb = ambientVideoRef.current;
    if (!main) return;
    if (main.paused) {
      main.play();
      amb && amb.play();
      setPlaying(true);
    } else {
      main.pause();
      amb && amb.pause();
      setPlaying(false);
    }
  };

  const scrollNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={rootRef} className={styles.hero}>
      {/* Fallback cinematic gradient (always present, visible if no video) */}
      <div className={styles.fallback} />

      {hasVideo && (
        <>
          {/* Ambient blurred duplicate */}
          <video
            ref={ambientVideoRef}
            className={styles.videoAmbient}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Main foreground video */}
          <video
            ref={mainVideoRef}
            className={styles.videoMain}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setHasVideo(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </>
      )}

      {/* Three.js cinematic particle / bokeh layer */}
      <CinematicLayer className={styles.canvasLayer} />

      {/* Cinematic overlays */}
      <div className={styles.overlayH} />
      <div className={styles.overlayV} />
      <div className={styles.glow} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.topbar}>
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="mailto:info@nnxit.co.za" className={styles.glassPill}>
            Email us
          </a>
        </div>

        <div className={styles.center}>
          <div className={styles.centerInner}>
            <p className={styles.tagline}>NNX IT · Est. 2020 · Midrand, SA</p>
            <h1 className={styles.name}>
              <span className={styles.nameLine}>
                <span className={styles.nameInner} style={{ display: "block" }}>
                  NNX
                </span>
              </span>
              <span className={styles.nameLine}>
                <span className={styles.nameInner} style={{ display: "block" }}>
                  IT
                </span>
              </span>
            </h1>
            <p className={styles.subtitle}>
              Software Testing · QA · Business Analysis · Data Analytics
            </p>
            <p className={styles.subtitleSub}>Empowering women in tech</p>
          </div>
        </div>

        <div className={styles.bottombar}>
          <button className={styles.scrollBtn} onClick={scrollNext} aria-label="Scroll to next section">
            <span className={styles.scrollLabel}>Scroll</span>
            <span className={styles.scrollTrack}>
              <span className={styles.scrollDot} />
            </span>
          </button>

          <div className={styles.controls}>
            {showHint && <span className={styles.hint}>Tap for sound</span>}

            <button
              className={styles.glassBtn}
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              className={styles.glassBtn}
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
