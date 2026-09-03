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
    new THREE.SphereGeometry(0.72, 24, 16),
    new THREE.MeshStandardMaterial({ color: [0x75e0c1, 0xf6c453, 0xff8f70][index] }),
  );
  object.position.x = x;
  scene.add(object);
  return object;
});
scene.add(new THREE.HemisphereLight(0xffffff, 0x302050, 2));
const light = new THREE.PointLight(0xffffff, 20, 12);
light.position.set(0, 2, 4);
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
  const selected = raycaster.intersectObjects(objects)[0]?.object;
  if (selected) {
    gsap.fromTo(selected.scale, { x: 1.35, y: 1.35, z: 1.35 }, { x: 1, y: 1, z: 1, duration: 0.65, ease: 'elastic.out(1, 0.35)' });
    selected.material.emissive.set(0x442211);
    gsap.to(selected.material.emissive, { r: 0, g: 0, b: 0, duration: 0.7 });
  }
});
resize();
function animate() {
  objects.forEach((object, index) => { object.rotation.y += 0.01 + index * 0.003; });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
