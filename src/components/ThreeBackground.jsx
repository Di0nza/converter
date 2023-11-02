import React, {Suspense} from 'react';
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import ConverterFactory from './Factory'
import './componentStyles.css'
import {OrbitControls} from "@react-three/drei";
import {easing} from "maath"

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(state.camera.position, [4 + state.mouse.x / 4, 2.1 + state.mouse.y / 4, 3], 0.5, delta)
    })
}

const ThreeBackground = () => {


    return (
        <Canvas camera={{position: [4, 2.1, 3], fov: 28}}>
            <OrbitControls enableRotate={false} enableZoom={false}/>
            <Suspense fallback={null}>
                <ConverterFactory/>
            </Suspense>
            {/*<axesHelper args={[1]} /> /!* Отображение осей координат (красная - X, зеленая - Y, синяя - Z) *!/*/}
            <Rig/>
        </Canvas>
    );
};

export default ThreeBackground;