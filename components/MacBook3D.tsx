'use client';

import { useEffect, useRef, useState } from 'react';
import type * as THREE_NS from 'three';

/**
 * An interactive MacBook Pro, rendered live with Three.js.
 *
 * Scroll: the laptop starts closed at an angle, the lid opens and the screen
 * lights up with OneBuddy, then the camera flies into the screen until it fills
 * the whole window. Pointer: the laptop turns gently towards the cursor.
 *
 * Model: "macbook-pro.glb", converted from macbookpro.fbx and Draco-compressed.
 * Falls back to a flat image without WebGL or with
 * reduced motion.
 */

const FOV = 30;
const LID_CLOSED = 0, LID_OPEN = -1.925; // rotation of the lid about its hinge, as in the model file
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function shadowTexture(THREE: typeof THREE_NS) {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(256, 256, 10, 256, 256, 250);
  grad.addColorStop(0, 'rgba(15,20,35,.45)'); grad.addColorStop(0.5, 'rgba(15,20,35,.16)'); grad.addColorStop(1, 'rgba(15,20,35,0)');
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
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
            if (disposed || !holder.current) return;

      let renderer: THREE_NS.WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); }
      catch { setFallback(true); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      holder.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-6, 10, 8); scene.add(key);
      const rim = new THREE.DirectionalLight(0xbfd4ff, 1.2); rim.position.set(8, 4, -6); scene.add(rim);

      // --- model
      const draco = new DRACOLoader(); draco.setDecoderPath('/draco/');
      const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
      const [gltf, screenTex] = await Promise.all([
        loader.loadAsync('/models/macbook-pro.glb'),
        new THREE.TextureLoader().loadAsync(image),
      ]);
      if (disposed) return;

      const laptop = new THREE.Group(); scene.add(laptop);
      const model = gltf.scene; laptop.add(model);
      model.scale.setScalar(0.03); // millimetres to scene units: about 9 wide
      const lid = model.getObjectByName('Cube016')!;
      const logo = model.getObjectByName('Curve');
      if (logo) logo.visible = false; // keep the lid plain: no Apple logo on our page

      const aluminium = new THREE.MeshPhysicalMaterial({ color: 0xc4c8ce, metalness: 1, roughness: 0.3, clearcoat: 0.3, clearcoatRoughness: 0.25, envMapIntensity: 1.25 });
      const keysMat = new THREE.MeshPhysicalMaterial({ color: 0x0c0c0e, metalness: 0.2, roughness: 0.55, clearcoat: 0.2 });
      const legendMat = new THREE.MeshStandardMaterial({ color: 0x9a9ca0, roughness: 0.6 });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, metalness: 0.3, roughness: 0.6 });
      const grilleMat = new THREE.MeshStandardMaterial({ color: 0x1c1d20, metalness: 0.5, roughness: 0.5 });
      const bezelMat = new THREE.MeshPhysicalMaterial({ color: 0x030304, metalness: 0, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04 });

      const screenMat = new THREE.MeshBasicMaterial({ toneMapped: false, color: 0x000000 });

      // Material names come from the FBX file.
      const byName: Record<string, THREE_NS.Material> = {
        'Material.003': aluminium, // body, lid
        'Material.004': keysMat,
        'Material.002': legendMat, // key legends
        'Material.009': grilleMat, // speaker grilles
        'Material.016': darkMat, 'Material.013': darkMat, 'Material.011': darkMat, 'Material.014': darkMat, 'Material.006': darkMat,
        'Material.010': aluminium,
        'Material.007': bezelMat, 'Material.008': bezelMat,
      };
      let screenPart: THREE_NS.Mesh | null = null;
      model.traverse((o) => {
        const mesh = o as THREE_NS.Mesh;
        if (!mesh.isMesh) return;
        const name = (mesh.material as THREE_NS.Material).name;
        if (name === 'Material.005') { mesh.material = screenMat; screenPart = mesh; }
        else mesh.material = byName[name] ?? aluminium;
      });
      if (!screenPart) throw new Error('screen mesh not found');
      const screen = screenPart as THREE_NS.Mesh;

      // Map the picture onto the display, measured with the lid open and facing us,
      // cropped at the sides so its 16:10 shape is not stretched.
      lid.rotation.x = LID_OPEN; laptop.updateMatrixWorld(true);
      const geo = screen.geometry, pos = geo.attributes.position, v = new THREE.Vector3();
      let top = new THREE.Vector3(0, -Infinity, 0), bottom = new THREE.Vector3(0, Infinity, 0);
      let minX = Infinity, maxX = -Infinity;
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(screen.matrixWorld);
        if (v.y > top.y) top = v.clone();
        if (v.y < bottom.y) bottom = v.clone();
        minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
      }
      const screenUp = new THREE.Vector3(0, top.y - bottom.y, top.z - bottom.z).normalize();
      const screenNormal = new THREE.Vector3(1, 0, 0).cross(screenUp).normalize();
      const sw = maxX - minX;
      const upMin = bottom.dot(screenUp), sh = top.dot(screenUp) - upMin;
      const screenCenter = new THREE.Vector3((minX + maxX) / 2, 0, 0)
        .addScaledVector(screenUp, upMin + sh / 2)
        .addScaledVector(screenNormal, bottom.dot(screenNormal));
      const uv = new Float32Array(pos.count * 2);
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(screen.matrixWorld);
        uv[i * 2] = (v.x - minX) / sw;
        uv[i * 2 + 1] = (v.dot(screenUp) - upMin) / sh;
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

      // The model's glass covers the whole lid, so paint the black border, the
      // display with rounded top corners and the notch into the texture itself.
      const bezel = sw * 0.012; // about 3.5 mm
      const dispW = sw - bezel * 2, dispH = sh - bezel * 2;
      const cw = 2560, ch = Math.round(cw * sh / sw), k = cw / sw;
      const cnv = document.createElement('canvas'); cnv.width = cw; cnv.height = ch;
      const g = cnv.getContext('2d')!;
      g.fillStyle = '#000'; g.fillRect(0, 0, cw, ch);
      const dx = bezel * k, dy = bezel * k, dw = dispW * k, dh = dispH * k, r = dw * 0.012;
      g.save(); g.beginPath();
      g.moveTo(dx, dy + dh); g.lineTo(dx, dy + r); g.quadraticCurveTo(dx, dy, dx + r, dy);
      g.lineTo(dx + dw - r, dy); g.quadraticCurveTo(dx + dw, dy, dx + dw, dy + r); g.lineTo(dx + dw, dy + dh); g.closePath(); g.clip();
      const img = screenTex.image as HTMLImageElement, ia = img.width / img.height, da = dw / dh;
      const iw = ia > da ? dh * ia : dw, ih = ia > da ? dh : dw / ia; // cover
      g.drawImage(img, dx + (dw - iw) / 2, dy + (dh - ih) / 2, iw, ih);
      g.restore();
      const nw = dw * 0.105, nh = dh * 0.034, nr = nh * 0.45; // notch
      g.fillStyle = '#000'; g.beginPath();
      g.moveTo(cw / 2 - nw / 2, 0); g.lineTo(cw / 2 - nw / 2, dy + nh - nr); g.quadraticCurveTo(cw / 2 - nw / 2, dy + nh, cw / 2 - nw / 2 + nr, dy + nh);
      g.lineTo(cw / 2 + nw / 2 - nr, dy + nh); g.quadraticCurveTo(cw / 2 + nw / 2, dy + nh, cw / 2 + nw / 2, dy + nh - nr); g.lineTo(cw / 2 + nw / 2, 0); g.fill();
      const tex = new THREE.CanvasTexture(cnv);
      tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      screenMat.map = tex; screenMat.needsUpdate = true;
      screenTex.dispose();
      lid.rotation.x = LID_CLOSED;

      // Soft contact shadow.
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(16, 11), new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, 0.004, 0.3); laptop.add(shadow);

      // --- camera
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
      const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const overview = new THREE.Vector3(), overviewTarget = new THREE.Vector3(0, 2.5, -0.8), fullPos = new THREE.Vector3();
      const closedView = new THREE.Vector3(), closedTarget = new THREE.Vector3(0, 0.2, 0.2);
      const resize = () => {
        const el = holder.current; if (!el) return;
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        const d = Math.max(13.5 / 2 / (tan * camera.aspect), 12.5 / 2 / tan);
        overview.set(0, overviewTarget.y + d * 0.3, overviewTarget.z + d * 0.95);
        // closed: a little closer and higher, looking down on the lid
        const dc = Math.max(12 / 2 / (tan * camera.aspect), 9 / 2 / tan);
        closedView.set(0, closedTarget.y + dc * 0.55, closedTarget.z + dc * 0.84);
        // full screen: the display covers the whole window
        const dCover = Math.min((dispH / 2) / tan, (dispW / 2) / (tan * camera.aspect));
        fullPos.copy(screenCenter).addScaledVector(screenNormal, dCover * 0.985);
      };
      resize();
      const ro = new ResizeObserver(resize); ro.observe(holder.current!);

      // --- input
      let target = 0, current = 0, visible = true, frame = 0;
      const readScroll = () => {
        const el = track.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        target = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height - window.innerHeight, 1)));
      };
      readScroll();
      window.addEventListener('scroll', readScroll, { passive: true });
      let mx = 0, my = 0, sx = 0, sy = 0;
      const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
      window.addEventListener('pointermove', onMove, { passive: true });
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '200px' });
      io.observe(track.current!);

      const camPos = new THREE.Vector3(), look = new THREE.Vector3(), up = new THREE.Vector3(), worldUp = new THREE.Vector3(0, 1, 0);
      const clock = new THREE.Clock();
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) return;
        const t = clock.getElapsedTime();
        current += (target - current) * 0.1;
        const open = easeInOut(smooth(0.0, 0.42, current));   // lid opens
        const zoom = easeInOut(smooth(0.5, 0.95, current));   // camera flies into the screen
        lid.rotation.x = LID_CLOSED + (LID_OPEN - LID_CLOSED) * open;
        // the screen lights up as the lid passes upright
        const light = smooth(0.35, 0.85, open);
        screenMat.color.setScalar(light);

        // the laptop turns from a three-quarter view to face you, and follows the pointer
        sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
        const free = 1 - zoom;
        laptop.rotation.y = (-0.55 * (1 - open) + sx * 0.5) * free;
        laptop.rotation.x = (sy * 0.18) * free;
        laptop.position.y = Math.sin(t * 1.2) * 0.06 * free;

        camPos.lerpVectors(closedView, overview, open).lerp(fullPos, zoom);
        look.lerpVectors(closedTarget, overviewTarget, open).lerp(screenCenter, zoom);
        up.lerpVectors(worldUp, screenUp, zoom).normalize();
        camera.position.copy(camPos); camera.up.copy(up); camera.lookAt(look);
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', readScroll);
        window.removeEventListener('pointermove', onMove);
        ro.disconnect(); io.disconnect();
        draco.dispose(); renderer.dispose(); pmrem.dispose();
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
