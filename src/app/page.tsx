'use client';

import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initCamera, initLight, initRenderer, initScene } from "@/engine/init";
import { initPlanets, updatePlanetsPosition } from "@/engine/planets";
import { objects, TypeObjectData } from "@/engine/planets_data";
import Image from "next/image";
import icon from "@/assets/icon.png";

var _scene: THREE.Scene | null = null;
var _planets: any[] = [];
var isPlay = false;
var lastObjectSelected: any = null;

export default function Home() {

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [carregados, setCarregados] = useState(0);
  const [currentObject, setCurrentObject] = useState<TypeObjectData | null | undefined>(null);



  async function _initScene() {
    if (!sceneRef.current) return;

    //Iniciar cena
    const scene = initScene();
    _scene = scene;

    // Iniciar camera
    const camera = initCamera(scene);

    // Iniciar Luz
    initLight(scene);

    //Criando Rendezidor anti-aliasing
    const renderer = initRenderer(sceneRef.current);


    //Eixos de ajuda
    const axis = new THREE.AxesHelper(2);
    scene.add(axis);

    // Para controlar navegação no espaço
    const controls = new OrbitControls(camera, renderer.domElement);

    sceneRef.current.appendChild(renderer.domElement);

    // Raycast 
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();


    // Função para detectar clique
    function onClick(event: any) {
      if (sceneRef.current) {
        const rect = sceneRef.current.getBoundingClientRect();

        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        mouse.x = mouseX;
        mouse.y = mouseY;


        raycaster.setFromCamera(mouse, camera);

        const _objects = _planets.map((_plan) => {
          return _plan.object;
        })


        const intersects = raycaster.intersectObjects(_objects);

        // Verifica se houve uma interseção
        if (intersects.length > 0) {
          const clickedObject: any = intersects[0].object;

          if (lastObjectSelected) {

            if (lastObjectSelected.name == clickedObject.name) {
              lastObjectSelected.material.color.set(0xffffff);
              lastObjectSelected = null;
              setCurrentObject(null);
              return;
            }
            lastObjectSelected.material.color.set(0xffffff);

          }

          setCurrentObject(objects.find((_obj: TypeObjectData) => {
            if (_obj.name == clickedObject.name) {
              return true;
            }
            return false;
          }));
          clickedObject.material.color.set(0x505050);

          const targetPosition = new THREE.Vector3();
          clickedObject.getWorldPosition(targetPosition);

          camera.position.set(
            targetPosition.x,
            targetPosition.y,
            targetPosition.z + 80
          );

          // Opcionalmente, fazer a câmera olhar para o objeto
          camera.lookAt(targetPosition);

          lastObjectSelected = clickedObject;


          //clickedObject.material.color.set(0xff0000); 
        }

      }


    }

    // Adiciona o evento de clique
    sceneRef.current.addEventListener('click', onClick);

    //Objectos 
    initPlanets(scene, setCarregados).then((_plas) => {
      _planets = _plas;
    });
    let startTime: any = null;
    function animate(timestamp: any) {
      if (!startTime) {
        startTime = timestamp;
      }

      requestAnimationFrame(animate);
      updatePlanetsPosition(_planets, (timestamp - startTime) * 0.0005);

      controls.update();
      renderer.render(scene, camera);

    }

    animate(0);

  }

  useEffect(() => {
    if (sceneRef.current && _scene == null) {
      // Para inicar a cena
      _initScene();
    }
  }, [sceneRef]);

  useEffect(() => {
    document.body.onclick = () => {

      return;
      if (isPlay) return;
      const audio = new Audio("/sounds/bg.mp3")
      audio.loop = true;
      audio.play();
      isPlay = true;
    }
  }, []);
  return (
    <div className="bg-black
     w-full h-screen text-white px-10 py-12
     flex flex-col relative">
      {
        Math.round((carregados / objects.length) * 100) != 100 &&
        <div className="bg-zinc-950 absolute top-0 left-0
        w-full h-full flex justify-center items-center  z-10">
          <div>

            <div className="flex items-center gap-3 select-none mb-4 flex-col">
              <Image className=" brightness-0 invert" width={120} src={icon} alt='' />

              <h1 className="font-bold text-2xl text-center"> Orrery</h1>
            </div>

            <div className=" animate-bounce text-zinc-400 text-center">Loading...</div>
            <div className="w-[200px] bg-[#303030] h-1  rounded-xl mt-4  overflow-hidden ">
              <div style={{
                width: `${Math.round((carregados / objects.length) * 100)}%`

              }} className="bg-[#1d74ff] h-full"></div>
            </div>
            <p className="text-end text-xs mt-2">
              {Math.round((carregados / objects.length) * 100)}%
            </p>

          </div>
        </div>
      }

      <div className="flex items-center mb-4">
        <div className="flex items-center gap-3 select-none">
          <Image className=" brightness-0 invert" width={80} src={icon} alt='' />

          <h1 className="font-bold text-xl"> Orrery</h1>
        </div>
        {/**
        <div className="bg-zinc-900 ml-auto
          rounded-lg px-2 py-1">{Math.round((carregados / objects.length) * 100)}% carregado</div> */}
      </div>
      <div className="flex gap-2 h-full">
        <div className="bg-zinc-950 h-full rounded-xl
          border border-[#292929] w-full
           overflow-hidden"
          ref={sceneRef}>

        </div>

        <div className="bg-[#181818]
        border border-zinc-800 h-full rounded-xl
         w-[350px] px-3 py-2">
          {
            currentObject && (

              <>
                <p className="font-bold text-xl pb-2 border-b border-zinc-900 border-solid">  {currentObject.name}</p>
                <div className="mt-4 text-xs">{currentObject.description}</div>
                <div className="grid grid-cols-2 mt-6 gap-2 ">
                  <div className="text-center text-sm bg-zinc-800 px-2 py-1 rounded-lg
                      shadow-md">
                    <p className="text-zinc-500 uppercase select-none">Distance</p>
                    <p className="text-xs">{(currentObject.distance * 149600000).toLocaleString('en')} km</p>
                  </div>

                  <div className="text-center text-sm bg-zinc-800 px-2 py-1 rounded-lg
                      shadow-md">
                    <p className="text-zinc-500 uppercase select-none">Diameter</p>
                    <p className="text-xs">~{(currentObject.scale * 12742).toLocaleString('en')} km</p>
                  </div>

                  <div className="text-center text-sm bg-zinc-800 px-2 py-1 rounded-lg
                      shadow-md col-span-2">
                    <p className="text-zinc-500 uppercase select-none">Mass</p>
                    <p className="text-xs">~{(currentObject.mass * 1.989).toLocaleString('en')}  quintillion tons</p>
                  </div>
                </div>
              </>
            )
          }

        </div>
      </div>
    </div>


  );
}
