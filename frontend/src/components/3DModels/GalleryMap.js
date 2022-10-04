import React, { useMemo, useRef } from "react";
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
  const SkySkelleton1 = useMemo(
    () => toConvexProps(nodes.SkySkelleton1.geometry),
    [nodes]
  );
  const SkySkelleton2 = useMemo(
    () => toConvexProps(nodes.SkySkelleton2.geometry),
    [nodes]
  );
  const SkySkelleton3 = useMemo(
    () => toConvexProps(nodes.SkySkelleton3.geometry),
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
  const CenterWall_1 = useMemo(
    () => toConvexProps(nodes.CenterWall_1.geometry),
    [nodes]
  );
  const CenterWall_2 = useMemo(
    () => toConvexProps(nodes.CenterWall_2.geometry),
    [nodes]
  );
  const NorthBorder = useMemo(
    () => toConvexProps(nodes.NorthBorder.geometry),
    [nodes]
  );
  const SouthBorder = useMemo(
    () => toConvexProps(nodes.SouthBorder.geometry),
    [nodes]
  );
  const EastBorder = useMemo(
    () => toConvexProps(nodes.EastBorder.geometry),
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
  const NorthWall = useMemo(
    () => toConvexProps(nodes.NorthWall.geometry),
    [nodes]
  );
  const EastWall = useMemo(
    () => toConvexProps(nodes.EastWall.geometry),
    [nodes]
  );
  const SouthWall_1 = useMemo(
    () => toConvexProps(nodes.SouthWall_1.geometry),
    [nodes]
  );
  const SouthWall_2 = useMemo(
    () => toConvexProps(nodes.SouthWall_2.geometry),
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
  const Ceiling02 = useMemo(
    () => toConvexProps(nodes.Ceiling02.geometry),
    [nodes]
  );
  const Ceiling03 = useMemo(
    () => toConvexProps(nodes.Ceiling03.geometry),
    [nodes]
  );
  const Ceiling04 = useMemo(
    () => toConvexProps(nodes.Ceiling04.geometry),
    [nodes]
  );
  const Ceiling05 = useMemo(
    () => toConvexProps(nodes.Ceiling05.geometry),
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
  const Ceiling08_1 = useMemo(
    () => toConvexProps(nodes.Ceiling08_1.geometry),
    [nodes]
  );
  const Ceiling08_2 = useMemo(
    () => toConvexProps(nodes.Ceiling08_2.geometry),
    [nodes]
  );
  const Room2Ceil_1 = useMemo(
    () => toConvexProps(nodes.Room2Ceil_1.geometry),
    [nodes]
  );
  const Room2Ceil_2 = useMemo(
    () => toConvexProps(nodes.Room2Ceil_2.geometry),
    [nodes]
  );
  const Room4Ceil_1 = useMemo(
    () => toConvexProps(nodes.Room4Ceil_1.geometry),
    [nodes]
  );
  const Room4Ceil_2 = useMemo(
    () => toConvexProps(nodes.Room4Ceil_2.geometry),
    [nodes]
  );
  const Room6Ceil_1 = useMemo(
    () => toConvexProps(nodes.Room6Ceil_1.geometry),
    [nodes]
  );
  const Room6Ceil_2 = useMemo(
    () => toConvexProps(nodes.Room6Ceil_2.geometry),
    [nodes]
  );
  const Room1Ceil_1 = useMemo(
    () => toConvexProps(nodes.Room1Ceil_1.geometry),
    [nodes]
  );
  const Room1Ceil_2 = useMemo(
    () => toConvexProps(nodes.Room1Ceil_2.geometry),
    [nodes]
  );
  const Room1Ceil_3 = useMemo(
    () => toConvexProps(nodes.Room1Ceil_3.geometry),
    [nodes]
  );
  const Ceil001 = useMemo(() => toConvexProps(nodes.Ceil001.geometry), [nodes]);
  const Ceil002 = useMemo(() => toConvexProps(nodes.Ceil002.geometry), [nodes]);
  const Ceil003 = useMemo(() => toConvexProps(nodes.Ceil003.geometry), [nodes]);
  const Room1Ceil001_1 = useMemo(
    () => toConvexProps(nodes.Room1Ceil001_1.geometry),
    [nodes]
  );
  const Room1Ceil001_2 = useMemo(
    () => toConvexProps(nodes.Room1Ceil001_2.geometry),
    [nodes]
  );
  const Room1Ceil001_3 = useMemo(
    () => toConvexProps(nodes.Room1Ceil001_3.geometry),
    [nodes]
  );
  const Room1Ceil002_1 = useMemo(
    () => toConvexProps(nodes.Room1Ceil002_1.geometry),
    [nodes]
  );
  const Room1Ceil002_2 = useMemo(
    () => toConvexProps(nodes.Room1Ceil002_2.geometry),
    [nodes]
  );
  const Room1Ceil002_3 = useMemo(
    () => toConvexProps(nodes.Room1Ceil002_3.geometry),
    [nodes]
  );
  const Room1Ceil003_1 = useMemo(
    () => toConvexProps(nodes.Room1Ceil003_1.geometry),
    [nodes]
  );
  const Room1Ceil003_2 = useMemo(
    () => toConvexProps(nodes.Room1Ceil003_2.geometry),
    [nodes]
  );
  const Room1Ceil003_3 = useMemo(
    () => toConvexProps(nodes.Room1Ceil003_3.geometry),
    [nodes]
  );

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
            castShadow
            receiveShadow
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
            castShadow
            receiveShadow
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
            castShadow
            receiveShadow
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
            castShadow
            receiveShadow
            geometry={nodes.Plane001_4.geometry}
            material={materials.Dark}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SkySkelleton1,
            position: [32.98, 53.34, -251.96],
            rotation: [0, 1.57, 0],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SkySkelleton1.geometry}
          material={materials["Material #563"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SkySkelleton2,
            position: [247.61, 53.34, -236.72],
            rotation: [0, 1.57, 0],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SkySkelleton2.geometry}
          material={materials["Material #563"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SkySkelleton3,
            position: [232.37, 53.34, -23.26],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SkySkelleton3.geometry}
          material={materials["Material #563"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: MainEnter01,
            position: [33.12, 14.25, -69.08],
            rotation: [Math.PI / 2, 0, 0],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MainEnter01.geometry}
          material={materials["Grey Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: MainEnter02,
            position: [32.97, 14.73, -68.07],
            rotation: [Math.PI / 2, 0, 0],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MainEnter02.geometry}
          material={materials["Grey Wall Paint"]}
        />
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
            castShadow
            receiveShadow
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
            castShadow
            receiveShadow
            geometry={nodes.MoveFloor_2.geometry}
            material={materials.Floor}
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
            castShadow
            receiveShadow
            geometry={nodes.MoveFloor_3.geometry}
            material={materials.Light}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: MoveFloor_4,
              position: [135.85, 0, -138.69],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.MoveFloor_4.geometry}
            material={materials.Dark}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: CenterWall_1,
              position: [138.43, 0, -137.44],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CenterWall_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: CenterWall_2,
              position: [138.43, 0, -137.44],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CenterWall_2.geometry}
            material={materials["Grey Wall Paint"]}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: NorthBorder,
            position: [133.99, 0, -284.85],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NorthBorder.geometry}
          material={materials["Wall Paint"]}
        />
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthBorder.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: EastBorder,
            position: [278, 0, -163.98],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EastBorder.geometry}
          material={materials["Wall Paint"]}
        />
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
            castShadow
            receiveShadow
            geometry={nodes.WestBorder_1.geometry}
            material={materials["Wall Paint"]}
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
            castShadow
            receiveShadow
            geometry={nodes.WestBorder_2.geometry}
            material={materials["Grey Wall Paint"]}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: NorthWall,
            position: [170.39, 0, -255.06],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NorthWall.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: EastWall,
            position: [250.7, 0, -100.01],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.EastWall.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: SouthWall_1,
              position: [106.38, 0, -24.5],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SouthWall_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: SouthWall_2,
              position: [106.38, 0, -24.5],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SouthWall_2.geometry}
            material={materials["Grey Wall Paint"]}
          />
        </group>
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
            castShadow
            receiveShadow
            geometry={nodes.WestWall_1.geometry}
            material={materials["Wall Paint"]}
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
            castShadow
            receiveShadow
            geometry={nodes.WestWall_2.geometry}
            material={materials["Grey Wall Paint"]}
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
            castShadow
            receiveShadow
            geometry={nodes.Ceiling01_1.geometry}
            material={materials["Wall Paint"]}
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
            castShadow
            receiveShadow
            geometry={nodes.Ceiling01_2.geometry}
            material={materials["Grey Wall Paint"]}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling02,
            position: [32.98, 30.48, -216.4],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling02.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling03,
            position: [79.97, 30.48, -236.72],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling04,
            position: [212.05, 30.48, -236.72],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling04.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling05,
            position: [232.37, 30.48, -189.73],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling05.geometry}
          material={materials["Wall Paint"]}
        />
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling06.geometry}
          material={materials["Wall Paint"]}
        />
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling07.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling08_1,
              position: [79.97, 30.48, -38.49],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ceiling08_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling08_2,
              position: [79.97, 30.48, -38.49],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ceiling08_2.geometry}
            material={materials["Grey Wall Paint"]}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room2Ceil_1,
              position: [32.98, 50.8, -251.96],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room2Ceil_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room2Ceil_2,
              position: [32.98, 50.8, -251.96],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room2Ceil_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room4Ceil_1,
              position: [247.61, 50.8, -236.72],
              rotation: [0, 1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room4Ceil_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room4Ceil_2,
              position: [247.61, 50.8, -236.72],
              rotation: [0, 1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room4Ceil_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room6Ceil_1,
              position: [232.37, 50.8, -23.25],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room6Ceil_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room6Ceil_2,
              position: [232.37, 50.8, -23.25],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room6Ceil_2.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil_1,
              position: [33.95, 38.1, -150.36],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil_2,
              position: [33.95, 38.1, -150.36],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil_2.geometry}
            material={materials.Black}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil_3,
              position: [33.95, 38.1, -150.36],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceil001,
            position: [32.66, 40.64, -253.23],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceil001.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceil002,
            position: [248.88, 40.64, -237.04],
            rotation: [0, -1.57, 0],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceil002.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceil003,
            position: [232.37, 40.64, -24.52],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceil003.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil001_1,
              position: [146.01, 38.1, -235.75],
              rotation: [0, -1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil001_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil001_2,
              position: [146.01, 38.1, -235.75],
              rotation: [0, -1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil001_2.geometry}
            material={materials.Black}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil001_3,
              position: [146.01, 38.1, -235.75],
              rotation: [0, -1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil001_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil002_1,
              position: [232.37, 38.1, -124.27],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil002_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil002_2,
              position: [232.37, 38.1, -124.27],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil002_2.geometry}
            material={materials.Black}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil002_3,
              position: [232.37, 38.1, -124.27],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil002_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil003_1,
              position: [170.14, 38.1, -38.49],
              rotation: [0, 1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil003_1.geometry}
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil003_2,
              position: [170.14, 38.1, -38.49],
              rotation: [0, 1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil003_2.geometry}
            material={materials.Black}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room1Ceil003_3,
              position: [170.14, 38.1, -38.49],
              rotation: [0, 1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room1Ceil003_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/GalleryMap.glb");
