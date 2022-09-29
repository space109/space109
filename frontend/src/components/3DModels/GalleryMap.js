import React, { useMemo, useRef, useState } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Geometry } from "three-stdlib";
import { useConvexPolyhedron } from "@react-three/cannon";

function toConvexProps(bufferGeometry) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
}

export default function GalleryMap(props) {
  const { nodes, materials } = useGLTF("/GalleryMap.glb");
  const [onPoint, setOnPoint] = useState(false);
  const togglePoint = (value) => {
    setOnPoint(value);
  };

  if (onPoint) {
  }

  const CenterWall_1 = useMemo(
    () => toConvexProps(nodes.CenterWall_1.geometry),
    [nodes]
  );
  const CenterWall_2 = useMemo(
    () => toConvexProps(nodes.CenterWall_2.geometry),
    [nodes]
  );
  const CenterWall_3 = useMemo(
    () => toConvexProps(nodes.CenterWall_3.geometry),
    [nodes]
  );
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
  const NorthBorder_1 = useMemo(
    () => toConvexProps(nodes.NorthBorder_1.geometry),
    [nodes]
  );
  const NorthBorder_2 = useMemo(
    () => toConvexProps(nodes.NorthBorder_2.geometry),
    [nodes]
  );
  const NorthBorder_3 = useMemo(
    () => toConvexProps(nodes.NorthBorder_3.geometry),
    [nodes]
  );
  const SouthBorder = useMemo(
    () => toConvexProps(nodes.SouthBorder.geometry),
    [nodes]
  );
  const EastBorder_1 = useMemo(
    () => toConvexProps(nodes.EastBorder_1.geometry),
    [nodes]
  );
  const EastBorder_2 = useMemo(
    () => toConvexProps(nodes.EastBorder_2.geometry),
    [nodes]
  );
  const WestBorder_1 = useMemo(
    () => toConvexProps(nodes.WestBorder_1.geometry),
    [nodes]
  );
  const WestBorder_2 = useMemo(
    () => toConvexProps(nodes.WestBorder_2.geometry),
    [nodes]
  );
  const NorthWall_1 = useMemo(
    () => toConvexProps(nodes.NorthWall_1.geometry),
    [nodes]
  );
  const NorthWall_2 = useMemo(
    () => toConvexProps(nodes.NorthWall_2.geometry),
    [nodes]
  );
  const NorthWall_3 = useMemo(
    () => toConvexProps(nodes.NorthWall_3.geometry),
    [nodes]
  );
  const EastWall_1 = useMemo(
    () => toConvexProps(nodes.EastWall_1.geometry),
    [nodes]
  );
  const EastWall_2 = useMemo(
    () => toConvexProps(nodes.EastWall_2.geometry),
    [nodes]
  );
  const WestWall_1 = useMemo(
    () => toConvexProps(nodes.WestWall_1.geometry),
    [nodes]
  );
  const WestWall_2 = useMemo(
    () => toConvexProps(nodes.WestWall_2.geometry),
    [nodes]
  );
  const Ceiling01_1 = useMemo(
    () => toConvexProps(nodes.Ceiling01_1.geometry),
    [nodes]
  );
  const Ceiling01_2 = useMemo(
    () => toConvexProps(nodes.Ceiling01_2.geometry),
    [nodes]
  );
  const Ceiling02_1 = useMemo(
    () => toConvexProps(nodes.Ceiling02_1.geometry),
    [nodes]
  );
  const Ceiling02_2 = useMemo(
    () => toConvexProps(nodes.Ceiling02_2.geometry),
    [nodes]
  );
  const Ceiling03_1 = useMemo(
    () => toConvexProps(nodes.Ceiling03_1.geometry),
    [nodes]
  );
  const Ceiling03_2 = useMemo(
    () => toConvexProps(nodes.Ceiling03_2.geometry),
    [nodes]
  );
  const Ceiling03_3 = useMemo(
    () => toConvexProps(nodes.Ceiling03_3.geometry),
    [nodes]
  );
  const Ceiling04_1 = useMemo(
    () => toConvexProps(nodes.Ceiling04_1.geometry),
    [nodes]
  );
  const Ceiling04_2 = useMemo(
    () => toConvexProps(nodes.Ceiling04_2.geometry),
    [nodes]
  );
  const Ceiling05_1 = useMemo(
    () => toConvexProps(nodes.Ceiling05_1.geometry),
    [nodes]
  );
  const Ceiling05_2 = useMemo(
    () => toConvexProps(nodes.Ceiling05_2.geometry),
    [nodes]
  );
  const Ceiling06 = useMemo(
    () => toConvexProps(nodes.Ceiling06.geometry),
    [nodes]
  );
  const Ceiling07 = useMemo(
    () => toConvexProps(nodes.Ceiling07.geometry),
    [nodes]
  );
  const Ceiling08 = useMemo(
    () => toConvexProps(nodes.Ceiling08.geometry),
    [nodes]
  );
  const MainEnter01 = useMemo(
    () => toConvexProps(nodes.MainEnter01.geometry),
    [nodes]
  );
  const MainEnter02 = useMemo(
    () => toConvexProps(nodes.MainEnter02.geometry),
    [nodes]
  );
  const EnterLogo = useMemo(
    () => toConvexProps(nodes.EnterLogo.geometry),
    [nodes]
  );
  const Plane001_1 = useMemo(
    () => toConvexProps(nodes.Plane001_1.geometry),
    [nodes]
  );
  const Plane001_2 = useMemo(
    () => toConvexProps(nodes.Plane001_2.geometry),
    [nodes]
  );
  const Plane001_3 = useMemo(
    () => toConvexProps(nodes.Plane001_3.geometry),
    [nodes]
  );
  const Plane001_4 = useMemo(
    () => toConvexProps(nodes.Plane001_4.geometry),
    [nodes]
  );
  const SouthWall = useMemo(
    () => toConvexProps(nodes.SouthWall.geometry),
    [nodes]
  );

  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={73.74}
        position={[32.98, 14.48, -34.11]}
        rotation={[0.15, -0.01, 0]}
      />
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: CenterWall_1,
              position: [136.48, 0, -137.44],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.CenterWall_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: CenterWall_2,
              position: [136.48, 0, -137.44],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.CenterWall_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: CenterWall_3,
              position: [136.48, 0, -137.44],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.CenterWall_3.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: MoveFloor_1,
              position: [135.85, 0, -138.69],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.MoveFloor_1.geometry}
            material={materials.Grey}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: MoveFloor_2,
              position: [135.85, 0, -138.69],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.MoveFloor_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: MoveFloor_3,
              position: [135.85, 0, -138.69],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.MoveFloor_3.geometry}
            material={materials.Dark}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: NorthBorder_1,
              position: [133.99, 0, -284.85],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.NorthBorder_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: NorthBorder_2,
              position: [133.99, 0, -284.85],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.NorthBorder_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: NorthBorder_3,
              position: [133.99, 0, -284.85],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.NorthBorder_3.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SouthBorder,
            position: [133.99, 0, -12.97],
          }))[0]
        }
      >
        <mesh geometry={nodes.SouthBorder.geometry} material={materials.Dark} />
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: EastBorder_1,
              position: [278, 0, -163.98],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.EastBorder_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: EastBorder_2,
              position: [278, 0, -163.98],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.EastBorder_2.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: WestBorder_1,
              position: [-74.95, 0, -137.2],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.WestBorder_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: WestBorder_2,
              position: [-74.95, 0, -137.2],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.WestBorder_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: NorthWall_1,
              position: [170.39, 0, -255.06],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.NorthWall_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: NorthWall_2,
              position: [170.39, 0, -255.06],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.NorthWall_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: NorthWall_3,
              position: [170.39, 0, -255.06],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.NorthWall_3.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: EastWall_1,
              position: [250.7, 0, -100.01],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.EastWall_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: EastWall_2,
              position: [250.7, 0, -100.01],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.EastWall_2.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SouthWall,
            position: [106.38, 0, -24.5],
          }))[0]
        }
      >
        <mesh geometry={nodes.SouthWall.geometry} material={materials.Dark} />
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: WestWall_1,
              position: [18.94, 0, -150.36],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.WestWall_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: WestWall_2,
              position: [18.94, 0, -150.36],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.WestWall_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling01_1,
              position: [32.98, 25.4, -84.32],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling01_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling01_2,
              position: [32.98, 25.4, -84.32],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling01_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling02_1,
              position: [32.98, 30.48, -216.4],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling02_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling02_2,
              position: [32.98, 30.48, -216.4],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling02_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling03_1,
              position: [79.97, 30.48, -236.72],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling03_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling03_2,
              position: [79.97, 30.48, -236.72],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling03_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling03_3,
              position: [79.97, 30.48, -236.72],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling03_3.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling04_1,
              position: [212.05, 30.48, -236.72],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling04_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling04_2,
              position: [212.05, 30.48, -236.72],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling04_2.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling05_1,
              position: [232.37, 30.48, -189.73],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling05_1.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling05_2,
              position: [232.37, 30.48, -189.73],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Ceiling05_2.geometry}
            material={materials.Grey}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling06,
            position: [232.37, 30.48, -58.81],
          }))[0]
        }
      >
        <mesh geometry={nodes.Ceiling06.geometry} material={materials.Dark} />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling07,
            position: [185.38, 30.48, -38.49],
          }))[0]
        }
      >
        <mesh geometry={nodes.Ceiling07.geometry} material={materials.Dark} />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling08,
            position: [79.97, 30.48, -38.49],
          }))[0]
        }
      >
        <mesh geometry={nodes.Ceiling08.geometry} material={materials.Dark} />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: MainEnter01,
            position: [33.12, 14.25, -69.08],
          }))[0]
        }
      >
        <mesh
          geometry={nodes.MainEnter01.geometry}
          material={materials.Dark}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: MainEnter02,
            position: [32.97, 14.73, -68.07],
          }))[0]
        }
      >
        <mesh
          geometry={nodes.MainEnter02.geometry}
          material={materials.Dark}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: EnterLogo,
            position: [32.98, 34.54, -69.08],
          }))[0]
        }
      >
        {/* <LightHelper position={[20, 5, -55]} angle={0.1} /> */}
        <mesh
          geometry={nodes.EnterLogo.geometry}
          material={materials.Light}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_1,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_1.geometry}
            material={materials["Material #408"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_2,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_3,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_3.geometry}
            material={materials.Grey}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_4,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_4.geometry}
            material={materials.Dark}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_1,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_1.geometry}
            material={materials["Material #408"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_2,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_2.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_3,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_3.geometry}
            material={materials.Grey}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Plane001_4,
              position: [134.58, 0, -137.61],
            }))[0]
          }
        >
          <mesh
            geometry={nodes.Plane001_4.geometry}
            material={materials.Dark}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/GalleryMap.glb");
