import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#101010');

    return scene;
}

export function initCamera(scene: THREE.Scene) {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 5, 80);
    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    return camera;
}

export function initLight(scene: THREE.Scene) {
    
    const pointLight = new THREE.PointLight(new THREE.Color('#fff'), 10000)
    pointLight.castShadow=true;

    const pointHelper = new THREE.PointLightHelper(pointLight);
    scene.add(pointLight);
    scene.add(pointHelper);
  
    const globalLight = new THREE.DirectionalLight(
        new THREE.Color('#fff'),
        2
    );
    globalLight.position.set(3, 2, 8);
    globalLight.castShadow = true;

    const helper = new THREE.DirectionalLightHelper(globalLight)

    scene.add(globalLight);
    scene.add(helper);
    return globalLight;
}

export function initRenderer(areaScene:any){
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(areaScene.clientWidth, areaScene.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}