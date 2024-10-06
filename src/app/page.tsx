'use client';

import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initCamera, initLight, initRenderer, initScene } from "@/engine/init";
import { initPlanets, updatePlanetsPosition } from "@/engine/planets";
import { objects } from "@/engine/planets_data";
import Image from "next/image";
import icon from "@/assets/icon.png";

var _scene: THREE.Scene | null = null;
var _planets: any[] = [];
var isPlay = false;

export default function Home() {

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [carregados, setCarregados] = useState(0);


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

              <h1 className="font-bold text-2xl text-center"> Orerry</h1>
            </div>

            <div className=" animate-bounce text-zinc-400 text-center">Carregando...</div>
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

          <h1 className="font-bold text-xl"> Orerry</h1>
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

        <div className="border border-[#292929] bg-zinc-950 h-full rounded-xl
         w-[300px]">

        </div>
      </div>
    </div>


  );
}
