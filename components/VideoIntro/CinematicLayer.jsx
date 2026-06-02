"use client";

import { memo, useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic floating particle / bokeh layer.
 * - Warm orange + white glowing particles, additive blending
 * - Soft dreamy sprites, slow sine-wave oscillation
 * - Mouse parallax camera, GPU-friendly, fully disposed on unmount
 * - Pauses rendering when off-screen / tab hidden
 */
function CinematicLayer({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // ---- Renderer ----
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // ---- Scene & camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 26;

    // ---- Soft circular sprite texture (radial gradient bokeh) ----
    const makeSprite = () => {
      const size = 128;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,245,235,0.85)");
      g.addColorStop(0.55, "rgba(255,180,120,0.35)");
      g.addColorStop(1, "rgba(255,150,80,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };
    const sprite = makeSprite();

    // ---- Particles ----
    const COUNT = isMobile ? 90 : 220;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const amps = new Float32Array(COUNT);

    const warm = new THREE.Color(0xff8a3d); // warm orange
    const white = new THREE.Color(0xffffff);
    const blue = new THREE.Color(0x6fa8ff); // soft monitor blue glow

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 36;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Mostly warm/white, a few cool blue accents
      const r = Math.random();
      const col =
        r < 0.6 ? warm.clone() : r < 0.9 ? white.clone() : blue.clone();
      col.lerp(white, Math.random() * 0.35);
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 2.4 + 0.6;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = Math.random() * 0.4 + 0.15;
      amps[i] = Math.random() * 1.6 + 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Size-aware shader so each bokeh can differ in scale
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: sprite },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * 90.0 * uPixelRatio / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor, 1.0) * tex;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const basePos = positions.slice();

    // ---- Mouse parallax ----
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMouse = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ---- Resize ----
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", onResize);

    // ---- Visibility / on-screen gating ----
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf == null) loop();
      },
      { threshold: 0 }
    );
    io.observe(mount);
    const onVis = () => {
      if (document.hidden) {
        visible = false;
      } else {
        visible = true;
        if (raf == null) loop();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // ---- Animation loop ----
    const clock = new THREE.Clock();
    let raf = null;
    const posAttr = geometry.getAttribute("position");

    const render = () => {
      const t = clock.getElapsedTime();

      if (!prefersReduced) {
        const arr = posAttr.array;
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const ph = phases[i];
          const sp = speeds[i];
          const am = amps[i];
          arr[i3] = basePos[i3] + Math.sin(t * sp + ph) * am;
          arr[i3 + 1] = basePos[i3 + 1] + Math.cos(t * sp * 0.8 + ph) * am;
          arr[i3 + 2] = basePos[i3 + 2] + Math.sin(t * sp * 0.5 + ph) * am * 0.6;
        }
        posAttr.needsUpdate = true;
        points.rotation.z = Math.sin(t * 0.04) * 0.06;
      }

      // Smooth mouse parallax
      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;
      camera.position.x = cur.x * 3;
      camera.position.y = -cur.y * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!visible) {
        raf = null;
        return;
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    loop();

    // ---- Cleanup ----
    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}

export default memo(CinematicLayer);
