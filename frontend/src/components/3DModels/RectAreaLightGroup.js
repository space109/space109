import React from 'react';
import RectAreaLight from './RectAreaLight';

const RECT_AREA_LIGHT_POSITION = [
  {
    position: [33, 40, -48.7],
    rotation: [-Math.PI / 2, 0, 0],
    width: 61.5,
    intensity: 2,
    height: 39,
  },
  {
    position: [33, 25.3, -84.3],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.5,
  },
  {
    position: [33, 30.3, -216.4],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [33, 0.5, -257],
    rotation: [Math.PI / 2, 0, 0],
    width: 70,
    intensity: 2,
    height: 35,
  },
  {
    position: [79.97, 30.35, -236.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [212.05, 30.35, -236.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [251, 0.5, -240],
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    width: 70,
    intensity: 2,
    height: 35,
  },
  {
    position: [232.3, 30.45, -189.73],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [232.3, 30.45, -58.81],
    rotation: [-Math.PI / 2, 0, 0],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [231, 0.5, -20],
    rotation: [Math.PI / 2, 0, 0],
    width: 70,
    intensity: 2,
    height: 35,
  },
  {
    position: [185.37, 30.45, -38.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [79.96, 30.45, -38.5],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 4.5,
    intensity: 2,
    height: 30.45,
  },
  {
    position: [33, 40, -151],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    width: 80,
    intensity: 2,
    height: 33.45,
  },
  {
    position: [147, 40, -236.6],
    rotation: [-Math.PI / 2, 0, 0],
    width: 80,
    intensity: 2,
    height: 33.45,
  },
  {
    position: [233, 40, -123.6],
    rotation: [-Math.PI / 2, 0, Math.PI/2],
    width: 80,
    intensity: 2,
    height: 33.45,
  },
  {
    position: [131.8, 40, -38.9],
    rotation: [-Math.PI / 2, 0, 0],
    width: 33.45,
    intensity: 2,
    height: 33.45,
  },
];

const RectAreaLightGroup = () => {
  return (
    <>
      {RECT_AREA_LIGHT_POSITION.map((item, idx) => {
        return (
          <RectAreaLight
            key={`RECTAREA_KEY${idx}`}
            position={item.position}
            rotation={item.rotation}
            width={item.width}
            height={item.height}
            intensity={item.intensity}
          />
        );
      })}
    </>
  );
};

export default RectAreaLightGroup;