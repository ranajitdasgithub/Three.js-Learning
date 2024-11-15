import * as THREE from "./node_modules/three/build/three.module.js";
import Globe from "./node_modules/three-globe/dist/three-globe.min.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 350;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Initialize Globe
const globe = new Globe()
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
  .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
  .backgroundColor("#000")
  .pointAltitude(0.03)
  .pointRadius(0.5);

// Add the globe to the scene
scene.add(globe);

// Define Delhi and Bengaluru locations
const locations = [
  { lat: 28.6139, lng: 77.209, city: "Delhi", color: "red" }, // Delhi
  { lat: 12.9716, lng: 77.5946, city: "Bengaluru", color: "blue" }, // Bengaluru
];

// Add markers for locations
globe
  .pointsData(locations)
  .pointColor(() => "color")
  .pointLabel((d) => `${d.city}`)
  .pointAltitude(0.05);

// Create the flight path
const flightPath = {
  startLat: 28.6139,
  startLng: 77.209,
  endLat: 12.9716,
  endLng: 77.5946,
};
globe
  .arcsData([flightPath])
  .arcColor(() => ["red", "blue"])
  .arcDashLength(0.4)
  .arcDashGap(2)
  .arcDashInitialGap(() => Math.random())
  .arcDashAnimateTime(1000);

// Lighting
const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0, 1, 0).normalize();
scene.add(directionalLight);

// Render and animate the globe
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
