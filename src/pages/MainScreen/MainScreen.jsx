import React, {Suspense} from 'react';
import './MainScreen.css'
import {OrbitControls} from "@react-three/drei";
import ConverterFactory from "../../components/Factory";
import {Canvas, useFrame} from "@react-three/fiber";
import { easing } from "maath"
import Converter from "../../components/Converter";
import ConverterTable from "../../components/ConverterTable";
import {Link, useLocation} from "react-router-dom";

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(state.camera.position, [4 + state.mouse.x / 4, 2.1 + state.mouse.y / 4, 3], 0.5, delta)
    })
}

const MainScreen = () => {
    const location = useLocation()
    return (
        <div className='container'>
            <div className="rectangle">
                <div  className='navigation-container'>
                    <Link
                        style={{backgroundColor: location.pathname === '/' ? 'rgba(23, 23, 23, 0.80)' : 'rgba(51, 51, 51, 0.60)'}}
                        className='navigation-btn'
                        to={'/'}
                    >
                        conversion
                    </Link>
                    <Link
                        style={{backgroundColor: location.pathname === '/conversionTable' ? 'rgba(23, 23, 23, 0.80)' : 'rgba(51, 51, 51, 0.60)'}}
                        className='navigation-btn'
                        to={'/conversionTable'}
                    >
                        saved
                    </Link>
                </div>
                {location.pathname === '/' ? (
                    <Converter />
                ) : (
                    <ConverterTable/>
                )}
            </div>
            {/*Сцена*/}
            <Canvas  camera={{position: [4, 2.1, 3], fov: 25}}>
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
};
export default MainScreen;
