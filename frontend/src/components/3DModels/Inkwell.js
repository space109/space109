import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Inkwell(props) {
  const { nodes, materials } = useGLTF("/inkwell.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials["Material.002"]}
          />
          <group
            position={[0.03, 0.15, -0.05]}
            rotation={[Math.PI, -1.05, 1.87]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials["Material.001"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/inkwell.glb");
