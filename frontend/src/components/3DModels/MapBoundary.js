import React from "react";
import { useBox, useConvexPolyhedron } from "@react-three/cannon";

const MapBoundary = ({
  position = [0, 0, 0],
  offset = [0, 0, 0],
  dims = [1, 1, 1],
  visible = false,
  children,
}) => {
  const [ref, api] = useBox(() => ({ mass: 0, args: dims, position: position}))
  return (
    <group ref={ref} api={api}>
      <mesh visible={visible} scale={dims}>
        <boxBufferGeometry args={[0, 0]}/>
        <meshPhongMaterial wireframe />
      </mesh>
      <group position={offset}>
        {children}
      </group>
    </group>
  );
};

export default MapBoundary;
