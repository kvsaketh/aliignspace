"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Flowing gradient wave — a full-bleed animated shader plane that morphs slowly
 * through the ALIIGNSPACE logo palette (periwinkle blue → violet → warm amber).
 * Pure three.js (no R3F) so it stays compatible with React 18 / Next 16.
 * Honors prefers-reduced-motion and pauses when scrolled off-screen.
 */
export function GradientWave({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      // logo palette
      uBlue: { value: new THREE.Color("#3b4fea") },
      uViolet: { value: new THREE.Color("#8b5cd8") },
      uAmber: { value: new THREE.Color("#f2a03c") },
      uDark: { value: new THREE.Color("#141122") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uRes;
        uniform vec2 uMouse;
        uniform vec3 uBlue;
        uniform vec3 uViolet;
        uniform vec3 uAmber;
        uniform vec3 uDark;

        // hash + value-noise FBM
        vec2 hash2(vec2 p){
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                         dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
                     mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                         dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }

        void main(){
          // aspect-corrected coords
          vec2 uv = vUv;
          vec2 p = (uv - 0.5);
          p.x *= uRes.x / uRes.y;

          float t = uTime * 0.06;
          // parallax pull toward mouse
          vec2 m = (uMouse - 0.5) * 0.25;
          p += m;

          // two drifting noise fields -> flowing S-like motion
          float n1 = fbm(p * 1.6 + vec2(t, t * 0.7));
          float n2 = fbm(p * 2.4 - vec2(t * 0.8, t * 1.1) + n1);
          float flow = 0.5 + 0.5 * sin((p.x + p.y) * 1.5 + n2 * 3.5 + uTime * 0.25);

          // gradient position blends blue -> violet -> amber
          float g = clamp(flow * 0.7 + n1 * 0.5 + 0.15, 0.0, 1.0);
          vec3 col = mix(uBlue, uViolet, smoothstep(0.0, 0.55, g));
          col = mix(col, uAmber, smoothstep(0.6, 1.0, g));

          // soften into dark base so it reads as ambient light
          float depth = smoothstep(0.15, 0.95, n2 * 0.6 + 0.5);
          col = mix(uDark, col, depth * 0.9 + 0.1);

          // radial vignette so edges fade to transparent-dark
          float vig = smoothstep(1.15, 0.25, length(p));
          float alpha = (0.55 + 0.45 * depth) * vig;

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      uniforms.uMouse.value.set(
        (e.clientX - r.left) / (r.width || 1),
        1 - (e.clientY - r.top) / (r.height || 1)
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // pause when off-screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();
    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      uniforms.uTime.value += reduce ? 0 : clock.getDelta();
      renderer.render(scene, camera);
    };
    // draw one static frame even under reduced motion
    if (reduce) { uniforms.uTime.value = 12.0; renderer.render(scene, camera); }
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className={className} />;
}

export default GradientWave;
