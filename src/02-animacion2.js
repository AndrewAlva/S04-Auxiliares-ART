import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 6;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
container.appendChild(renderer.domElement);
const shape = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.1, 1),
  new THREE.MeshStandardMaterial({ color: 0x75e0c1, flatShading: true }),
);
scene.add(shape, new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const light = new THREE.PointLight(0xff8f70, 18, 12);
light.position.set(2, 2, 3);
scene.add(light);

function resize() {
  const { width, height } = container.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
resize();
const clock = new THREE.Clock();
function animate() {
  const time = clock.getElapsedTime();
  shape.position.y = Math.sin(time * 2) * 0.8;
  shape.position.x = Math.cos(time * 1.2) * 1.7;
  shape.rotation.x = Math.cos(time) * 0.5;
  shape.rotation.y = Math.sin(time * 1.4);
  light.position.x = Math.cos(time) * 3;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
gsap.to(shape.rotation, { z: Math.PI * 2, duration: 5, repeat: -1, ease: 'none' });
animate();
