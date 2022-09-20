import React, { useRef, useMemo } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useBox, useConvexPolyhedron } from "@react-three/cannon";
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
  const line1_1 = useMemo(
    () => toConvexProps(nodes.Line001_1.geometry),
    [nodes]
  );
  const line1_2 = useMemo(
    () => toConvexProps(nodes.Line001_2.geometry),
    [nodes]
  );
  const line1_3 = useMemo(
    () => toConvexProps(nodes.Line001_3.geometry),
    [nodes]
  );
  const line1_4 = useMemo(
    () => toConvexProps(nodes.Line001_4.geometry),
    [nodes]
  );
  const line2_1 = useMemo(
    () => toConvexProps(nodes.Line002_1.geometry),
    [nodes]
  );
  const line2_2 = useMemo(
    () => toConvexProps(nodes.Line002_2.geometry),
    [nodes]
  );
  const line2_3 = useMemo(
    () => toConvexProps(nodes.Line002_3.geometry),
    [nodes]
  );
  const line2_4 = useMemo(
    () => toConvexProps(nodes.Line002_4.geometry),
    [nodes]
  );
  const line3_1 = useMemo(
    () => toConvexProps(nodes.Line003_1.geometry),
    [nodes]
  );
  const line3_2 = useMemo(
    () => toConvexProps(nodes.Line003_2.geometry),
    [nodes]
  );

  return (
    <group {...props} dispose={null}>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line1_1,
              position: [71.39, 0, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line001_1.geometry}
            material={materials["Material #24"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line1_2,
              position: [71.39, 0, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line001_2.geometry}
            material={materials["Material #25"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line1_3,
              position: [71.39, 0, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line001_3.geometry}
            material={materials["Material #26"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line1_4,
              position: [71.39, 0, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line001_4.geometry}
            material={materials["Material #27"]}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line2_1,
              position: [71.39, -20.32, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line002_1.geometry}
            material={materials["Material #24"]}
          >
            {/* <planeGeometry /> */}
            {/* <meshStandardMaterial /> */}
          </mesh>
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line2_2,
              position: [71.39, -20.32, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line002_2.geometry}
            material={materials["Material #25"]}
          ></mesh>
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line2_3,
              position: [71.39, -20.32, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line002_3.geometry}
            material={materials["Material #26"]}
          ></mesh>
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line2_4,
              position: [71.39, -20.32, -55.33],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line002_4.geometry}
            material={materials["Material #27"]}
          ></mesh>
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line3_1,
              position: [16.28, 0, -73.36],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line003_1.geometry}
            material={materials["Material #24"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: line3_2,
              position: [16.28, 0, -73.36],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Line003_2.geometry}
            material={materials["Material #25"]}
          />
        </group>
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
