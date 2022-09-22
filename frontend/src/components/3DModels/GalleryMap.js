import React, { useRef, useState } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export function GalleryMap(props) {
  const { nodes, materials } = useGLTF("/GalleryMap.glb");
  const [onPoint, setOnPoint] = useState(false);
  const togglePoint = (value) => {
    setOnPoint(value);
  };

  if (onPoint) {
  }

  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={45.15}
        position={[33.45, 12.76, 0.41]}
        rotation={[-2.67, 1.53, 2.67]}
      />
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={37.25}
        position={[113.34, 13.74, -17.37]}
        rotation={[-3.05, 0, -Math.PI]}
      />
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={69.35}
        position={[84.53, 17.12, -58.43]}
        rotation={[-0.22, 1.46, 0.22]}
      />
      <group position={[71.39, 0, -55.33]}>
        <mesh
          geometry={nodes.Line001_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line001_2.geometry}
          material={materials["Material #25"]}
        />
        <mesh
          geometry={nodes.Line001_3.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          geometry={nodes.Line001_4.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[71.39, 0, -55.33]}>
        <mesh
          geometry={nodes.Plane001_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Plane001_2.geometry}
          material={materials["Material #25"]}
        />
        <mesh
          geometry={nodes.Plane001_3.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          geometry={nodes.Plane001_4.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[16.28, 0, -73.36]}>
        <mesh
          geometry={nodes.Line003_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line003_2.geometry}
          material={materials["Material #25"]}
        />
      </group>
      <group position={[53.36, 0, 15.03]}>
        <mesh
          geometry={nodes.Line004_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line004_2.geometry}
          material={materials["Material #27"]}
        />
        <mesh
          geometry={nodes.Line004_3.geometry}
          material={materials["Material #25"]}
        />
      </group>
      <group position={[141.75, 0, -37.3]}>
        <mesh
          geometry={nodes.Line005_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line005_2.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          geometry={nodes.Line005_3.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[89.43, 0, -110.45]}>
        <mesh
          geometry={nodes.Line006_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line006_2.geometry}
          material={materials["Material #26"]}
        />
      </group>
      <group position={[0.91, 0, -55.33]}>
        <mesh
          geometry={nodes.Box001_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Box001_2.geometry}
          material={materials["Material #25"]}
        />
      </group>
      <group position={[157.12, -0.1, -55.33]}>
        <mesh
          geometry={nodes.Box002_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Box002_2.geometry}
          material={materials["Material #26"]}
        />
      </group>
      <mesh
        geometry={nodes.Box003.geometry}
        material={materials["Material #24"]}
        position={[71.39, 0, -126.45]}
      />
      <group position={[71.39, 0, 31.03]}>
        <mesh
          geometry={nodes.Box004_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Box004_2.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[71.39, 0, -55.33]}>
        <mesh
          geometry={nodes.Line007_1.geometry}
          material={materials["Material #25"]}
        />
        <mesh
          geometry={nodes.Line007_2.geometry}
          material={materials["Material #27"]}
        />
        <mesh
          geometry={nodes.Line007_3.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          geometry={nodes.Line007_4.geometry}
          material={materials["Material #24"]}
        />
      </group>
      <mesh
        geometry={nodes.Line008.geometry}
        material={materials["Material #24"]}
        position={[29.48, 0, -117.94]}
      />
      <group position={[149.25, 0, -97.24]}>
        <mesh
          geometry={nodes.Line009_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line009_2.geometry}
          material={materials["Material #26"]}
        />
      </group>
      <group position={[128.54, 0, 22.52]}>
        <mesh
          geometry={nodes.Line010_1.geometry}
          material={materials["Material #24"]}
        />
        {/* target */}
        <mesh
          // onClick={(e) => {
          //   console.log("click");
          // }}
          // onPointerEnter={(e) => {
          //   togglePoint(true);
          //   console.log("onPoint");
          // }}
          // onPointerLeave={(e) => {
          //   togglePoint(false);
          //   console.log("leavePoint");
          // }}
          geometry={nodes.Line010_2.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[8.78, 0, 1.82]}>
        <mesh
          geometry={nodes.Line011_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          geometry={nodes.Line011_2.geometry}
          material={materials["Material #25"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/GalleryMap.glb");
