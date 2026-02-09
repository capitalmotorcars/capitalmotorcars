import { useEffect, useRef, useState } from 'react';

const MODEL_URL = '/porsche_918_spyder_2015.glb';

// 3D position of each number: ratio [X,Y,Z] in model world bounding box (0=min, 1=max). Y=up.
// If front of car is the other end, swap high/low X. If left side is wrong, swap Z (e.g. 0.2↔0.8).
const ANNOTATION_DEFS: {
  id: number;
  label: string;
  ratio: [number, number, number];
  description: string;
  zoomDistance: number;
  cameraDir: [number, number, number];
}[] = [
    { id: 1, label: '1', ratio: [0.95, 0.50, 0.88], description: 'Left headlight—sleek lines and LED lighting.', zoomDistance: 1.8, cameraDir: [1.2, 0.25, 0.9] },
    { id: 2, label: '2', ratio: [0.96, 0.60, 0.5], description: 'Front hood and Porsche emblem—aerodynamic design and brand identity.', zoomDistance: 4.4, cameraDir: [1.4, 0.35, 0] },
    { id: 3, label: '3', ratio: [0.60, 0.73, 0.96], description: 'Left rearview mirror—aerodynamic design and visibility.', zoomDistance: 1.2, cameraDir: [0.5, 0.1, 1] },
    { id: 4, label: '4', ratio: [0.78, 0.36, 0.02], description: 'Front-left wheel center cap and brake caliper.', zoomDistance: 2.2, cameraDir: [-8.8, 2.8, -20.6] },
    { id: 5, label: '5', ratio: [0.50, 0.82, 0.18], description: 'A-pillar and windshield—structural rigidity and visibility.', zoomDistance: 0.2, cameraDir: [-2.6, 4.2, -4.6] },
    { id: 6, label: '6', ratio: [0.22, 0.76, 0.48], description: 'Rear engine cover—mid-engine layout and cooling.', zoomDistance: 3.2, cameraDir: [-1.2, 0.25, 0.4] },
    { id: 7, label: '7', ratio: [0.6, 0.68, 0.5], description: 'Interior and driver seat headrest—premium cabin.', zoomDistance: 2.2, cameraDir: [-6.3, 1, -2.2] },
    { id: 8, label: '8', ratio: [0.05, 0.52, 0.18], description: 'Rear engine bay—918 Spyder hybrid powertrain.', zoomDistance: 3.4, cameraDir: [-1.3, 0.2, -1.2] },
  ];

const ZOOM_DURATION = 2;

// Vehicle paint colors (Porsche 918 options)
// hex = color applied to 3D model; swatchHex = color shown in palette (so White looks white, Platinum looks silver)
const VEHICLE_COLORS: { name: string; hex: string; swatchHex?: string }[] = [
  { name: 'Black', hex: '#0B0B0B' },
  { name: 'White', hex: '#EBEBEB', swatchHex: '#F0F0F0' },
  { name: 'Guards Red', hex: '#C41E2E', swatchHex: '#C3002F' },
  { name: 'Racing Yellow', hex: '#F2C300' },
  { name: 'Platinum Silver Metallic', hex: '#7E8084', swatchHex: '#9CA0A4' },
  { name: 'Miami Blue', hex: '#00A8B5' },
];

export { ANNOTATION_DEFS, VEHICLE_COLORS };

export type VehicleColor = (typeof VEHICLE_COLORS)[number];

export interface VehicleViewer3DProps {
  className?: string;
  /** When provided, color is controlled from outside (e.g. hero sidebar). */
  selectedColor?: VehicleColor;
  onColorChange?: (color: VehicleColor) => void;
  /** When provided, annotation selection is controlled from outside. */
  selectedAnnotationId?: number | null;
  onAnnotationSelect?: (id: number | null) => void;
  /** When true, hide in-viewer color picker and annotation popup (use sidebar instead). */
  hideOverlays?: boolean;
}

export function VehicleViewer3D({
  className,
  selectedColor: controlledColor,
  onColorChange,
  selectedAnnotationId: controlledAnnotationId,
  onAnnotationSelect,
  hideOverlays = false,
}: VehicleViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<import('three').Object3D | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [internalAnnotationId, setInternalAnnotationId] = useState<number | null>(null);
  const [internalColor, setInternalColor] = useState(VEHICLE_COLORS[0]);

  const selectedAnnotationId = controlledAnnotationId ?? internalAnnotationId;
  const setSelectedAnnotationId = onAnnotationSelect ?? setInternalAnnotationId;
  const selectedColor = controlledColor ?? internalColor;
  const setSelectedColor = onColorChange ?? setInternalColor;
  const setSelectedAnnotationIdRef = useRef(setSelectedAnnotationId);
  setSelectedAnnotationIdRef.current = setSelectedAnnotationId;
  const showOverlays = !hideOverlays;
  const mountedRef = useRef(true);
  const initRunIdRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    initRunIdRef.current += 1;
    const thisRunId = initRunIdRef.current;
    const container = containerRef.current;
    if (!container) return;

    let animationId = 0;
    let scene: import('three').Scene | null = null;
    let camera: import('three').PerspectiveCamera | null = null;
    let renderer: import('three').WebGLRenderer | null = null;
    let controls: { update: () => void; dispose: () => void } | null = null;
    let model: import('three').Object3D | null = null;
    let labelObjects: import('three').Object3D[] = [];
    let css2DRenderer: { render: (s: unknown, c: unknown) => void; setSize: (w: number, h: number) => void; domElement: HTMLElement } | null = null;

    const init = async () => {
      try {
        // Remove any previous viewer output so we never have two canvases or two models
        container.querySelectorAll('canvas').forEach((el) => el.remove());
        container.querySelectorAll('.vehicle-viewer-css2d-layer').forEach((el) => el.remove());

        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

        if (thisRunId !== initRunIdRef.current) return;

        const width = container.clientWidth || 400;
        const height = Math.max(container.clientHeight, 240);

        scene = new THREE.Scene();
        scene.background = null;

        camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
        camera.position.set(8, 2.5, 8);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Soft lighting so paint colors read true, not washed out
        const ambient = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambient);

        const hemi = new THREE.HemisphereLight(0xe8ecf0, 0x404060, 0.9);
        scene.add(hemi);

        const key = new THREE.DirectionalLight(0xffffff, 1.4);
        key.position.set(10, 8, 10);
        scene.add(key);

        const fill = new THREE.DirectionalLight(0xffffff, 1.0);
        fill.position.set(-8, 5, 8);
        scene.add(fill);

        const front = new THREE.DirectionalLight(0xffffff, 1.0);
        front.position.set(6, 4, 12);
        scene.add(front);

        const rim = new THREE.DirectionalLight(0xffffff, 0.9);
        rim.position.set(-6, 4, -10);
        scene.add(rim);

        const top = new THREE.DirectionalLight(0xffffff, 1.5);
        top.position.set(0, 14, 0);
        scene.add(top);

        const bottom = new THREE.DirectionalLight(0xffffff, 0.6);
        bottom.position.set(0, -8, 4);
        scene.add(bottom);

        const sideL = new THREE.DirectionalLight(0xffffff, 0.75);
        sideL.position.set(-12, 3, 0);
        scene.add(sideL);

        const sideR = new THREE.DirectionalLight(0xffffff, 0.75);
        sideR.position.set(12, 3, 0);
        scene.add(sideR);

        const loader = new GLTFLoader();
        const gltf = await new Promise<{ scene: import('three').Object3D }>((resolve, reject) => {
          loader.load(MODEL_URL, resolve as (gltf: unknown) => void, undefined, reject);
        });

        if (!mountedRef.current || thisRunId !== initRunIdRef.current) return;

        model = gltf.scene;
        model.rotation.y = Math.PI / 2;
        model.scale.setScalar(1.1);
        scene.add(model);
        modelRef.current = model;

        // Compute world bounding box so we can place markers and center the view on the car
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const boxMin = box.min;
        const boxMax = box.max;
        const sx = boxMax.x - boxMin.x;
        const sy = boxMax.y - boxMin.y;
        const sz = boxMax.z - boxMin.z;

        const boxCenter = new THREE.Vector3();
        box.getCenter(boxCenter);

        // Soft spotlights for shape, not washing out paint
        const spotDist = 12;
        const spotIntensity = 2.5;
        const spotAngle = Math.PI / 6;
        const spot1 = new THREE.SpotLight(0xffffff, spotIntensity, spotDist * 2, spotAngle, 0.3, 1);
        spot1.position.set(boxCenter.x + spotDist, boxCenter.y + 6, boxCenter.z + spotDist);
        spot1.target.position.copy(boxCenter);
        scene.add(spot1);
        scene.add(spot1.target);
        const spot2 = new THREE.SpotLight(0xffffff, spotIntensity * 0.9, spotDist * 2, spotAngle, 0.3, 1);
        spot2.position.set(boxCenter.x - spotDist * 0.8, boxCenter.y + 5, boxCenter.z + spotDist);
        spot2.target.position.copy(boxCenter);
        scene.add(spot2);
        scene.add(spot2.target);
        const spot3 = new THREE.SpotLight(0xffffff, spotIntensity * 0.7, spotDist * 2, spotAngle, 0.3, 1);
        spot3.position.set(boxCenter.x + spotDist * 0.6, boxCenter.y + 8, boxCenter.z - spotDist);
        spot3.target.position.copy(boxCenter);
        scene.add(spot3);
        scene.add(spot3.target);
        const spot4 = new THREE.SpotLight(0xffffff, spotIntensity * 0.6, spotDist * 1.5, spotAngle, 0.3, 1);
        spot4.position.set(boxCenter.x, boxCenter.y + spotDist, boxCenter.z);
        spot4.target.position.copy(boxCenter);
        scene.add(spot4);
        scene.add(spot4.target);
        const topSpot = new THREE.SpotLight(0xffffff, 3.5, spotDist * 2, Math.PI / 5, 0.2, 1);
        topSpot.position.set(boxCenter.x, boxCenter.y + 14, boxCenter.z);
        topSpot.target.position.copy(boxCenter);
        scene.add(topSpot);
        scene.add(topSpot.target);

        const annotationWorldPositions: [number, number, number][] = ANNOTATION_DEFS.map((a) => [
          boxMin.x + a.ratio[0] * sx,
          boxMin.y + a.ratio[1] * sy,
          boxMin.z + a.ratio[2] * sz,
        ]);

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.minDistance = 1.5;
        orbit.maxDistance = 18;
        orbit.target.copy(boxCenter);
        camera.position.copy(boxCenter).add(new THREE.Vector3(8, 2.5, 8));
        camera.lookAt(boxCenter);
        orbit.minPolarAngle = Math.PI / 8;
        orbit.maxPolarAngle = Math.PI / 2;
        controls = orbit;

        // Remove any previous CSS2D layer only (no separate “static” number divs — we only use 3D labels)
        document.querySelectorAll('.vehicle-viewer-css2d-layer').forEach((el) => el.remove());
        document.querySelectorAll('.vehicle-annotation-marker').forEach((el) => el.remove());

        // 3D labels only: numbers live in scene space and move with the car when you orbit
        const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer.js');
        css2DRenderer = new CSS2DRenderer();
        css2DRenderer.setSize(width, height);
        const css2dEl = css2DRenderer.domElement as HTMLDivElement;
        css2dEl.className = 'vehicle-viewer-css2d-layer';
        css2dEl.style.position = 'absolute';
        css2dEl.style.top = '0';
        css2dEl.style.left = '0';
        css2dEl.style.pointerEvents = 'none'; // hidden until first frame so no “static” flash at 0,0
        container.appendChild(css2dEl);
        labelObjects = [];
        ANNOTATION_DEFS.forEach((ann, i) => {
          const div = document.createElement('div');
          div.className = 'vehicle-annotation-marker';
          div.textContent = ann.label;
          div.setAttribute('data-annotation-id', String(ann.id));
          div.style.cssText = `
            box-sizing:border-box; width:28px; height:28px; margin-left:-14px; margin-top:-14px;
            padding:0; border-radius:50%; background:rgba(0,0,0,0.55); color:#fff;
            font-size:14px; font-weight:700; line-height:28px; text-align:center;
            box-shadow:0 2px 8px rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.2);
            user-select:none; transition:background 0.15s, transform 0.15s;
            pointer-events:auto; cursor:pointer;
          `;
          div.addEventListener('click', (e) => {
            e.stopPropagation();
            zoomToAnnotation(ann.id);
            setSelectedAnnotationIdRef.current(ann.id);
          });
          div.addEventListener('mouseenter', () => {
            div.style.background = 'rgba(0,0,0,0.75)';
            div.style.transform = 'scale(1.1)';
          });
          div.addEventListener('mouseleave', () => {
            div.style.background = 'rgba(0,0,0,0.55)';
            div.style.transform = 'scale(1)';
          });
          const label = new CSS2DObject(div);
          const pos = annotationWorldPositions[i];
          label.position.set(pos[0], pos[1], pos[2]);
          scene.add(label);
          labelObjects.push(label);
        });

        // Zoom animation state
        let zoomProgress = 1;
        let zoomFromCamera = new THREE.Vector3();
        let zoomFromTarget = new THREE.Vector3();
        let zoomToCamera = new THREE.Vector3();
        let zoomToTarget = new THREE.Vector3();

        function zoomToAnnotation(annotationId: number) {
          const idx = ANNOTATION_DEFS.findIndex((a) => a.id === annotationId);
          if (idx < 0) return;
          const pos = annotationWorldPositions[idx];
          const targetPoint = new THREE.Vector3(pos[0], pos[1], pos[2]);
          zoomFromCamera.copy(camera!.position);
          zoomFromTarget.copy(orbit.target);
          zoomToTarget.copy(targetPoint);
          const ann = ANNOTATION_DEFS[idx];
          const dir = new THREE.Vector3(ann.cameraDir[0], ann.cameraDir[1], ann.cameraDir[2]).normalize();
          zoomToCamera.copy(targetPoint).add(dir.multiplyScalar(ann.zoomDistance));
          zoomProgress = 0;
        }

        const animate = () => {
          if (!mountedRef.current) return;
          animationId = requestAnimationFrame(animate);

          const dt = 0.016;
          if (zoomProgress < 1) {
            zoomProgress = Math.min(1, zoomProgress + dt / ZOOM_DURATION);
            const t = 1 - Math.pow(1 - zoomProgress, 2);
            camera!.position.lerpVectors(zoomFromCamera, zoomToCamera, t);
            orbit.target.lerpVectors(zoomFromTarget, zoomToTarget, t);
          }

          orbit.update();
          renderer!.render(scene!, camera!);
          if (css2DRenderer) {
            const w = container.clientWidth || width;
            const h = Math.max(container.clientHeight, 240);
            css2DRenderer.setSize(w, h);
            css2DRenderer.render(scene!, camera!);
          }
        };
        animate();

        if (mountedRef.current) setStatus('ready');
      } catch (err) {
        console.error('3D viewer error:', err);
        if (mountedRef.current) setStatus('error');
      }
    };

    init();

    return () => {
      mountedRef.current = false;
      if (animationId) cancelAnimationFrame(animationId);
      labelObjects?.forEach((obj) => scene?.remove(obj));
      container?.querySelectorAll('.vehicle-viewer-css2d-layer').forEach((el) => el.remove());
      if (controls?.dispose) controls.dispose();
      if (model && scene) scene.remove(model);
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  // Apply selected paint color only to chassis/body (exterior), not interior
  useEffect(() => {
    const model = modelRef.current;
    if (!model || status !== 'ready') return;
    import('three').then((THREE) => {
      const hex = selectedColor.hex.replace('#', '0x');
      const color = new THREE.Color(Number(hex));
      const bodyKeywords = /paint|body|chassis|exterior|hood|bonnet|door|fender|bumper|roof|panel|wing|spoiler|quarter|trunk|mirror_cap|mirror_housing/i;
      const skipKeywords = /interior|seat|leather|dashboard|steering|glass|window|tire|tyre|wheel|rim|brake|caliper|light|lamp|lens|headlight|taillight|engine|headliner|trim|plastic/i;
      const isChassis = (name: string) => name && bodyKeywords.test(name) && !skipKeywords.test(name);
      model.traverse((child: import('three').Object3D) => {
        const mesh = child as import('three').Mesh;
        if (!mesh.isMesh || !mesh.material) return;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((mat: import('three').Material) => {
          if (!('color' in mat) || !mat.color) return;
          const matName = (mat as { name?: string }).name || '';
          if (isChassis(mesh.name || '') || isChassis(matName)) {
            (mat as import('three').MeshStandardMaterial).color.copy(color);
          }
        });
      });
    });
  }, [selectedColor, status]);

  return (
    <div
      ref={containerRef}
      className={`${className ?? ''} bg-white/10 dark:bg-black/10 backdrop-blur-xl`.trim()}
      style={{
        position: 'relative',
        minHeight: 240,
        height: '100%',
        width: '100%',
      }}
    >
      {status === 'ready' && showOverlays && (
        <div
          className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Vehicle color"
        >
          <span className="text-xs font-medium text-muted-foreground dark:text-white/70 mr-1">Color</span>
          {VEHICLE_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setSelectedColor(c)}
              title={c.name}
              className={`w-7 h-7 rounded-full border-2 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${selectedColor.hex === c.hex
                  ? 'border-foreground dark:border-white ring-2 ring-foreground/30 dark:ring-white/30 scale-110'
                  : 'border-white/50 dark:border-white/30 hover:border-white/80 dark:hover:border-white/50'
                }`}
              style={{ backgroundColor: c.swatchHex ?? c.hex }}
              aria-label={c.name}
              aria-pressed={selectedColor.hex === c.hex}
            />
          ))}
        </div>
      )}
      {status === 'loading' && (
        <div
          className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
        >
          Loading 3D model…
        </div>
      )}
      {status === 'error' && (
        <div
          className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
        >
          Could not load 3D model. Check console.
        </div>
      )}
      {status === 'ready' && showOverlays && selectedAnnotationId !== null && (() => {
        const ann = ANNOTATION_DEFS.find((a) => a.id === selectedAnnotationId);
        return ann ? (
          <div
            className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-sm z-10 rounded-xl border border-border dark:border-white/20 bg-background/95 dark:bg-black/90 backdrop-blur-sm shadow-lg p-4"
            role="region"
            aria-label="Annotation details"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground dark:text-white">
                  {ann.id}.  {ann.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnnotationId(null)}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : null;
      })()}
    </div>
  );
}
