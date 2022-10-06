import React from "react";
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

  const Plane001_1 = toConvexProps(nodes.Plane001_1.geometry);
  const Plane001_2 = toConvexProps(nodes.Plane001_2.geometry);
  const Plane001_3 = toConvexProps(nodes.Plane001_3.geometry);
  const Plane001_4 = toConvexProps(nodes.Plane001_4.geometry);
  const SkySkelleton1 = toConvexProps(nodes.SkySkelleton1.geometry);
  const SkySkelleton2 = toConvexProps(nodes.SkySkelleton2.geometry);
  const SkySkelleton3 = toConvexProps(nodes.SkySkelleton3.geometry);
  const MainEnter01 = toConvexProps(nodes.MainEnter01.geometry);
  const MainEnter02 = toConvexProps(nodes.MainEnter02.geometry);
  const MoveFloor_1 = toConvexProps(nodes.MoveFloor_1.geometry);
  const MoveFloor_2 = toConvexProps(nodes.MoveFloor_2.geometry);
  const CenterWall_1 = toConvexProps(nodes.CenterWall_1.geometry);
  const CenterWall_2 = toConvexProps(nodes.CenterWall_2.geometry);
  const CenterWall_3 = toConvexProps(nodes.CenterWall_3.geometry);
  const NorthBorder_1 = toConvexProps(nodes.NorthBorder_1.geometry);
  const NorthBorder_2 = toConvexProps(nodes.NorthBorder_2.geometry);
  const SouthBorder_1 = toConvexProps(nodes.SouthBorder_1.geometry);
  const SouthBorder_2 = toConvexProps(nodes.SouthBorder_2.geometry);
  const EastBorder_1 = toConvexProps(nodes.EastBorder_1.geometry);
  const EastBorder_2 = toConvexProps(nodes.EastBorder_2.geometry);
  const WestBorder_1 = toConvexProps(nodes.WestBorder_1.geometry);
  const WestBorder_2 = toConvexProps(nodes.WestBorder_2.geometry);
  const WestBorder_3 = toConvexProps(nodes.WestBorder_3.geometry);
  const NorthWall_1 = toConvexProps(nodes.NorthWall_1.geometry);
  const NorthWall_2 = toConvexProps(nodes.NorthWall_2.geometry);
  const EastWall_1 = toConvexProps(nodes.EastWall_1.geometry);
  const EastWall_2 = toConvexProps(nodes.EastWall_2.geometry);
  const SouthWall_1 = toConvexProps(nodes.SouthWall_1.geometry);
  const SouthWall_2 = toConvexProps(nodes.SouthWall_2.geometry);
  const SouthWall_3 = toConvexProps(nodes.SouthWall_3.geometry);
  const WestWall_1 = toConvexProps(nodes.WestWall_1.geometry);
  const WestWall_2 = toConvexProps(nodes.WestWall_2.geometry);
  const WestWall_3 = toConvexProps(nodes.WestWall_3.geometry);
  const Ceiling01_1 = toConvexProps(nodes.Ceiling01_1.geometry);
  const Ceiling01_2 = toConvexProps(nodes.Ceiling01_2.geometry);
  const Ceiling01_3 = toConvexProps(nodes.Ceiling01_3.geometry);
  const Ceiling02_1 = toConvexProps(nodes.Ceiling02_1.geometry);
  const Ceiling02_2 = toConvexProps(nodes.Ceiling02_2.geometry);
  const Ceiling03_1 = toConvexProps(nodes.Ceiling03_1.geometry);
  const Ceiling03_2 = toConvexProps(nodes.Ceiling03_2.geometry);
  const Ceiling04_1 = toConvexProps(nodes.Ceiling04_1.geometry);
  const Ceiling04_2 = toConvexProps(nodes.Ceiling04_2.geometry);
  const Ceiling05_1 = toConvexProps(nodes.Ceiling05_1.geometry);
  const Ceiling05_2 = toConvexProps(nodes.Ceiling05_2.geometry);
  const Ceiling06_1 = toConvexProps(nodes.Ceiling06_1.geometry);
  const Ceiling06_2 = toConvexProps(nodes.Ceiling06_2.geometry);
  const Ceiling07_1 = toConvexProps(nodes.Ceiling07_1.geometry);
  const Ceiling07_2 = toConvexProps(nodes.Ceiling07_2.geometry);
  const Ceiling08_1 = toConvexProps(nodes.Ceiling08_1.geometry);
  const Ceiling08_2 = toConvexProps(nodes.Ceiling08_2.geometry);
  const Ceiling08_3 = toConvexProps(nodes.Ceiling08_3.geometry);
  const Room2Ceil = toConvexProps(nodes.Room2Ceil.geometry);
  const Room4Ceil = toConvexProps(nodes.Room4Ceil.geometry);
  const Room6Ceil = toConvexProps(nodes.Room6Ceil.geometry);
  const Room1Ceil_1 = toConvexProps(nodes.Room1Ceil_1.geometry);
  const Room1Ceil_2 = toConvexProps(nodes.Room1Ceil_2.geometry);
  const Ceil001 = toConvexProps(nodes.Ceil001.geometry)
  const Ceil002 = toConvexProps(nodes.Ceil002.geometry)
  const Ceil003 = toConvexProps(nodes.Ceil003.geometry)
  const Room1Ceil001_1 = toConvexProps(nodes.Room1Ceil001_1.geometry)
  const Room1Ceil001_2 = toConvexProps(nodes.Room1Ceil001_2.geometry)
  const Room1Ceil001_3 = toConvexProps(nodes.Room1Ceil001_3.geometry)
  const Room1Ceil002_1 = toConvexProps(nodes.Room1Ceil002_1.geometry)
  const Room1Ceil002_2 = toConvexProps(nodes.Room1Ceil002_2.geometry)
  const Room1Ceil003_1 = toConvexProps(nodes.Room1Ceil003_1.geometry)
  const Room1Ceil003_2 = toConvexProps(nodes.Room1Ceil003_2.geometry)

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
            material={materials.Dark}
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
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: CenterWall_3,
              position: [138.43, 0, -137.44],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CenterWall_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.NorthBorder_1.geometry}
          material={materials["Wall Paint"]}
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
          castShadow
          receiveShadow
          geometry={nodes.NorthBorder_2.geometry}
          material={materials.Light}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SouthBorder_1,
            position: [133.99, 0, -11.18],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthBorder_1.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: SouthBorder_2,
            position: [133.99, 0, -11.18],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SouthBorder_2.geometry}
          material={materials.Light}
        />
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.EastBorder_1.geometry}
          material={materials["Wall Paint"]}
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
          castShadow
          receiveShadow
          geometry={nodes.EastBorder_2.geometry}
          material={materials.Light}
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
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: WestBorder_3,
              position: [-74.95, 0, -137.2],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WestBorder_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.NorthWall_1.geometry}
          material={materials["Wall Paint"]}
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
          castShadow
          receiveShadow
          geometry={nodes.NorthWall_2.geometry}
          material={materials.Light}
        />
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.EastWall_1.geometry}
          material={materials["Wall Paint"]}
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
          castShadow
          receiveShadow
          geometry={nodes.EastWall_2.geometry}
          material={materials.Light}
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
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: SouthWall_3,
              position: [106.38, 0, -24.5],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SouthWall_3.geometry}
            material={materials.Light}
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
              position: [19.12, 0, -150.36],
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
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: WestWall_3,
              position: [18.94, 0, -150.36],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WestWall_3.geometry}
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
              position: [32.78, 25.4, -84.32],
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
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling01_3,
              position: [32.98, 25.4, -84.32],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ceiling01_3.geometry}
            material={materials.Light}
          />
        </group>
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling02_1.geometry}
          material={materials.Light}
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling02_2.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03_1.geometry}
          material={materials["Wall Paint"]}
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling03_2.geometry}
          material={materials.Light}
        />
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling04_1.geometry}
          material={materials["Wall Paint"]}
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling04_2.geometry}
          material={materials.Light}
        />
      </group>
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling05_1.geometry}
          material={materials.Light}
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
          castShadow
          receiveShadow
          geometry={nodes.Ceiling05_2.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling06_1,
            position: [232.37, 30.48, -58.81],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling06_1.geometry}
          material={materials.Light}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling06_2,
            position: [232.37, 30.48, -58.81],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling06_2.geometry}
          material={materials["Wall Paint"]}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling07_1,
            position: [185.38, 30.48, -38.49],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling07_1.geometry}
          material={materials.Light}
        />
      </group>
      <group
        ref={
          useConvexPolyhedron(() => ({
            mass: 0,
            args: Ceiling07_2,
            position: [185.38, 30.48, -38.49],
          }))[0]
        }
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling07_2.geometry}
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
            material={materials.Light}
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
            material={materials["Wall Paint"]}
          />
        </group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Ceiling08_3,
              position: [79.97, 30.48, -38.49],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ceiling08_3.geometry}
            material={materials["Grey Wall Paint"]}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room2Ceil,
              position: [32.98, 50.8, -251.96],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room2Ceil.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room4Ceil,
              position: [247.61, 50.8, -236.72],
              rotation: [0, 1.57, 0],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room4Ceil.geometry}
            material={materials.Light}
          />
        </group>
      </group>
      <group>
        <group
          ref={
            useConvexPolyhedron(() => ({
              mass: 0,
              args: Room6Ceil,
              position: [232.37, 50.8, -23.25],
            }))[0]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Room6Ceil.geometry}
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
            material={materials.Black}
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
          material={materials.Light}
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
          material={materials.Light}
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
          material={materials.Light}
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
            material={materials.Black}
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
            material={materials.Black}
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
            material={materials.Light}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/GalleryMap.glb");
