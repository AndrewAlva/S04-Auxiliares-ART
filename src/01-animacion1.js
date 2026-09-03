import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 6;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
container.appendChild(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0xf6c453, roughness: 0.35 }),
);
scene.add(cube);
scene.add(new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const keyLight = new THREE.DirectionalLight(0xff8f70, 3);
keyLight.position.set(2, 3, 4);
scene.add(keyLight);

function resize() {
  const { width, height } = container.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
resize();

function animate() {
  cube.position.x += 0.018;
  if (cube.position.x > 3.2) cube.position.x = -3.2;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
gsap.to(cube.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
animate();
