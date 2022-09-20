import React, { useRef, useMemo } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useBox, useConvexPolyhedron } from '@react-three/cannon';
import { Geometry } from "three-stdlib";

function toConvexProps(bufferGeometry) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
}

export function GalleryMap(props) {
  const { nodes, materials } = useGLTF("/GalleryMap.glb");
  // const geo1 = useMemo(() => toConvexProps(nodes.Line002_1.geometry), [nodes])
  const geo2 = useMemo(() => toConvexProps(nodes.Line002_2.geometry), [nodes])
  const [ref, api] = useConvexPolyhedron(() => ({mass: 0, position:[ 71.39, -20.32, -55.33], args: geo2 }))
  console.log(geo2)
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={37.25}
        position={[35.47, 12.76, -13.43]}
        rotation={[-1.63, 1.55, 1.63]}
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
        fov={37.25}
        position={[90.55, 14.48, -51.02]}
        rotation={[-0.46, 1.53, 0.46]}
      />
      <group position={[71.39, 0, -55.33]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line001_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line001_2.geometry}
          material={materials["Material #25"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line001_3.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line001_4.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[71.39, -20.32, -55.33]} ref={ref} api={api}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line002_1.geometry}
          material={materials["Material #24"]}
        >
          {/* <planeGeometry /> */}
          {/* <meshStandardMaterial /> */}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line002_2.geometry}
          material={materials["Material #25"]}
        >
          {/* <planeGeometry /> */}
          {/* <meshStandardMaterial /> */}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line002_3.geometry}
          material={materials["Material #26"]}
        >
          {/* <planeGeometry /> */}
          {/* <meshStandardMaterial /> */}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line002_4.geometry}
          material={materials["Material #27"]}
        >
          {/* <planeGeometry /> */}
          {/* <meshStandardMaterial /> */}
        </mesh>
      </group>
      <group position={[16.28, 0, -73.36]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line003_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line003_2.geometry}
          material={materials["Material #25"]}
        />
      </group>
      <group position={[53.36, 0, -0.21]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line004_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line004_2.geometry}
          material={materials["Material #27"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line004_3.geometry}
          material={materials["Material #25"]}
        />
      </group>
      <group position={[126.51, 0, -37.3]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line005_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line005_2.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line005_3.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[89.43, 0, -110.45]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line006_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line006_2.geometry}
          material={materials["Material #26"]}
        />
      </group>
      <group position={[71.39, 0, -55.33]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_2.geometry}
          material={materials["Material #25"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_3.geometry}
          material={materials["Material #26"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_4.geometry}
          material={materials["Material #27"]}
        />
      </group>
      <group position={[0.91, 0, -55.33]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box001_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box001_2.geometry}
          material={materials["Material #25"]}
        />
      </group>
      <group position={[141.88, -0.1, -55.33]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box002_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box002_2.geometry}
          material={materials["Material #26"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box003.geometry}
        material={materials["Material #24"]}
        position={[71.39, 0, -126.45]}
      />
      <group position={[71.39, 0, 15.79]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box004_1.geometry}
          material={materials["Material #24"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Box004_2.geometry}
          material={materials["Material #27"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/GalleryMap.glb");

