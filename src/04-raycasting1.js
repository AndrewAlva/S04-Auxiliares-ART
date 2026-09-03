import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 7;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
container.appendChild(renderer.domElement);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const objects = [-1.8, 0, 1.8].map((x, index) => {
  const object = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 1.15, 1.15),
    new THREE.MeshStandardMaterial({ color: [0xf6c453, 0x75e0c1, 0xff8f70][index] }),
  );
  object.position.x = x;
  scene.add(object);
  return object;
});
scene.add(new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(3, 4, 5);
scene.add(light);
function resize() {
  const { width, height } = container.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
function updatePointer(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
}
window.addEventListener('resize', resize);
container.addEventListener('pointermove', updatePointer);
resize();
function animate() {
  raycaster.setFromCamera(pointer, camera);
  const hovered = raycaster.intersectObjects(objects)[0]?.object;
  objects.forEach((object) => {
    const target = object === hovered ? 1.2 : 1;
    object.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
    object.rotation.y += object === hovered ? 0.025 : 0.008;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
gsap.to(light, { intensity: 4, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
animate();
