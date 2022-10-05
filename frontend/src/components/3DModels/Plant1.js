import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Plant1(props) {
  const { nodes, materials } = useGLTF("/plant1.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={0.01}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.potTall_aglaonema_phong1_0.geometry}
              material={materials.phong1}
            >
              
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.potTall_aglaonema_phong2_0.geometry}
              material={materials.phong2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.potTall_aglaonema_phong4_0.geometry}
              material={materials.phong4}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/plant1.glb");