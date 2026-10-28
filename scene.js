import * as THREE from "three";

// Canvas sits behind everything (styled by #bg3d in styles.css)
const canvas = document.createElement("canvas");
canvas.id = "bg3d";
document.body.prepend(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.z = 8;

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const blueLight = new THREE.PointLight(0x3d5afe, 60, 30);
blueLight.position.set(-5, 4, 6);
const amberLight = new THREE.PointLight(0xffb347, 50, 30);
amberLight.position.set(6, -3, 5);
scene.add(blueLight, amberLight);

// Hero object: metallic torus knot + wireframe shell
const hero = new THREE.Group();
const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.4, 0.45, 220, 32),
  new THREE.MeshStandardMaterial({ color: 0x4a3262, metalness: 0.85, roughness: 0.22 })
);
const shell = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.4, 0.62, 120, 16),
  new THREE.MeshBasicMaterial({ color: 0xffb347, wireframe: true, transparent: true, opacity: 0.25 })
);
hero.add(knot, shell);
scene.add(hero);

// Particle field
const COUNT = 900;
const positions = new Float32Array(COUNT * 3);
for (let i = 0; i < COUNT; i++) {
  const r = 6 + Math.random() * 12;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi) - 6;
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const stars = new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({ color: 0x3d5afe, size: 0.05, transparent: true, opacity: 0.8 })
);
scene.add(stars);

// Responsive layout: knot sits right on desktop, top-centre on phones
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (w > 800) { hero.position.set(3.4, 0.2, 0); hero.scale.setScalar(1); }
  else         { hero.position.set(0, 2.6, -1);  hero.scale.setScalar(0.6); }
}
window.addEventListener("resize", resize);
resize();

// Mouse and scroll input
const mouse = { x: 0, y: 0 };
window.addEventListener("pointermove", (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  const scroll = window.scrollY * 0.002;

  hero.rotation.x = t * 0.25 + mouse.y * 0.5 + scroll;
  hero.rotation.y = t * 0.35 + mouse.x * 0.7 + scroll * 1.5;
  shell.rotation.y = -t * 0.2;
  hero.position.y += ((window.innerWidth > 800 ? 0.2 : 2.6) + Math.sin(t) * 0.15 - hero.position.y) * 0.05;

  stars.rotation.y = t * 0.02 + scroll * 0.5;

  // Gentle camera parallax
  camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
  camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  if (!reduceMotion) requestAnimationFrame(animate);
}

animate();