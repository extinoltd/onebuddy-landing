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
 * Model: "mac-draco.glb" from the Poimandres examples (MIT). It is a Touch Bar
 * MacBook Pro, so the touch bar is swapped for a function-key row and a notch
 * is added to the display. Falls back to a flat image without WebGL or with
 * reduced motion.
 */

const FOV = 30;
const LID_CLOSED = 1.575, LID_OPEN = -0.425; // rotation of the lid hinge, from the original model
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
      const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');
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
        loader.loadAsync('/models/mac-draco.glb'),
        new THREE.TextureLoader().loadAsync(image),
      ]);
      if (disposed) return;

      const laptop = new THREE.Group(); scene.add(laptop);
      const model = gltf.scene; laptop.add(model);
      model.position.z = -3.4; // centre the base on the origin so the laptop turns about its middle
      const lid = model.getObjectByName('screenflip')!;
      const screenMesh = model.getObjectByName('screen')!;
      const touchbar = model.getObjectByName('touchbar');

      // Polished silver aluminium, satin black keys and bezel.
      const aluminium = new THREE.MeshPhysicalMaterial({ color: 0xc4c8ce, metalness: 1, roughness: 0.3, clearcoat: 0.3, clearcoatRoughness: 0.25, envMapIntensity: 1.25 });
      const keysMat = new THREE.MeshPhysicalMaterial({ color: 0x0c0c0e, metalness: 0.2, roughness: 0.55, clearcoat: 0.2 });
      const bezelMat = new THREE.MeshPhysicalMaterial({ color: 0x030304, metalness: 0, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04 });
      const trackpadMat = new THREE.MeshPhysicalMaterial({ color: 0xc9ccd1, metalness: 1, roughness: 0.42, envMapIntensity: 1.1 });

      screenTex.colorSpace = THREE.SRGBColorSpace;
      screenTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false, color: 0x000000 });

      let screenPart: THREE_NS.Mesh | null = null;
      model.traverse((o) => {
        const mesh = o as THREE_NS.Mesh;
        if (!mesh.isMesh) return;
        const name = (mesh.material as THREE_NS.Material).name;
        if (name === 'aluminium') mesh.material = aluminium;
        else if (name === 'keys') mesh.material = keysMat;
        else if (name.startsWith('matte')) mesh.material = bezelMat;
        else if (name === 'trackpad') mesh.material = trackpadMat;
        else if (name.startsWith('screen')) { mesh.material = screenMat; screenPart = mesh; }
      });
      if (!screenPart) throw new Error('screen mesh not found');
      const screen = screenPart as THREE_NS.Mesh;

      // The model's screen has no texture coordinates: map the picture onto it from above,
      // cropped at the sides so its 16:10 shape fits the display without stretching.
      const geo = screen.geometry; geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const sw = bb.max.x - bb.min.x, sh = bb.max.z - bb.min.z;
      const pos = geo.attributes.position;
      const uv = new Float32Array(pos.count * 2);
      const crop = (sw / sh) / 1.6;
      for (let i = 0; i < pos.count; i++) {
        uv[i * 2] = 0.5 + ((pos.getX(i) - bb.min.x) / sw - 0.5) * crop;
        uv[i * 2 + 1] = (bb.max.z - pos.getZ(i)) / sh;
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

      // A notch at the top centre of the display (about 3.2 cm wide on a real MacBook Pro).
      const nw = sw * 0.108, nh = sh * 0.032, nr = nh * 0.4;
      const shape = new THREE.Shape();
      shape.moveTo(-nw / 2, 0); shape.lineTo(nw / 2, 0); shape.lineTo(nw / 2, -nh + nr);
      shape.quadraticCurveTo(nw / 2, -nh, nw / 2 - nr, -nh); shape.lineTo(-nw / 2 + nr, -nh);
      shape.quadraticCurveTo(-nw / 2, -nh, -nw / 2, -nh + nr); shape.closePath();
      const notchGeo = new THREE.ShapeGeometry(shape); notchGeo.rotateX(-Math.PI / 2);
      const notch = new THREE.Mesh(notchGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));
      notch.position.set(0, bb.max.y + 0.003, bb.min.z);
      screen.add(notch);

      // Swap the touch bar for a row of function keys, as on today's MacBook Pro.
      if (touchbar) {
        touchbar.visible = false;
        const row = new THREE.Group();
        const keyGeo = new RoundedBoxGeometry(0.42, 0.05, 0.2, 2, 0.04);
        for (let i = 0; i < 14; i++) {
          const k = new THREE.Mesh(keyGeo, keysMat);
          k.position.set(-3.38 + i * 0.52, 0, 0);
          row.add(k);
        }
        row.position.copy(touchbar.position);
        (touchbar.parent as THREE_NS.Object3D).add(row);
      }

      // Soft contact shadow.
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(16, 11), new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, -0.16, 0.3); laptop.add(shadow);

      // Where the open screen sits, so the camera can end square on to it.
      lid.rotation.x = LID_OPEN; laptop.rotation.set(0, 0, 0); laptop.updateMatrixWorld(true);
      const screenCenter = new THREE.Vector3(0, bb.max.y, (bb.min.z + bb.max.z) / 2).applyMatrix4(screen.matrixWorld);
      const screenNormal = new THREE.Vector3(0, 1, 0).transformDirection(screen.matrixWorld);
      const screenUp = new THREE.Vector3(0, 0, -1).transformDirection(screen.matrixWorld);
      lid.rotation.x = LID_CLOSED;

      // --- camera
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
      const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const overview = new THREE.Vector3(), overviewTarget = new THREE.Vector3(0, 2.1, -0.8), fullPos = new THREE.Vector3();
      const closedView = new THREE.Vector3(), closedTarget = new THREE.Vector3(0, 0.2, 0.2);
      const resize = () => {
        const el = holder.current; if (!el) return;
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        const d = Math.max(13 / 2 / (tan * camera.aspect), 11.5 / 2 / tan);
        overview.set(0, overviewTarget.y + d * 0.3, overviewTarget.z + d * 0.95);
        // closed: a little closer and higher, looking down on the lid
        const dc = Math.max(12 / 2 / (tan * camera.aspect), 9 / 2 / tan);
        closedView.set(0, closedTarget.y + dc * 0.55, closedTarget.z + dc * 0.84);
        // full screen: the display covers the whole window
        const dCover = Math.min((sh / 2) / tan, (sw * crop / 2) / (tan * camera.aspect));
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
