'use client';

import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initCamera, initLight, initRenderer, initScene } from "@/engine/init";
import { initPlanets, updatePlanetsPosition } from "@/engine/planets";
import { objects, TypeObjectData } from "@/engine/planets_data";
import Image from "next/image";
import icon from "@/assets/icon.png";
import { animateParticules, generateParticules } from "@/engine/particules";
import Link from "next/link";
import quiz_icon from "@/assets/quiz.png";
import vr_icon from "@/assets/vr.png";
import arrow_back from "@/assets/arrow-back.png";

var _scene: THREE.Scene | null = null;
var _camera: THREE.Camera | null = null;
var __planets:any[] =[];
var isPlay = false;
var lastObjectSelected: any = null;

export default function Home() {

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [carregados, setCarregados] = useState(0);
  const [currentObject, setCurrentObject] = useState<TypeObjectData | null | undefined>(null);
  const  [_planets, _setPlanets] = useState<any[]>([]);

  function deselectLastObject(){
    lastObjectSelected.material.color.set(0xffffff);
    lastObjectSelected = null;
    setCurrentObject(null);
  }


  function selectObject(clickedObject:any){
    console.log(clickedObject);
    if (lastObjectSelected) {

      if (lastObjectSelected.name == clickedObject.name) {
        deselectLastObject();
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

    _camera?.position.set(
      targetPosition.x,
      targetPosition.y + 10,
      targetPosition.z + 80
    );

    // Opcionalmente, fazer a câmera olhar para o objeto
    _camera?.lookAt(targetPosition);

    lastObjectSelected = clickedObject;

  }


  async function _initScene() {
    if (!sceneRef.current) return;

    //Iniciar cena
    const scene = initScene();
    _scene = scene;

    // Iniciar camera
    const camera = initCamera(scene);
    _camera = camera;

    // Iniciar Luz
    initLight(scene);

    // Iniciar particulas
    const particuleSystem = generateParticules(scene);

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

        const _objects = __planets.map((_plan) => {
          return _plan.object;
        })


        const intersects = raycaster.intersectObjects(_objects);

        // Verifica se houve uma interseção
        if (intersects.length > 0) {
          const clickedObject: any = intersects[0].object;
          selectObject(clickedObject);

        }

      }


    }

    // Adiciona o evento de clique
    sceneRef.current.addEventListener('click', onClick);

    //Objectos 
    initPlanets(scene, setCarregados).then((_plas) => {
     _setPlanets(_plas);
     __planets=_plas;
    });
    let startTime: any = null;
    function animate(timestamp: any) {
      if (!startTime) {
        startTime = timestamp;
      }

      requestAnimationFrame(animate);
      updatePlanetsPosition(__planets, (timestamp - startTime) * 0.0005);
      animateParticules(particuleSystem);

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
        <div className="flex gap-2 ml-auto">
          <Link href='https://luandalunar.com/simulacoes'
            className="bg-zinc-900 
          rounded-lg px-4 py-2 items-center gap-2 flex
          active:scale-110" target="_blank">
            <Image src={vr_icon} className="invert" width={24} alt='' />
            VR</Link>

          <Link href='https://luandalunar.com/quiz'
            className="bg-zinc-900
          rounded-lg px-4 py-2 items-center gap-2 flex
          active:scale-110" target="_blank">
            <Image src={quiz_icon} className="invert" width={24} alt='' />
            Quiz</Link>

        </div>

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
            currentObject ? (

              <>
                <div className="flex gap-2 pb-2 border-b border-zinc-800 border-solid">  
                  <Image onClick={deselectLastObject} src={arrow_back} alt='' width={22} className="invert bg-opacity-80
                  cursor-pointer hover:opacity-55
                  active:scale-110"/>
                  <span className="font-bold text-xl">{currentObject.name}</span>
                </div>
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
            ): (
              <div>
                              <p className="font-bold text-xl pb-2 border-b border-zinc-800 border-solid mb-2">Celestial Bodies</p>

<div className="grid grid-cols-2 gap-4 px-4 py-1">
                  
                  {
                    _planets.map(({object, data}:any, index)=>{
                      return (
                        <button onClick={()=>{
                        selectObject(object.children[0]);
                        }} type="button" key={index} className="bg-zinc-800 px-2 py-1 text-center
                        shadow-md rounded-md text-sm">
                            {data.name}
                        </button>
                      )
                    })
                  }
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>


  );
}
