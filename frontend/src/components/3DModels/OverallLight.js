import React from 'react';
import { useMemo } from 'react';
import * as THREE from "three";

const OverallLight = () => {
const light = useMemo(() => new THREE.DirectionalLight(0xffffff, 0.2, 100), []);
//조명1: 조명
//조명2: 조명이 비추는 좌표
return (
  <>
    <primitive object={light} position={[30, 103, -40]} />
    <primitive object={light.target} position={[30, 13, -80]} />
  </>
);
};

export default OverallLight;