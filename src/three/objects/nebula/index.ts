import { BufferGeometry, Points, PointsMaterial, BufferAttribute, Color, AdditiveBlending } from "three";
import { scene } from "../../core/scene";
import gsap from "gsap";

const PARTICLE_COUNT = 2500;

let points: Points | null = null;
let geometry: BufferGeometry | null = null;
let material: PointsMaterial | null = null;

const init = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  const palette = [
    new Color("#6366f1"),
    new Color("#8b5cf6"),
    new Color("#06b6d4"),
    new Color("#a855f7"),
    new Color("#3b82f6"),
    new Color("#4f46e5"),
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 3 + Math.random() * 18;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.5;

    positions[i * 3] = Math.cos(theta) * Math.cos(phi) * radius;
    positions[i * 3 + 1] = Math.sin(phi) * radius * 0.4 + Math.random() * 2;
    positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * radius - 8;

    const col = palette[Math.floor(Math.random() * palette.length)]!;
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    sizes[i] = 0.03 + Math.random() * 0.12;
  }

  geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("size", new BufferAttribute(sizes, 1));

  material = new PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  points = new Points(geometry, material);
  points.position.set(0, 0, 0);
  scene.instance.add(points);

  gsap.ticker.add(tick);
};

const tick = () => {
  if (!points) return;
  points.rotation.y += 0.00015;
  points.rotation.x = Math.sin(gsap.ticker.time * 0.02) * 0.02;
};

const destroy = () => {
  gsap.ticker.remove(tick);
  if (points) {
    scene.instance.remove(points);
    geometry?.dispose();
    material?.dispose();
    points = null;
    geometry = null;
    material = null;
  }
};

export const nebula = { init, destroy };
