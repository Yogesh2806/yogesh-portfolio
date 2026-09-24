"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vert = /* glsl */ `
uniform float uBend;
uniform float uHover;
uniform vec2 uMouse;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  // the whole cover curves like a page as you scroll fast
  p.z += sin(uv.x * 3.14159) * uBend * 0.18;
  // a soft bulge follows the pointer
  float d = distance(uv, uMouse);
  p.z += smoothstep(0.55, 0.0, d) * uHover * 0.12;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const frag = /* glsl */ `
uniform sampler2D uTex;
uniform float uHover;
uniform vec2 uMouse;
uniform vec2 uCover;
varying vec2 vUv;
void main() {
  // object-fit: cover
  vec2 uv = (vUv - 0.5) * uCover + 0.5;
  vec2 dir = uv - uMouse;
  float d = length(dir);
  uv -= dir * smoothstep(0.5, 0.0, d) * uHover * 0.06;
  float s = uHover * 0.006;
  vec4 c;
  c.r = texture2D(uTex, uv + vec2(s, 0.0)).r;
  c.g = texture2D(uTex, uv).g;
  c.b = texture2D(uTex, uv - vec2(s, 0.0)).b;
  c.a = 1.0;
  gl_FragColor = c;
}`;

/** A cover image rendered on a WebGL plane: bulges toward the pointer and curls with scroll speed. Falls back to the plain <img>. */
export default function CoverGL({ src, alt }: { src: string; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = box.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 10);
    camera.position.z = 2;
    const uniforms = {
      uTex: { value: null as THREE.Texture | null }, uBend: { value: 0 }, uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uCover: { value: new THREE.Vector2(1, 1) },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms });
    const geo = new THREE.PlaneGeometry(1, 1, 32, 32);
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    let aspectImg = 1;
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const vh = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      mesh.scale.set(vh * camera.aspect, vh, 1);
      const a = w / h;
      uniforms.uCover.value.set(a > aspectImg ? 1 : a / aspectImg, a > aspectImg ? aspectImg / a : 1);
      dirty = true;
    };
    let dirty = true, visible = false, raf = 0, hover = 0, hoverT = 0, bend = 0, lastY = window.scrollY;
    const mouse = new THREE.Vector2(0.5, 0.5), mouseT = new THREE.Vector2(0.5, 0.5);
    new THREE.TextureLoader().load(src, (t) => {
      t.colorSpace = THREE.SRGBColorSpace; t.minFilter = THREE.LinearFilter;
      aspectImg = t.image.width / t.image.height; uniforms.uTex.value = t;
      el.appendChild(renderer.domElement); renderer.domElement.className = "gl";
      imgRef.current?.classList.add("gl-on");
      fit();
    });
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const y = window.scrollY, v = y - lastY; lastY = y;
      bend += (Math.max(-1, Math.min(1, v / 60)) - bend) * 0.08;
      hover += (hoverT - hover) * 0.08;
      mouse.lerp(mouseT, 0.12);
      if (Math.abs(bend) < 0.001 && Math.abs(hover - hoverT) < 0.001 && !dirty) return;
      uniforms.uBend.value = bend; uniforms.uHover.value = hover; uniforms.uMouse.value.copy(mouse);
      if (uniforms.uTex.value) renderer.render(scene, camera);
      dirty = false;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { lastY = window.scrollY; raf = requestAnimationFrame(loop); }
    });
    io.observe(el);
    const card = el.closest(".work-card") || el;
    const move = (e: Event) => { const pe = e as PointerEvent; const r = el.getBoundingClientRect(); mouseT.set((pe.clientX - r.left) / r.width, 1 - (pe.clientY - r.top) / r.height); };
    const enter = () => { hoverT = 1; };
    const leave = () => { hoverT = 0; mouseT.set(0.5, 0.5); };
    card.addEventListener("pointermove", move); card.addEventListener("pointerenter", enter); card.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      card.removeEventListener("pointermove", move); card.removeEventListener("pointerenter", enter); card.removeEventListener("pointerleave", leave);
      geo.dispose(); mat.dispose(); uniforms.uTex.value?.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return (
    <div ref={box} className="cover-gl">
      <img ref={imgRef} src={src} alt={alt} loading="lazy" />
    </div>
  );
}
