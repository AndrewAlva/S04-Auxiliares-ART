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
const object = new THREE.Mesh(
  new THREE.OctahedronGeometry(1.2),
  new THREE.MeshStandardMaterial({ color: 0x75e0c1, flatShading: true }),
);
scene.add(object, new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const light = new THREE.PointLight(0xffffff, 18, 12);
light.position.set(2, 3, 4);
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
container.addEventListener('click', () => {
  raycaster.setFromCamera(pointer, camera);
  if (raycaster.intersectObject(object).length) {
    gsap.timeline().to(object.scale, { x: 1.7, y: 1.7, z: 1.7, duration: 0.2 }).to(object.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    gsap.to(object.rotation, { y: object.rotation.y + Math.PI * 2, duration: 1.1, ease: 'power3.out' });
  }
});
resize();
function animate() {
  object.rotation.x += 0.006;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
