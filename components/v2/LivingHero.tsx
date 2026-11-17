"use client";

import { useEffect, useRef, useState } from "react";
import { ambient } from "@/lib/ambient";

// The hero photo, brought to life with one small WebGL shader: clouds drift, the sea breathes,
// the stepwell water ripples and the sun glows. A mask image tells each effect where it may act.
const VS = "attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}";
const FS = `precision highp float;varying vec2 v;uniform sampler2D I,M;uniform vec2 R;uniform float T,A;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fb(vec2 p){float s=0.,a=.5;for(int k=0;k<4;k++){s+=a*n(p);p*=2.03;a*=.5;}return s;}
void main(){
 float sA=R.x/R.y; vec2 sc=sA>A?vec2(1.,A/sA):vec2(sA/A,1.);
 float z=1.015+.02*(.5-.5*cos(T*6.2831/32.));
 vec2 dr=vec2(.004*sin(T*6.2831/46.),.003*sin(T*6.2831/58.));
 vec2 u=(v-.5)*sc/z+.5+dr;
 vec4 m=texture2D(M,u);
 float sp=1./26.,p1=fract(T*sp),p2=fract(T*sp+.5),wA=1.-abs(1.-2.*p1);
 vec2 dir=vec2(-.016,.0015);
 vec2 wp=(vec2(fb(u*3.+T*.02),fb(u*3.+9.1-T*.017))-.5)*.006;
 vec2 sd=vec2(sin(u.y*240.+T*1.1+fb(u*18.)*4.)*.0008,sin(u.x*70.-T*.8)*.0011)*m.g;
 vec2 wd=vec2(sin(u.y*320.-T*2.),cos(u.x*260.+T*1.6))*.0017*m.b;
 vec2 o=sd+wd;
 vec3 c=mix(texture2D(I,u+(dir*(p2-.5)+wp)*m.r+o).rgb,texture2D(I,u+(dir*(p1-.5)+wp)*m.r+o).rgb,wA);
 float l=dot(c,vec3(.299,.587,.114));
 float g=pow(n(u*vec2(110.,360.)+vec2(T*.55,T*.12)),12.)*m.g;
 c+=g*1.4*smoothstep(.35,.8,l)*vec3(1.,.96,.88);
 c*=1.+m.g*.05*(fb(u*vec2(8.,30.)+vec2(T*.12,0.))-.5);
 vec2 sn=vec2(.995,.318); float d=length((u-sn)*vec2(A,1.));
 c+=vec3(1.,.70,.36)*.13*(.82+.18*sin(T*.6))*exp(-d*5.5);
 gl_FragColor=vec4(c,1.);}`;

export default function LivingHero({ children }: { children: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [sound, setSound] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const hero = frame.current!, cv = canvas.current!;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true, acc = 0, last = performance.now(), raf = 0, A = 16 / 9, dead = false;
    // if the browser drops the context (too many tabs, GPU reset), fall back to the still photo
    const lost = (e: Event) => { e.preventDefault(); setLive(false); dead = true; cancelAnimationFrame(raf); };
    cv.addEventListener("webglcontextlost", lost);
    const sh = (t: number, src: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o) || "shader"); return o; };
    let pr: WebGLProgram;
    try { pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr); } catch { return; }
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pl = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(pl); gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 0, 0);
    const U = (k: string) => gl.getUniformLocation(pr, k);
    const tex = (src: string, unit: number) => new Promise<HTMLImageElement>((res, rej) => {
      const im = new Image(); im.decoding = "async";
      im.onload = () => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
        [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im); res(im); };
      im.onerror = rej; im.src = src;
    });
    
    const size = () => { const d = Math.min(window.devicePixelRatio || 1, 1.75); cv.width = Math.round(hero.clientWidth * d); cv.height = Math.round(hero.clientHeight * d); gl.viewport(0, 0, cv.width, cv.height); };
    const draw = (now: number) => { const dt = Math.min(now - last, 100); last = now; if (!reduce && visible) acc += dt; gl.uniform2f(U("R"), cv.width, cv.height); gl.uniform1f(U("T"), acc / 1000); gl.uniform1f(U("A"), A); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };
    const loop = (now: number) => { if (dead) return; draw(now); raf = visible && !reduce ? requestAnimationFrame(loop) : 0; };
    const kick = () => { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const big = window.innerWidth * (window.devicePixelRatio || 1) > 1700;
    Promise.all([tex(big ? "/img/v2/hero-2880.webp" : "/img/v2/hero-1600.webp", 0), tex("/img/v2/hero-mask.webp", 1)]).then(([im]) => {
      if (dead) return;
      A = im.naturalWidth / im.naturalHeight; gl.uniform1i(U("I"), 0); gl.uniform1i(U("M"), 1); size(); draw(performance.now()); setLive(true); kick();
    }).catch(() => {});
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); }); ro.observe(hero);
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; ambient.setAudible(visible && !document.hidden); if (visible) kick(); }); io.observe(hero);
    const vis = () => { visible = !document.hidden; ambient.setAudible(!document.hidden); if (visible) kick(); };
    document.addEventListener("visibilitychange", vis);
    return () => {
      dead = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", vis); cv.removeEventListener("webglcontextlost", lost); ambient.setAudible(false);
      // hand the GPU context back right away, so coming back to home never runs out of contexts
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const toggle = () => { const v = !sound; setSound(v); ambient.set(v); };

  return (
    <section className="hero" id="top">
      <div ref={frame} className={`hero-frame${live ? " live" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/v2/hero-1600.webp" srcSet="/img/v2/hero-1600.webp 1600w, /img/v2/hero-2880.webp 2880w" sizes="100vw" alt="A golden stepwell and hilltop fort above a desert beach, with camels walking toward the sea" fetchPriority="high" />
        <canvas ref={canvas} aria-hidden="true" />
        <div className="hero-shade" />
        <button className="sound" onClick={toggle} aria-pressed={sound} aria-label={sound ? "Turn sea sounds off" : "Turn sea sounds on"}>
          <span className="bars" aria-hidden="true"><i /><i /><i /><i /></span>{sound ? "Sound on" : "Sound off"}
        </button>
        {children}
      </div>
    </section>
  );
}
