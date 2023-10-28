import React, {Suspense} from 'react';
import {Canvas, useFrame} from "@react-three/fiber";
import Box from "./Box";
import AnimatedSphere from './AnimatedSphere'
import ConverterFactory from './Factory'
import './componentStyles.css'
import {OrbitControls} from "@react-three/drei";
import { easing } from "maath"

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(state.camera.position, [4 + state.mouse.x / 4, 2.1 + state.mouse.y / 4, 3], 0.5, delta)
    })
}


const ThreeBackground = () => {
    return (
        // <Canvas className='canvas'>
        //     <OrbitControls enableZoom={false}/>
        //     <ambientLight intensity={0.5}/>
        //     <directionalLight position={[-2, 5, 2]} intensity={1}/>
        //     <Suspense fallback={null}>
        //         <Box/>
        //     </Suspense>
        // </Canvas>
        <Canvas className='canvas' camera={{position: [4, 2.1, 3], fov: 28}}>
            <OrbitControls enableRotate={false} enableZoom={false}/>
            {/*<ambientLight intensity={0.5}/>*/}
            {/*<directionalLight position={[4, 2.1, 3]} intensity={1} />*/}
            <group position={[-1, -2.3, -3]}>
                <Suspense fallback={null}>
                    <ConverterFactory/>
                </Suspense>
            </group>
            <axesHelper args={[1]} /> {/* Отображение осей координат (красная - X, зеленая - Y, синяя - Z) */}
            <Rig/>
        </Canvas>
    );
};

export default ThreeBackground;