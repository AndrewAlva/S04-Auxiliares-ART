import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 7;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
container.appendChild(renderer.domElement);
const object = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 96, 16),
  new THREE.MeshStandardMaterial({ color: 0xf6c453, metalness: 0.35, roughness: 0.25 }),
);
scene.add(object, new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const light = new THREE.PointLight(0xff8f70, 20, 15);
light.position.set(3, 2, 4);
scene.add(light);
function resize() {
  const { width, height } = container.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
resize();
gsap.timeline({ repeat: -1, yoyo: true })
  .to(object.rotation, { x: Math.PI * 2, y: Math.PI, duration: 3, ease: 'power2.inOut' })
  .to(object.position, { y: 1, duration: 1.2, ease: 'power2.out' }, '<')
  .to(object.position, { y: 0, duration: 1.2, ease: 'bounce.out' });
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
