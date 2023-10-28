import React, {Suspense} from 'react';
import {observer} from "mobx-react-lite";
import ThreeBackground from "../../components/ThreeBackground";
import './MainScreen.css'
import {OrbitControls} from "@react-three/drei";
import ConverterFactory from "../../components/Factory";
import {Canvas, useFrame} from "@react-three/fiber";

import { easing } from "maath"
import Converter from "../../components/Converter";

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(state.camera.position, [4 + state.mouse.x / 4, 2.1 + state.mouse.y / 4, 3], 0.5, delta)
    })
}

const MainScreen = observer(() => {
    return (
        <div className='container'>
            <div className="rectangle">
                <Converter/>
            </div>
            {/*Сцена*/}
            <Canvas  camera={{position: [4, 2.1, 3], fov: 28}}>
                <OrbitControls enableRotate={false} enableZoom={false}/>
                <group position={[-1, -2.3, -3]}>
                    <Suspense fallback={null}>
                        <ConverterFactory/>
                    </Suspense>
                </group>
                {/*<axesHelper args={[1]} /> /!* Отображение осей координат (красная - X, зеленая - Y, синяя - Z) *!/*/}
                <Rig/>
            </Canvas>
            {/*Сцена*/}


        </div>
    );
});
export default MainScreen;