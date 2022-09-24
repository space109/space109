import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
const RectAreaLight = ({ color = "white", intensity=1, width=30, height=30, position=[0, 0, 0], rotation=[Math.PI/2, 0, 0] }) => {
  const light = useMemo(
    () => new THREE.RectAreaLight(color, intensity, width, height),
    []
  );
  //조명1: 조명
  //조명2: 조명이 비추는 좌표
    const ref = useRef();
    useHelper(ref, RectAreaLightHelper);
  return (
    <>
      <primitive
        object={light}
        position={position}
        ref={ref}
        rotation={rotation}
      />
    </>
  );
};

export default RectAreaLight;
