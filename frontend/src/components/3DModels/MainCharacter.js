import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function MainCharacter(props) {
  const { nodes, materials } = useGLTF("/isabelle.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.face_face1_0.geometry, [])}
              material={materials.face1}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.right_ear_orange_0.geometry,[])}
              material={materials.orange}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.left_ear_orange_0.geometry,[])}
              material={materials.orange}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.hairtie_red_0.geometry,[])}
              material={materials.material}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.big_bun_hair_0.geometry, [])}
              material={materials.hair}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.small_bun_hair_0.geometry,[])}
              material={materials.hair}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.left_bangs_yellow_0.geometry,[])}
              material={materials.yellow}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.right_bangs_yellow_0.geometry,[])}
              material={materials.yellow}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.left_arm_yellow_0.geometry,[])}
              material={materials.yellow}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.left_sleeve_white_0.geometry,[])}
              material={materials.white}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.right_sleeve_white_0.geometry, [])}
              material={materials.white}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.right_arm_yellow_0.geometry,[])}
              material={materials.yellow}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.top_button_white_buttons_0.geometry,[])}
              material={materials.white_buttons}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.bottom_button_white_buttons_0.geometry,[])}
              material={materials.white_buttons}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.left_collar_white_0.geometry,[])}
              material={materials.white}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.right_collar_white_0.geometry,[])}
              material={materials.white}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.bow1_red_0.geometry,[])}
              material={materials.material}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.body_green_0.geometry,[])}
              material={materials.green}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.body_white_0.geometry,[])}
              material={materials.white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.body_shirt_0.geometry,[])}
              material={materials.shirt}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.skirt_blue_0.geometry,[])}
              material={materials.blue}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.left_leg_yellow_0.geometry,[])}
              material={materials.yellow}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.right_leg_yellow_0.geometry, [])}
              material={materials.yellow}
            />
          </group>
          <group position={[-7.56, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={useMemo(() => nodes.tail_tail1_0.geometry,[])}
              material={materials.tail1}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/isabelle.glb");
