import React, {useRef, useEffect} from 'react';
import {useGLTF, useAnimations} from '@react-three/drei';
import {useThree} from "@react-three/fiber";

/**3Д МОДЕЛЬ*/
const ConverterFactory = (props) => {
    const group = useRef()
    const {nodes, materials, animations} = useGLTF('/factory.gltf')
    const {actions, names} = useAnimations(animations, group)

    const {viewport} = useThree();
    const isTablet = window.innerWidth <= 1100;
    const responsiveRatio = isTablet ? Math.max(0.5, Math.min(1.1 * viewport.width / 6, 1.1)) : viewport.width / 6;

    const {camera} = useThree();
    //const cam = isTablet ? camera.position.set(0,0,0) : camera.position.set(4, 2.1, 3);


    useEffect(() => {
        actions[names].reset().fadeIn(0.5).play();
    }, []);

    return (
        <group
            position={[
                isTablet ? -1 : -1 * responsiveRatio,
                isTablet ? -2 : -2.3 * responsiveRatio,
                isTablet ? -0.7 : -3 * responsiveRatio
            ]}
            scale={[1.1 * responsiveRatio, 1.1 * responsiveRatio, 1.1 * responsiveRatio]}>
            <group ref={group} {...props} dispose={null}>
                <group name="Sketchfab_Scene">
                    <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.015}>
                        <group name="04c4dfbx" rotation={[Math.PI / 2, 0, 0]}>
                            <group name="Object_2">
                                <group name="RootNode">
                                    <group name="charecter_1"
                                           position={[-66.25, 81.076, 72.5]} scale={[1, 0.981, 1]}>
                                        <mesh name="charecter_1_Rez01palette_0"
                                              geometry={nodes.charecter_1_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group position={[23.75, 50.025, -105.227]}>
                                        <pointLight intensity={15 * responsiveRatio} color={0xFFD700}
                                                    distance={4.5 * responsiveRatio}/>
                                    </group>
                                    <group name="BTC01_4"
                                           position={[23.75, 50.025, -100.227]}>
                                        <pointLight intensity={4 * responsiveRatio} color={0xFFD700}
                                                    distance={2.5 * responsiveRatio}/>
                                        <mesh name="BTC01_4_Rez01palette_0"
                                              geometry={nodes.BTC01_4_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>

                                    </group>
                                    <group name="BTC01_3"
                                           position={[23.75, 50.025, -100.227]}>
                                        <pointLight intensity={4 * responsiveRatio} color={0xFFD700}
                                                    distance={2.5 * responsiveRatio}/>
                                        <mesh name="BTC01_3_Rez01palette_0"
                                              geometry={nodes.BTC01_3_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="BTC01_2"
                                           position={[23.75, 50.025, -100.227]}>
                                        <pointLight intensity={4 * responsiveRatio} color={0xFFD700}
                                                    distance={2.5 * responsiveRatio}/>
                                        <mesh name="BTC01_2_Rez01palette_0"
                                              geometry={nodes.BTC01_2_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="BTC01"
                                           position={[23.75, 50.025, -100.227]}>
                                        <pointLight intensity={4 * responsiveRatio} color={0xFFD700}
                                                    distance={2.5 * responsiveRatio}/>
                                        <mesh name="BTC01_Rez01palette_0"
                                              geometry={nodes.BTC01_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="BTC00"
                                           position={[25.429, 50.025, 6.403]}>
                                        <pointLight intensity={4 * responsiveRatio} color={0xFFD700}
                                                    distance={2.5 * responsiveRatio}/>
                                        <mesh name="BTC00_Rez01palette_0"
                                              geometry={nodes.BTC00_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="BTC0"
                                           position={[26.25, 35, 46.25]}>
                                        <pointLight intensity={4 * responsiveRatio} color={0xFFD700}
                                                    distance={2.5 * responsiveRatio}/>
                                        <mesh name="BTC0_Rez01palette_0"
                                              geometry={nodes.BTC0_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="roll01"
                                           position={[-108.75, 53.75, -96.25]}>
                                        <mesh name="roll01_Rez01palette_0"
                                              geometry={nodes.roll01_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="roll02"
                                           position={[-88.75, 53.75, -96.25]}>

                                        <mesh name="roll02_Rez01palette_0"
                                              geometry={nodes.roll02_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="Interior_new">
                                        <mesh name="Interior_new_Rez01palette_0"
                                              geometry={nodes.Interior_new_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="polySurface30">

                                        <mesh name="polySurface30_Rez01palette_0"
                                              geometry={nodes.polySurface30_Rez01palette_0.geometry}
                                              material={materials.Rez01palette}/>
                                    </group>
                                    <group name="Null_4" position={[0, 0, -7.4]}>
                                        <group name="money_drop02"
                                               position={[-126.81, 67.506, -92.5]}
                                               rotation={[0, 0, Math.PI / 2]}>
                                            <mesh name="money_drop02_Rez01palette_0"
                                                  geometry={nodes.money_drop02_Rez01palette_0.geometry}
                                                  material={materials.Rez01palette}/>
                                        </group>
                                    </group>
                                    <group name="Null_2" position={[0, 0, -7.4]}>
                                        <group name="money_drop02_2"
                                               position={[-90.982, 65.089, -92.5]}
                                               rotation={[0, 0, Math.PI / 2]}>

                                            <mesh name="money_drop02_2_Rez01palette_0"
                                                  geometry={nodes.money_drop02_2_Rez01palette_0.geometry}
                                                  material={materials.Rez01palette}/>
                                        </group>
                                    </group>
                                    <group name="Null_3"
                                           position={[0, 0, -7.4]}>
                                        <group name="money_drop02_3"
                                               position={[-53.173, 62.498, -92.5]}
                                               rotation={[0, 0, Math.PI / 2]}>
                                            <mesh name="money_drop02_3_Rez01palette_0"
                                                  geometry={nodes.money_drop02_3_Rez01palette_0.geometry}
                                                  material={materials.Rez01palette}/>
                                        </group>
                                    </group>
                                    <group name="Null_1"
                                           position={[0, 0, -7.4]}>
                                        <group name="money_drop02_4"
                                               position={[-15.797, 62.498, -92.5]}
                                               rotation={[0, 0, Math.PI / 2]}>
                                            <mesh name="money_drop02_4_Rez01palette_0"
                                                  geometry={nodes.money_drop02_4_Rez01palette_0.geometry}
                                                  material={materials.Rez01palette}/>
                                        </group>
                                    </group>
                                    <group name="Null">
                                        <group name="money_drop01"
                                               position={[-165.836, 129.574, -92.5]}
                                               rotation={[0, 0, -2.531]}>
                                            <mesh name="money_drop01_Rez01palette_0"
                                                  geometry={nodes.money_drop01_Rez01palette_0.geometry}
                                                  material={materials.Rez01palette}/>
                                        </group>
                                    </group>
                                    <group position={[-165.836, 129.574, -92.5]}>
                                        <pointLight intensity={3 * responsiveRatio} color={0x00FF00}
                                                    distance={0.7 * responsiveRatio}/>
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

export default ConverterFactory;

useGLTF.preload('/factory.gltf')
