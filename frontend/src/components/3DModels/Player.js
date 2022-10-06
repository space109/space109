import React, { useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { FPVControls } from "./";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { Vector3 } from "three";

const SPEED = 30;

export const Player = (props) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: props.position,
  }));

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
      new Vector3(pos.current[0], pos.current[1] + 5.5, pos.current[2])
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
    if ((!props.open && !props.toggle)) {
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation);

      api.velocity.set(direction.x, velocity.current[1], direction.z);
    }

    // activeButton으로 위치값 호출
    // pos.current = [왼오, 높이, 앞뒤]

    if (jump && ((!props.open && !props.toggle))) {
      api.velocity.set(velocity.current[0], 14, velocity.current[2]);
    }
  });
  return (
    <>
      <FPVControls
        lockControl={props.lockControl}
        toggle={props.toggle}
        setToggle={props.setToggle}
      />
      <mesh ref={ref}>
        <planeBufferGeometry attach="geometry" args={[0, 0]} />
        <meshStandardMaterial attach="material" opacity={1} />
      </mesh>
    </>
  );
};

export default Player;
