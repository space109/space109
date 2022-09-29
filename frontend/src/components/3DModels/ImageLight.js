import React, { useRef } from "react";
import { useMemo } from "react";
import * as THREE from "three";
// import { useHelper } from '@react-three/drei';
// import { SpotLightHelper } from "three";

const ImageLight = ({
  lightFrom = [0, 0, 0],
  lightTo = [0, 0, 0],
  lightColor = "0xffffff",
  intensity = 1,
  distance = 100,
  angle = 0.5,
  penumbra = 0.2,
  decay=1,
}) => {
  const light = useMemo(
    () => new THREE.SpotLight(lightColor, intensity, distance, angle, penumbra, decay),
    []
  );
  // const ref = useRef();
  // useHelper(ref, SpotLightHelper);
  // //조명1: 조명
  // //조명2: 조명이 비추는 좌표
  return (
    <>
      <primitive
        object={light}
        position={lightFrom}

      />
      <primitive object={light.target} position={lightTo}/>
    </>
  );
};

export default ImageLight;
