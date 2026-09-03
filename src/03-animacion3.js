import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 1, 7);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
container.appendChild(renderer.domElement);
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 32, 16),
  new THREE.MeshStandardMaterial({ color: 0xff8f70, roughness: 0.28 }),
);
scene.add(ball, new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const pointer = new THREE.Vector2();
const cursorRay = new THREE.Raycaster();
const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const cursorPosition = new THREE.Vector3(0, 1, 0);
const state = {
  position: new THREE.Vector3(0, 1, 0),
  previous: new THREE.Vector3(0, 1, 0),
};

function updateCursor(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  cursorRay.setFromCamera(pointer, camera);
  cursorRay.ray.intersectPlane(cursorPlane, cursorPosition);
}

function resize() {
  const { width, height } = container.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
container.addEventListener('pointermove', updateCursor);
resize();
function animate() {
  const velocity = state.position.clone().sub(state.previous);
  state.previous.copy(state.position);
  state.position.add(velocity.multiplyScalar(0.86));
  state.position.add(cursorPosition.clone().sub(state.position).multiplyScalar(0.055));
  ball.position.copy(state.position);
  ball.rotation.x += velocity.length() * 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
gsap.to(ball.scale, { x: 1.12, y: 0.9, z: 1.12, duration: 0.18, yoyo: true, repeat: -1, ease: 'sine.inOut' });
animate();
