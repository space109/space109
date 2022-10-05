import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Owl(props) {
  const { nodes, materials } = useGLTF("/owl.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
            <group rotation={[Math.PI / 2, 0, 0]} />
          </group>
          <skinnedMesh
            geometry={nodes.Object_9.geometry}
            material={materials.material_3}
            skeleton={nodes.Object_9.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_8.geometry}
            material={materials.FEET1}
            skeleton={nodes.Object_8.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_6.geometry}
            material={materials.material}
            skeleton={nodes.Object_6.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_7.geometry}
            material={materials.lambert2}
            skeleton={nodes.Object_7.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/owl.glb");
