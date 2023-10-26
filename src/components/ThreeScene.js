import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ThreeScene = () => {
    const sceneContainer = useRef(null);

    useEffect(() => {
        // Создайте сцену, камеру и рендерер
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneContainer.current.appendChild(renderer.domElement);

        // Загрузите модель из Blender
        const loader = new GLTFLoader();
        let model;

        loader.load('D:\\Documents\\dima_dollar.glb', (glb) => {
            model = glb.scene;
            scene.add(model);

            // Определите функцию анимации
            function animate() {
                requestAnimationFrame(animate);

                // Ваш код анимации или вращения модели здесь, если необходимо.

                renderer.render(scene, camera);
            }

            // Настройте камеру
            camera.position.z = 5;

            animate(); // Начните анимацию после загрузки модели.
        });
    }, []);

    return (
        <div ref={sceneContainer} />
    );
};

export default ThreeScene;
