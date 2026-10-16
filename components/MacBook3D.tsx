'use client';

import { useEffect, useRef, useState } from 'react';
import type * as THREE_NS from 'three';

/**
 * An interactive MacBook Pro, rendered live with Three.js.
 *
 * Scroll: the laptop starts closed at an angle, the lid opens and the screen
 * lights up, the camera comes square on to the display, and the screen then
 * steps through OneBuddy's features with a caption under each.
 * Pointer: the laptop turns gently towards the cursor.
 *
 * Model: "macbook-pro.glb", converted from macbookpro.fbx and Draco-compressed.
 * Lit by a studio of softboxes; a soft brand-coloured glow rises behind it as the screen comes on.
 * Falls back to a flat image without WebGL or with
 * reduced motion.
 */

const FOV = 30;
const UI = '/images/mac/ui';

type Layer = { src: string; x: number; y: number; w: number }; // x is the centre, in a 1440 x 900 desktop
type Slide = { title: string; sub: string; full?: string; layers?: Layer[] };
const SLIDES: Slide[] = [
  { title: 'Everything in one window', sub: 'Tasks, clipboard, dictation and cleanup, side by side.', full: 'desktop-home' },
  { title: 'Tasks that keep up', sub: 'Plan the day, set reminders and tick things off.', full: 'desktop-tasks' },
  { title: 'Your notch, put to work', sub: 'Music, calendar and timers drop down from the notch.', layers: [{ src: 'notch-home', x: 720, y: 0, w: 700 }] },
  { title: 'A launcher that does the maths', sub: 'Open apps, run commands, convert 100 USD to LKR.', layers: [{ src: 'launcher', x: 720, y: 150, w: 720 }, { src: 'launcher-fx', x: 720, y: 640, w: 720 }] },
  { title: 'Clipboard shelf', sub: 'Everything you copied, one scroll away.', layers: [{ src: 'shelf', x: 720, y: 540, w: 1440 }] },
  { title: 'Focus timer', sub: 'A Pomodoro in the notch, your task list floating beside you.', layers: [{ src: 'notch-pomodoro', x: 720, y: 0, w: 640 }, { src: 'focus', x: 1190, y: 250, w: 300 }] },
  { title: 'Dictation', sub: 'Talk, and it types in any app.', layers: [{ src: 'dictation', x: 720, y: 200, w: 900 }] },
  { title: 'Cleaner', sub: 'Clear caches and big AI temp files in a click.', layers: [{ src: 'cleaner', x: 720, y: 80, w: 1100 }] },
];
const MENU_BAR = 30; // height of the macOS menu bar in the desktop screenshots

const loadImage = (src: string) => new Promise<HTMLImageElement>((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = src; });

/** Paints one slide: a full screenshot, or panels floating over the blurred desktop. */
function paintSlide(slide: Slide, img: (name: string) => HTMLImageElement) {
  const c = document.createElement('canvas'); c.width = 1440; c.height = 900;
  const g = c.getContext('2d')!;
  if (slide.full) { g.drawImage(img(slide.full), 0, 0, 1440, 900); return c; }
  const desk = img('desktop-home');
  g.filter = 'blur(22px) brightness(0.5)'; g.drawImage(desk, -40, -40, 1520, 980); g.filter = 'none';
  g.drawImage(desk, 0, 0, 1440, MENU_BAR, 0, 0, 1440, MENU_BAR);
  for (const l of slide.layers ?? []) {
    const im = img(l.src), h = l.w * im.height / im.width, x = l.x - l.w / 2, y = Math.max(l.y, l.y === 0 ? 0 : MENU_BAR);
    g.save();
    g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 40; g.shadowOffsetY = 16;
    g.beginPath(); g.roundRect(x, y, l.w, h, l.y === 0 ? [0, 0, 22, 22] : 16); g.fillStyle = '#000'; g.fill();
    g.shadowColor = 'transparent'; g.clip(); g.drawImage(im, x, y, l.w, h);
    g.restore();
  }
  return c;
}
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
  const cap = useRef<HTMLDivElement>(null);
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
      // A photo studio: the room plus long softboxes, which draw the crisp highlights along the aluminium edges.
      const studio = new RoomEnvironment();
      const box = (w: number, h: number, x: number, y: number, z: number, ry: number, rx: number, intensity: number) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(intensity, intensity, intensity), side: THREE.DoubleSide }));
        m.position.set(x, y, z); m.rotation.set(rx, ry, 0); studio.add(m);
      };
      box(14, 1.2, 0, 13, -4, 0, Math.PI / 2, 5);   // overhead strip
      box(1.2, 10, -13, 5, 2, Math.PI / 2, 0, 6);  // left strip
      box(1.2, 10, 13, 5, -2, -Math.PI / 2, 0, 5); // right strip
      box(16, 6, 0, 4, 16, Math.PI, 0, 3);         // big front softbox
      scene.environment = pmrem.fromScene(studio, 0.02).texture;
      // the lit screen spills a cool light onto the keyboard
      const spill = new THREE.PointLight(0x8fa8ff, 0, 9, 1.6); scene.add(spill);
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-6, 10, 8); scene.add(key);
      const rim = new THREE.DirectionalLight(0xbfd4ff, 1.2); rim.position.set(8, 4, -6); scene.add(rim);

      // --- model
      const draco = new DRACOLoader(); draco.setDecoderPath('/draco/');
      const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
      const names = Array.from(new Set(SLIDES.flatMap((sl) => [sl.full ?? 'desktop-home', ...(sl.layers ?? []).map((l) => l.src)])));
      const [gltf, ...pics] = await Promise.all([
        loader.loadAsync('/models/macbook-pro.glb'),
        ...names.map((n) => loadImage(`${UI}/${n}.webp`)),
      ]);
      if (disposed) return;
      const byPic = new Map(names.map((n, i) => [n, pics[i] as HTMLImageElement]));
      const slideTex = SLIDES.map((sl) => {
        const t = new THREE.CanvasTexture(paintSlide(sl, (n) => byPic.get(n)!));
        t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return t;
      });

      const laptop = new THREE.Group(); scene.add(laptop);
      const model = gltf.scene; laptop.add(model);
      model.scale.setScalar(0.03); // millimetres to scene units: about 9 wide
      const lid = model.getObjectByName('Cube016')!;
      const logo = model.getObjectByName('Curve');
      const logoMat = new THREE.MeshPhysicalMaterial({ color: 0x1b1c1f, metalness: 0.9, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 0.6, side: THREE.DoubleSide });
      if (logo) logo.frustumCulled = false; // its bounds from the file are wrong, so it was being culled
      // bead-blasted aluminium: a very fine grain in the roughness
      const grain = document.createElement('canvas'); grain.width = grain.height = 256;
      const gg = grain.getContext('2d')!, gd = gg.createImageData(256, 256);
      for (let i = 0; i < gd.data.length; i += 4) { const n = 172 + Math.random() * 28; gd.data[i] = gd.data[i + 1] = gd.data[i + 2] = n; gd.data[i + 3] = 255; }
      gg.putImageData(gd, 0, 0);
      const grainTex = new THREE.CanvasTexture(grain); grainTex.wrapS = grainTex.wrapT = THREE.RepeatWrapping; grainTex.repeat.set(24, 24);

      const aluminium = new THREE.MeshPhysicalMaterial({ color: 0xb9bdc4, metalness: 1, roughness: 0.4, roughnessMap: grainTex, clearcoat: 0.35, clearcoatRoughness: 0.22, envMapIntensity: 0.95, sheen: 0.25, sheenColor: new THREE.Color(0xe8ecff) });
      const keysMat = new THREE.MeshPhysicalMaterial({ color: 0x0c0c0e, metalness: 0.2, roughness: 0.55, clearcoat: 0.2 });
      const legendMat = new THREE.MeshStandardMaterial({ color: 0x9a9ca0, roughness: 0.6 });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, metalness: 0.3, roughness: 0.6 });
      const grilleMat = new THREE.MeshStandardMaterial({ color: 0x1c1d20, metalness: 0.5, roughness: 0.5 });
      const bezelMat = new THREE.MeshPhysicalMaterial({ color: 0x030304, metalness: 0, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04 });

      // The display crossfades from one feature to the next; the incoming one settles from slightly larger.
      const screenUniforms = {
        uA: { value: slideTex[0] }, uB: { value: slideTex[1] }, uMix: { value: 0 }, uMask: { value: null as THREE_NS.Texture | null },
        uDisp: { value: new THREE.Vector4(0, 0, 1, 1) }, // display rectangle in uv: x, y, w, h
        uFit: { value: new THREE.Vector2(1, 1) }, uBright: { value: 0 },
      };
      const screenMat = new THREE.ShaderMaterial({
        uniforms: screenUniforms, toneMapped: false,
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
          uniform sampler2D uA, uB, uMask; uniform vec4 uDisp; uniform vec2 uFit; uniform float uMix, uBright; varying vec2 vUv;
          void main() {
            vec2 d = (vUv - uDisp.xy) / uDisp.zw;                       // 0..1 across the display
            vec3 a = texture2D(uA, (d - 0.5) * uFit + 0.5).rgb;
            vec2 db = (d - 0.5) / mix(1.06, 1.0, uMix) + 0.5;
            vec3 b = texture2D(uB, (db - 0.5) * uFit + 0.5).rgb;
            vec3 col = mix(a, b, uMix);
            col += vec3(0.45, 0.5, 1.0) * (1.0 - uBright) * uBright * 1.6;  // power-on flash
            gl_FragColor = vec4(col * texture2D(uMask, vUv).r * uBright, 1.0);
            #include <colorspace_fragment>
          }`,
      });

      // Material names come from the FBX file.
      const byName: Record<string, THREE_NS.Material> = {
        'Material.003': aluminium, // body, lid
        'Material.004': keysMat,
        'Material.002': legendMat, // key legends
        'Material.009': grilleMat, // speaker grilles
        'Material.016': darkMat, 'Material.013': darkMat, 'Material.011': darkMat, 'Material.014': darkMat, 'Material.006': darkMat,
        'Material.010': aluminium,
        'Material.007': bezelMat, 'Material.008': bezelMat,
        'Material.017': logoMat, // Apple logo
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
      const cw = 1600, ch = Math.round(cw * sh / sw), k = cw / sw;
      const cnv = document.createElement('canvas'); cnv.width = cw; cnv.height = ch;
      const g = cnv.getContext('2d')!;
      g.fillStyle = '#000'; g.fillRect(0, 0, cw, ch);
      const dx = bezel * k, dy = bezel * k, dw = dispW * k, dh = dispH * k, r = dw * 0.012;
      g.fillStyle = '#fff'; g.beginPath();
      g.moveTo(dx, dy + dh); g.lineTo(dx, dy + r); g.quadraticCurveTo(dx, dy, dx + r, dy);
      g.lineTo(dx + dw - r, dy); g.quadraticCurveTo(dx + dw, dy, dx + dw, dy + r); g.lineTo(dx + dw, dy + dh); g.closePath(); g.fill();
      const nw = dw * 0.105, nh = dh * 0.034, nr = nh * 0.45; // notch
      g.fillStyle = '#000'; g.beginPath();
      g.moveTo(cw / 2 - nw / 2, 0); g.lineTo(cw / 2 - nw / 2, dy + nh - nr); g.quadraticCurveTo(cw / 2 - nw / 2, dy + nh, cw / 2 - nw / 2 + nr, dy + nh);
      g.lineTo(cw / 2 + nw / 2 - nr, dy + nh); g.quadraticCurveTo(cw / 2 + nw / 2, dy + nh, cw / 2 + nw / 2, dy + nh - nr); g.lineTo(cw / 2 + nw / 2, 0); g.fill();
      screenUniforms.uMask.value = new THREE.CanvasTexture(cnv);
      // canvas y runs down, uv y runs up
      screenUniforms.uDisp.value.set(bezel / sw, bezel / sh, dispW / sw, dispH / sh);
      const fit = (img: { width: number; height: number }) => {
        const ia = img.width / img.height, da = dispW / dispH; // cover the display
        return ia > da ? new THREE.Vector2(da / ia, 1) : new THREE.Vector2(1, ia / da);
      };
      screenUniforms.uFit.value = fit({ width: 1440, height: 900 });
      lid.rotation.x = LID_CLOSED;

      // Soft contact shadow.
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(16, 11), new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, 0.004, 0.3); laptop.add(shadow);

      // --- camera
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
      const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const overview = new THREE.Vector3(), overviewTarget = new THREE.Vector3(0, 2.5, -0.8), fitPos = new THREE.Vector3();
      // square on to the display, sitting a little high to leave room for the caption
      const fitTarget = screenCenter.clone().addScaledVector(screenUp, -dispH * 0.2);
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
        // features: the whole display in view, never cropped
        const dFit = Math.max((dispH / 2) / tan / 0.52, (dispW / 2) / (tan * camera.aspect) / 0.8);
        fitPos.copy(fitTarget).addScaledVector(screenNormal, dFit);
      };
      resize();
      const ro = new ResizeObserver(resize); ro.observe(holder.current!);

      // --- input
      let target = 0, current = 0, visible = true, frame = 0, lastShown = -1;
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
        const open = easeInOut(smooth(0.0, 0.16, current));   // lid opens
        const fitT = easeInOut(smooth(0.13, 0.26, current));  // camera comes square on to the display
        lid.rotation.x = LID_CLOSED + (LID_OPEN - LID_CLOSED) * open;
        // the screen lights up as the lid passes upright
        const light = smooth(0.35, 0.85, open);
        screenUniforms.uBright.value = light;

        // step through the features: hold each one, then crossfade to the next
        const f = smooth(0.27, 0.97, current) * (SLIDES.length - 1);
        const i = Math.min(Math.floor(f), SLIDES.length - 2), mix = smooth(0.6, 1, f - i);
        if (screenUniforms.uA.value !== slideTex[i]) { screenUniforms.uA.value = slideTex[i]; screenUniforms.uB.value = slideTex[i + 1]; }
        screenUniforms.uMix.value = mix;
        const shown = mix < 0.5 ? i : i + 1;
        if (shown !== lastShown && cap.current) {
          lastShown = shown;
          cap.current.querySelector('h3')!.textContent = SLIDES[shown].title;
          cap.current.querySelector('p')!.textContent = SLIDES[shown].sub;
          cap.current.querySelectorAll('i').forEach((dot, k) => dot.classList.toggle('on', k === shown));
        }
        if (cap.current) cap.current.style.opacity = String(fitT * Math.abs(1 - 2 * mix));

        spill.intensity = light * 6 * (1 - fitT * 0.7);
        spill.position.copy(screenCenter).addScaledVector(screenNormal, 2.2).applyMatrix4(laptop.matrixWorld);
        holder.current?.style.setProperty('--glow', String(light * (1 - fitT * 0.35)));

        // the laptop turns from a three-quarter view to face you, and follows the pointer
        sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
        const free = 1 - fitT * 0.8;
        laptop.rotation.y = -0.55 * (1 - open) * (1 - fitT) + sx * 0.5 * free;
        laptop.rotation.x = (sy * 0.18) * free;
        laptop.position.y = Math.sin(t * 1.2) * 0.06 * free;

        camPos.lerpVectors(closedView, overview, open).lerp(fitPos, fitT);
        look.lerpVectors(closedTarget, overviewTarget, open).lerp(fitTarget, fitT);
        up.lerpVectors(worldUp, screenUp, fitT).normalize();
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
        {!fallback && (
          <div className="mb3d-cap" ref={cap} aria-live="polite">
            <h3>{SLIDES[0].title}</h3>
            <p>{SLIDES[0].sub}</p>
            <div className="dots" aria-hidden="true">{SLIDES.map((sl, k) => <i key={sl.title} className={k === 0 ? 'on' : undefined} />)}</div>
          </div>
        )}
      </div>
    </section>
  );
}
