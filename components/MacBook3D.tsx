'use client';

import { useEffect, useRef, useState } from 'react';
import type * as THREE_NS from 'three';

/**
 * A MacBook Pro with a notch, rendered live with Three.js.
 * The section starts with the app's screen filling the whole viewport; as you
 * scroll, the camera pulls back to reveal the laptop, then swings a little to
 * show its depth. Falls back to a flat image without WebGL or with reduced motion.
 */

// Real proportions of a 14-inch MacBook Pro, in centimetres.
const W = 31.26, DEPTH = 22.12, BASE_H = 0.7;
const LID_H = 21.4, LID_T = 0.5, TILT = 0.22; // lid leans back about 12.6°
const SCREEN_W = 30.0, SCREEN_H = SCREEN_W / 1.6; // the screenshot is 16:10
const SCREEN_TOP = 20.75;
const FOV = 30;

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Silver deck with a black keyboard, speaker grilles and a trackpad, drawn once into a texture. */
function deckTexture(THREE: typeof THREE_NS) {
  const c = document.createElement('canvas');
  c.width = 2048; c.height = Math.round(2048 * (DEPTH / W));
  const g = c.getContext('2d')!;
  const X = (f: number) => f * c.width, Y = (f: number) => f * c.height;
  const grad = g.createLinearGradient(0, 0, 0, c.height);
  grad.addColorStop(0, '#d9dbde'); grad.addColorStop(1, '#c9cbcf');
  g.fillStyle = grad; g.fillRect(0, 0, c.width, c.height);
  const rr = (x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); };
  // speaker grilles
  g.fillStyle = 'rgba(40,42,46,.55)';
  for (const side of [0.035, 0.885]) for (let i = 0; i < 9; i++) for (let j = 0; j < 46; j++) { g.beginPath(); g.arc(X(side) + i * 22, Y(0.07) + j * 15.5, 4.2, 0, Math.PI * 2); g.fill(); }
  // keyboard well
  g.fillStyle = '#1a1b1e'; rr(X(0.125), Y(0.055), X(0.75), Y(0.47), 18);
  const rows = [[14, 0.62], [14, 1], [14, 1], [13, 1], [12, 1], [11, 1]] as const;
  const kx0 = X(0.135), ky0 = Y(0.07), kw = X(0.73), rowH = Y(0.44) / 6.15;
  rows.forEach(([n, scale], r) => {
    const h = rowH * (r === 0 ? 0.62 : 0.86) * (scale as number);
    const y = ky0 + (r === 0 ? 0 : rowH * 0.66 + (r - 1) * rowH);
    let x = kx0; const unit = kw / 14.6;
    for (let k = 0; k < n; k++) {
      let w = unit * 0.9;
      if (r === 5 && k === 4) w = unit * 4.6; // space bar
      if ((r === 2 || r === 3) && k === 0) w = unit * 1.4;
      if (r === 4 && (k === 0 || k === n - 1)) w = unit * 1.9;
      g.fillStyle = '#0b0b0d'; rr(x, y, w, h, 10);
      g.fillStyle = 'rgba(255,255,255,.05)'; rr(x + 3, y + 3, w - 6, h * 0.45, 8);
      x += w + unit * 0.1;
    }
  });
  // trackpad
  g.fillStyle = '#c3c5c9'; rr(X(0.3), Y(0.585), X(0.4), Y(0.375), 26);
  g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 3; g.beginPath(); g.roundRect(X(0.3), Y(0.585), X(0.4), Y(0.375), 26); g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return tex;
}

/** Soft contact shadow under the laptop. */
function shadowTexture(THREE: typeof THREE_NS) {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(256, 256, 20, 256, 256, 250);
  grad.addColorStop(0, 'rgba(0,0,0,.42)'); grad.addColorStop(0.55, 'rgba(0,0,0,.14)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(c);
}

export function MacBook3D({ image, alt }: { image: string; alt: string }) {
  const track = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFallback(true); return; }
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import('three');
      const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (disposed || !holder.current) return;

      let renderer: THREE_NS.WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', logarithmicDepthBuffer: true }); }
      catch { setFallback(true); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      holder.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-20, 40, 30); scene.add(key);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const aluminium = new THREE.MeshPhysicalMaterial({ color: 0xcfd2d6, metalness: 0.92, roughness: 0.32, clearcoat: 0.25, clearcoatRoughness: 0.4 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x1d1e21, metalness: 0.6, roughness: 0.5 });

      const laptop = new THREE.Group(); scene.add(laptop);
      // base
      const base = new THREE.Mesh(new RoundedBoxGeometry(W, BASE_H, DEPTH, 5, 0.34), aluminium);
      base.position.y = BASE_H / 2; laptop.add(base);
      const deck = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.7, DEPTH - 0.7),
        new THREE.MeshPhysicalMaterial({ map: deckTexture(THREE), metalness: 0.55, roughness: 0.42 }));
      deck.rotation.x = -Math.PI / 2; deck.position.set(0, BASE_H + 0.002, 0.1); laptop.add(deck);
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, W * 0.86, 24), dark);
      hinge.rotation.z = Math.PI / 2; hinge.position.set(0, BASE_H, -DEPTH / 2 + 0.25); laptop.add(hinge);
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.9, DEPTH * 1.9),
        new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.001; laptop.add(shadow);

      // lid, pivoting at the hinge
      const lid = new THREE.Group(); lid.position.set(0, BASE_H, -DEPTH / 2 + 0.25); lid.rotation.x = -TILT; laptop.add(lid);
      const shell = new THREE.Mesh(new RoundedBoxGeometry(W, LID_H, LID_T, 5, 0.24), aluminium);
      shell.position.set(0, LID_H / 2, -LID_T / 2); lid.add(shell);
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.28, LID_H - 0.28),
        new THREE.MeshPhysicalMaterial({ color: 0x050506, metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 }));
      glass.position.set(0, LID_H / 2, 0.005); lid.add(glass);
      const texture = await new THREE.TextureLoader().loadAsync(image);
      if (disposed) return;
      texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const screenMat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_W, SCREEN_H), screenMat);
      const screenY = SCREEN_TOP - SCREEN_H / 2;
      screen.position.set(0, screenY, 0.03); lid.add(screen);
      // the notch: a black cut-out at the top centre of the screen
      const notchShape = new THREE.Shape();
      const nw = 3.0, nh = 0.62, nr = 0.22;
      notchShape.moveTo(-nw / 2, 0); notchShape.lineTo(nw / 2, 0); notchShape.lineTo(nw / 2, -nh + nr);
      notchShape.quadraticCurveTo(nw / 2, -nh, nw / 2 - nr, -nh); notchShape.lineTo(-nw / 2 + nr, -nh);
      notchShape.quadraticCurveTo(-nw / 2, -nh, -nw / 2, -nh + nr); notchShape.lineTo(-nw / 2, 0);
      const notch = new THREE.Mesh(new THREE.ShapeGeometry(notchShape), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      notch.position.set(0, SCREEN_TOP + 0.001, 0.06); lid.add(notch);
      laptop.position.set(0, 0, 0);

      // where the screen is in the world, to start the camera square on to it
      scene.updateMatrixWorld(true);
      const screenCenter = new THREE.Vector3(); screen.getWorldPosition(screenCenter);
      const lidUp = new THREE.Vector3(0, Math.cos(TILT), -Math.sin(TILT));
      const normal = new THREE.Vector3(0, Math.sin(TILT), Math.cos(TILT));

      const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 300);
      const startPos = new THREE.Vector3(), endPos = new THREE.Vector3(), endTarget = new THREE.Vector3(0, 8.6, -2.5);
      const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));

      const resize = () => {
        const el = holder.current; if (!el) return;
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        // Start: the screen covers the whole viewport (no white edges).
        const dH = (SCREEN_H / 2) / tan, dW = (SCREEN_W / 2) / (tan * camera.aspect);
        startPos.copy(screenCenter).addScaledVector(normal, Math.min(dH, dW) * 0.985);
        // End: the whole laptop fits with room around it.
        const fitW = 42 / 2 / (tan * camera.aspect), fitH = 34 / 2 / tan;
        const d = Math.max(fitW, fitH);
        endPos.set(0, endTarget.y + d * 0.24, d);
      };
      resize();
      const ro = new ResizeObserver(resize); ro.observe(holder.current);

      let target = 0, current = 0, visible = true, frame = 0;
      const readScroll = () => {
        const el = track.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        target = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height - window.innerHeight, 1)));
      };
      readScroll();
      window.addEventListener('scroll', readScroll, { passive: true });
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '200px' });
      io.observe(track.current!);

      const pos = new THREE.Vector3(), look = new THREE.Vector3(), up = new THREE.Vector3();
      const worldUp = new THREE.Vector3(0, 1, 0);
      let mouseX = 0;
      const onMouse = (e: MouseEvent) => { mouseX = (e.clientX / window.innerWidth - 0.5) * 2; };
      window.addEventListener('mousemove', onMouse, { passive: true });
      let swayX = 0;

      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) return;
        current += (target - current) * 0.12;
        const reveal = easeInOut(smooth(0.02, 0.62, current));
        const orbit = smooth(0.6, 1, current);
        pos.lerpVectors(startPos, endPos, reveal);
        look.lerpVectors(screenCenter, endTarget, reveal);
        up.lerpVectors(lidUp, worldUp, reveal).normalize();
        // swing round to show the laptop's depth, plus a touch of pointer parallax once revealed
        swayX += (mouseX - swayX) * 0.05;
        const angle = -0.42 * orbit + swayX * 0.06 * reveal;
        const offset = pos.clone().sub(look);
        offset.applyAxisAngle(worldUp, angle);
        camera.position.copy(look).add(offset);
        camera.up.copy(up);
        camera.lookAt(look);
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', readScroll);
        window.removeEventListener('mousemove', onMouse);
        ro.disconnect(); io.disconnect();
        renderer.dispose(); pmrem.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => setFallback(true));
    return () => { disposed = true; cleanup(); };
  }, [image]);

  return (
    <section className="mb3d-track" ref={track} aria-label={alt}>
      <div className="mb3d-sticky">
        {fallback
          ? <img className="mb3d-fallback" src={image} alt={alt} width={1440} height={900} />
          : <div className="mb3d-canvas" ref={holder} role="img" aria-label={alt} />}
      </div>
    </section>
  );
}
