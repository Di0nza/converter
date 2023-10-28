import React from 'react';
import re from '../fonts/square-deal.ttf'
export default function Box(){
    return <mesh rotation ={[90,0,20]}>
        <boxGeometry attach ="geometry" args={[3,3,3]}/>
        <meshNormalMaterial attach="material" />
    </mesh>
};