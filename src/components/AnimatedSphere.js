import React from 'react';
import {Sphere, MeshDistortMaterial} from "@react-three/drei";

const AnimatedSphere = () => {
    return (
        <Sphere visible args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial
            color="#8352FD"
            attach="material"
            distort={0.4}
            speed={1}
            roughness={1}
            />
        </Sphere>
    );
};

export default AnimatedSphere;