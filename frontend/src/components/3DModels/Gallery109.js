import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export default function Gallery109(props) {
  const { nodes, materials } = useGLTF("/Gallery109.glb");
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={73.74}
        position={[42.17, 21.62, -197.79]}
        rotation={[-2.95, 0.59, 3.03]}
      />
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={73.74}
        position={[32.26, 13.1, -230.86]}
        rotation={[0.64, 0.04, -0.03]}
      />
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={73.74}
        position={[105.37, 14.48, -237.2]}
        rotation={[1.46, -1.02, 1.44]}
      />
      <group position={[134.58, 0, -137.61]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_1.geometry}
          material={materials["Material #408"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_2.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_3.geometry}
          material={materials.Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_4.geometry}
          material={materials.Dark}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SkySkelleton1.geometry}
        material={materials["Material #563"]}
        position={[32.98, 53.34, -251.96]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SkySkelleton2.geometry}
        material={materials["Material #563"]}
        position={[247.61, 53.34, -236.72]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SkySkelleton3.geometry}
        material={materials["Material #563"]}
        position={[232.37, 53.34, -23.26]}
      />
      <group position={[135.85, 0, -138.69]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MoveFloor_1.geometry}
          material={materials.Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MoveFloor_2.geometry}
          material={materials.Floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MoveFloor_3.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MoveFloor_4.geometry}
          material={materials.Dark}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainEnter01.geometry}
        material={materials["Grey Wall Paint"]}
        position={[33.12, 14.25, -69.08]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainEnter02.geometry}
        material={materials["Grey Wall Paint"]}
        position={[32.97, 14.73, -68.07]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <group position={[138.43, 0, -137.44]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterWall_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterWall_2.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NorthBorder.geometry}
        material={materials["Wall Paint"]}
        position={[133.99, 0, -284.85]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SouthBorder.geometry}
        material={materials["Wall Paint"]}
        position={[133.99, 0, -12.97]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EastBorder.geometry}
        material={materials["Wall Paint"]}
        position={[278, 0, -163.98]}
      />
      <group position={[-74.95, 0, -137.2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestBorder_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestBorder_2.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NorthWall.geometry}
        material={materials["Wall Paint"]}
        position={[170.39, 0, -255.06]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EastWall.geometry}
        material={materials["Wall Paint"]}
        position={[250.7, 0, -100.01]}
      />
      <group position={[106.38, 0, -24.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthWall_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthWall_2.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <group position={[18.94, 0, -150.36]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestWall_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestWall_2.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <group position={[32.98, 25.4, -84.32]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling01_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling01_2.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceiling02.geometry}
        material={materials["Wall Paint"]}
        position={[32.98, 30.48, -216.4]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceiling03.geometry}
        material={materials["Wall Paint"]}
        position={[79.97, 30.48, -236.72]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceiling04.geometry}
        material={materials["Wall Paint"]}
        position={[212.05, 30.48, -236.72]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceiling05.geometry}
        material={materials["Wall Paint"]}
        position={[232.37, 30.48, -189.73]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceiling06.geometry}
        material={materials["Wall Paint"]}
        position={[232.37, 30.48, -58.81]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceiling07.geometry}
        material={materials["Wall Paint"]}
        position={[185.38, 30.48, -38.49]}
      />
      <group position={[79.97, 30.48, -38.49]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling08_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling08_2.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room2Ceil.geometry}
        material={materials["Wall Paint"]}
        position={[32.98, 50.8, -251.96]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room4Ceil.geometry}
        material={materials["Wall Paint"]}
        position={[247.61, 50.8, -236.72]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room6Ceil.geometry}
        material={materials["Wall Paint"]}
        position={[232.37, 50.8, -23.25]}
      />
      <group position={[33.95, 38.1, -150.36]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil_2.geometry}
          material={materials.Black}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceil001.geometry}
        material={materials["Wall Paint"]}
        position={[32.66, 40.64, -253.23]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceil002.geometry}
        material={materials["Wall Paint"]}
        position={[248.88, 40.64, -237.04]}
        rotation={[0, -1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ceil003.geometry}
        material={materials["Wall Paint"]}
        position={[232.37, 40.64, -24.52]}
      />
      <group position={[146.01, 38.1, -235.75]} rotation={[0, -1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil001_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil001_2.geometry}
          material={materials.Black}
        />
      </group>
      <group position={[232.37, 38.1, -124.27]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil002_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil002_2.geometry}
          material={materials.Black}
        />
      </group>
      <group position={[170.14, 38.1, -38.49]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil003_1.geometry}
          material={materials["Wall Paint"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Room1Ceil003_2.geometry}
          material={materials.Black}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Gallery109.glb");
