import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Book(props) {
  const { nodes, materials } = useGLTF("/book.glb");
  const [hovered, setHover] = useState(false);
  return (
    <group
      onClick={props.toggleOpen}
      position={[49, 13.7, -54.6]}
      rotation={[0, -Math.PI / 4, 0]}
      dispose={null}
      scale={0.03}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, 11.53]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Book_Texture-base_0"].geometry}
                material={materials["Texture-base"]}
                scale={hovered ? 1.3 : 1}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/book.glb");
