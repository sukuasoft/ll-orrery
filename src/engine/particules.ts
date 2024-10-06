import * as THREE from 'three';
import { scaleMultiplier } from './planets';


export function generateParticules(scene: THREE.Scene) {

    const particleCount = 40000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);


    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = ((Math.random() * 2 - 1) * 2000) + 30;
        positions[i * 3 + 1] = 1;
        positions[i * 3 + 2] = ((Math.random() * 2 - 1) * 2000) + 30;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff, // Cor das partículas
        size: 0.2, // Tamanho de cada partícula
        transparent: true, // Para permitir a transparência
        opacity: 1 // Nível de opacidade
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    return particleSystem;
}

export function animateParticules(particleSystem: THREE.Points) {
return;
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] = ((Math.random() * 2 - 1) * 2000) + 30;
        positions[i + 1] = 1;
        positions[i  + 2] = ((Math.random() * 2 - 1) * 2000) + 30;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true; 
}