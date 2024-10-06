import { BoxHelper, Color, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, RingGeometry, Scene } from "three";
import { objects, TypeObjectData } from "./planets_data";
import { fbxLoader, textureLoader } from "./loaders";
import { degToRad } from "three/src/math/MathUtils.js";

export const scaleMultiplier = 10 * 8;


export async function initPlanets(scene: Scene, setCarregados: any) {

    //iniciar objects
    let x = 0;
    const _objects = [];
    for (const object of objects) {
        _objects.push(await addPlanet(scene, object));
        x++;
        setCarregados(x);
    }

    return _objects;
}

export async function addPlanet(scene: Scene, data: TypeObjectData) {
    const texture = await textureLoader.loadAsync(data.texture);

    const object = await fbxLoader.loadAsync(data.mesh);
    object.traverse(async (_object: any) => {
        _object.name=data.name;

        if (_object.isMesh) {
            const materialData: any = {
                map: texture, 
              //  emissiveIntensity: 20
            };
            if (data.bump) {
                const bumpTexture = await textureLoader.loadAsync(data.bump);
                materialData.bumpMap = bumpTexture;
            }

            if (data.normal) {
                const normalTexture = await textureLoader.loadAsync(data.normal);
                materialData.normalMap = normalTexture;
            }

            _object.material = new MeshBasicMaterial(materialData);

            return;
            /*

            if (data.name == 'Sun') {
                // Cria um novo material com a textura
                _object.material = new MeshBasicMaterial(materialData);
            }
            else {
                // Cria um novo material com a textura
                _object.material = new MeshStandardMaterial(materialData);
            }
*/
        }
    })

    object.castShadow = true;
    object.receiveShadow = true;

    // object.scale.set(0.01 * data.scale, 0.01 * data.scale, 0.01 * data.scale);
    if (data.name == 'Sun') {
        object.scale.set(0.20, 0.20, 0.20);
    } else {
        object.scale.set(0.10, 0.10, 0.10);

    }
    // object.position.set(data.position.x,1, data.position.y);

    const _z = (data.distance * scaleMultiplier);
    object.position.set(_z, 1, _z);
    /*
    const helper = new BoxHelper(object);
    scene.add(helper)
*/


    const ring = new Mesh(new RingGeometry(_z - 0.5, _z, 32),
        new MeshBasicMaterial({ color: new Color(data.color), side: DoubleSide, 
            
         }));
    ring.rotation.set(degToRad(90), 0, 0);
    scene.add(ring);

    scene.add(object);
    return {
        object: object,
        data: data
    }

}


export function updatePlanetsPosition(planets: any[], time: number) {

    for (const { data, object } of planets) {
        const _z =(data.distance * scaleMultiplier);

        const x = _z * Math.cos(time * data.speedOrbit);
        const y = _z * Math.sin(time * data.speedOrbit);

        let angle = time * data.speedRotation*1000 ;
      
        object.position.set(x, 1, y);
      object.rotation.set(0,  angle,0);
    }

}