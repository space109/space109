import React, { useEffect, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { FPVControls } from "./FPVControls";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { Vector3 } from "three";

const SPEED = 40;

export const Player = (props) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, activeButton, jump } =
    useKeyboardControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: props.position,
  }));
  const [readyTotoggle, setReadyTotoggle] = useState(true); // 모달 상태 변화 준비 확인

  const objectDistance = (objectPosition) => {
    // 물체와의 거리 함수
    const deltaX = objectPosition[0] - pos.current[0];
    const deltaZ = objectPosition[2] - pos.current[2];

    const rangelimit = 100; // 물체와의 거리 경계 값

    if (deltaX ** 2 + deltaZ ** 2 < rangelimit) {
      return true; // 내부일 경우 true
    } else {
      return false; // 외부일 경우 false
    }
  };

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);
  //사물 위치
  const pos = useRef([0, 0, 0]);
  useEffect(
    () => api.position.subscribe((v) => (pos.current = v)),
    [api.position]
  );

  //플레이어 애니메이션 및 1인칭 카메라 기본 위치 설정
  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1] + 2.5, pos.current[2])
    );
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // activeButton으로 위치값 호출
    // pos.current = [왼오, 높이, 앞뒤]

    if (activeButton) {
      // console.log(camera.position);
      if (objectDistance([127, 25, 5.2]) && !props.toggle && readyTotoggle) {
        // toggle off 상태일때 e를 누르면
        props.setToggle(true);
        setReadyTotoggle(false); // 활성화 키 true 유지시 상태 변화 불가 상태로 변경
      }
      if (props.toggle && readyTotoggle) {
        props.setToggle(false);
        setReadyTotoggle(false);
      }
    } else {
      // 활성화 키 비 활성시 상태 변화 준비 상태로 변경
      setReadyTotoggle(true);
    }

    if (jump) {
      api.velocity.set(velocity.current[0], 14, velocity.current[2]);
    }
  });
  return (
    <>
      <FPVControls lockControl={props.lockControl} />
      <mesh ref={ref}>
        <planeBufferGeometry attach="geometry" args={[0, 0]} />
        <meshStandardMaterial attach="material" opacity={1} />
      </mesh>
    </>
  );
};
