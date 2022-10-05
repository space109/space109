import React, { useRef } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { HemisphereLightHelper } from "three";

const HemisphereLight = ({
  lightFrom = [0, 0, 0],
  skyColor = "white",
  groundColor = "black",
  intensity = 0.5,
}) => {
  const light = useMemo(
    () =>
      new THREE.HemisphereLight(
        skyColor,
        groundColor,
        intensity
      ),
    []
  );
  const ref = useRef();
  useHelper(ref, HemisphereLightHelper);
  //조명1: 조명
  //조명2: 조명이 비추는 좌표
  return (
    <>
      <primitive object={light} position={lightFrom} ref={ref} />
      {/* <primitive object={light.target} position={lightTo} /> */}
    </>
  );
};

export default HemisphereLight;
