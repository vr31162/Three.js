import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// === Skena ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe8cf); // sfondi i gjelbër si bar

// === Kamera ===
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(10, 8, 14);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// === Dritat ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 15, 5);
dirLight.castShadow = true;
scene.add(dirLight);

// === Toka (bari) ===
const grassGeo = new THREE.PlaneGeometry(40, 40);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x9acd66 });
const grass = new THREE.Mesh(grassGeo, grassMat);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
scene.add(grass);

// === Rruga (asfalt) ===
const roadGeo = new THREE.PlaneGeometry(30, 4);
const roadMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a }); // ngjyrë e zezë
const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.01, 0);
road.receiveShadow = true;
scene.add(road);

// === Funksion për ndërtesa ===
function createBuilding(x, z, w, h, d, color, materialType) {
  let mat;
  if (materialType === 'phong') {
    mat = new THREE.MeshPhongMaterial({ color });
  } else if (materialType === 'standard') {
    mat = new THREE.MeshStandardMaterial({ color });
  } else {
    mat = new THREE.MeshLambertMaterial({ color });
  }

  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, h / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

// === Ndërtesat (3 me ngjyrat dhe madhësitë e reja) ===

// Ndërtesa 1 - Blu e hapur
createBuilding(-6, 5, 4, 2, 3, 0x87cefa, 'standard'); // left (blu e hapur)

// Ndërtesa 2 - Blu e hapur (pak më e gjatë)
createBuilding(0, 5, 4, 3, 3, 0x87cefa, 'phong'); // center (blu e hapur, më e gjatë)

// Ndërtesa 3 - E bardhë
createBuilding(6, 5, 4, 2, 3, 0xffffff, 'lambert'); // right (e bardhë)

// === Orbit Controls ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;

// === Animacioni ===
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
