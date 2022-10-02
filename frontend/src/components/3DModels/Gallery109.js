import React, { useRef, useMemo } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Geometry } from "three-stdlib";
import { useConvexPolyhedron } from "@react-three/cannon";

function toConvexProps(bufferGeometry) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
}

export default function Model(props) {
  const { nodes, materials } = useGLTF("/Gallery109.glb");

  const MoveFloor_1 = useMemo(
    () => toConvexProps(nodes.MoveFloor_1.geometry),
    [nodes]
  );
  const MoveFloor_2 = useMemo(
    () => toConvexProps(nodes.MoveFloor_2.geometry),
    [nodes]
  );
  const MoveFloor_3 = useMemo(
    () => toConvexProps(nodes.MoveFloor_3.geometry),
    [nodes]
  );
  const MoveFloor_4 = useMemo(
    () => toConvexProps(nodes.MoveFloor_4.geometry),
    [nodes]
  );

  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={73.74}
        position={[39.11, 17.5, -200.7]}
        rotation={[2.53, 0.51, -2.81]}
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
          material={materials["Material #25"]}
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
        geometry={nodes.SkyGlass1.geometry}
        material={materials["Material #559"]}
        position={[32.98, 40.64, -251.96]}
        rotation={[0, -1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sky.geometry}
        material={nodes.Sky.material}
        position={[134.58, 0, -137.61]}
        rotation={[0, -1.57, 0]}
        scale={3.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SkyGlass2.geometry}
        material={materials["Material #559"]}
        position={[247.61, 40.64, -236.72]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SkyGlass3.geometry}
        material={materials["Material #559"]}
        position={[232.37, 40.64, -23.25]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RoomGlass1.geometry}
        material={materials["Material #559"]}
        position={[32.98, 39.69, -150.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RoomGlass003.geometry}
        material={materials["Material #559"]}
        position={[232.37, 39.69, -124.27]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RoomGlass004.geometry}
        material={materials["Material #559"]}
        position={[130.29, 39.69, -38.49]}
        rotation={[0, -1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RoomGlass005.geometry}
        material={materials["Material #559"]}
        position={[146.01, 39.69, -236.72]}
        rotation={[0, 1.57, 0]}
      />
      <group position={[138.43, 0, -137.44]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterWall_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterWall_2.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterWall_3.geometry}
          material={materials.Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterWall_4.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NorthBorder.geometry}
        material={materials["Material #476"]}
        position={[133.99, 0, -284.85]}
      />
      <group position={[133.99, 0, -12.97]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthBorder_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthBorder_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[278, 0, -163.98]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EastBorder_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EastBorder_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[-74.95, 0, -137.2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestBorder_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestBorder_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[170.39, 0, -255.06]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NorthWall_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NorthWall_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[250.7, 0, -100.01]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EastWall_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EastWall_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[106.38, 0, -24.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthWall_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthWall_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[18.94, 0, -150.36]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestWall_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestWall_2.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WestWall_3.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[32.98, 25.4, -84.32]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling01_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling01_2.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling01_3.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[32.98, 30.48, -216.4]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling02_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling02_2.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling02_3.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[79.97, 30.48, -236.72]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03_2.geometry}
          material={materials.Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03_3.geometry}
          material={materials.Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03_4.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[212.05, 30.48, -236.72]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling04_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling04_2.geometry}
          material={materials.Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling04_3.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[232.37, 30.48, -189.73]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling05_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling05_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[232.37, 30.48, -58.81]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling06_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling06_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[185.38, 30.48, -38.49]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling07_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling07_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <group position={[79.97, 30.48, -38.49]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling08_1.geometry}
          material={materials.Dark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling08_2.geometry}
          material={materials["Material #476"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainEnter01.geometry}
        material={materials["Material #476"]}
        position={[33.12, 14.25, -69.08]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainEnter02.geometry}
        material={materials["Material #476"]}
        position={[32.97, 14.73, -68.07]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room2Ceil.geometry}
        material={materials["Material #476"]}
        position={[32.98, 38.1, -251.96]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room4Ceil.geometry}
        material={materials["Material #476"]}
        position={[247.61, 38.1, -236.72]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room6Ceil.geometry}
        material={materials["Material #476"]}
        position={[232.37, 38.1, -23.25]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room1Ceil.geometry}
        material={materials["Material #476"]}
        position={[33.95, 38.1, -150.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room7Ceil.geometry}
        material={materials["Material #476"]}
        position={[146.01, 38.1, -38.49]}
        rotation={[0, 1.57, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room1Ceil001.geometry}
        material={materials["Material #476"]}
        position={[233.34, 38.1, -124.27]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Room1Ceil002.geometry}
        material={materials["Material #476"]}
        position={[146.01, 38.1, -237.7]}
        rotation={[0, 1.57, 0]}
      />
    </group>
  );
}

useGLTF.preload("/Gallery109.glb");
