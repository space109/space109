import { useBox } from "@react-three/cannon";
import React from "react";
import { useMemo } from "react";
import * as THREE from "three";

const ImageFrame = ({
  toggleModal,
  position,
  args = [0.1, 5, 5],
  rotation = [0, 0, 0],
  src = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
}) => {
  const img = useMemo(() => new THREE.TextureLoader().load(src), [src]);
  const [ref] = useBox(() => ({
    mass: 0,
    position: position,
    args: args,
    rotation: rotation,
  }));
  return (
    <>
      {/* 공통 변경 사항, 작품 클릭시 토글 모달 비활성화 */}
      <mesh receiveShadow castShadow ref={ref}>
        <boxGeometry args={args} />
        <meshPhongMaterial map={img} />
      </mesh>
    </>
  );
};

export default ImageFrame;
