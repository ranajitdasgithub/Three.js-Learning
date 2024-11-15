import * as THREE from "three";
import Globe from "three-globe";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("globe-container").appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 350;

// Add light to the scene
const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-800, 2000, 400);
scene.add(directionalLight);

// Create the globe
const globe = new Globe()
  .globeImageUrl("./files/earth-blue-marble.jpg")
  .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

// Add the globe to the scene
scene.add(globe);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.002; // Rotate the globe for an animation effect
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
