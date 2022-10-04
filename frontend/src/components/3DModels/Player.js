import React, { useEffect, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { FPVControls } from "./";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { Vector3 } from "three";

const SPEED = 40;

const artPositionList = [
  [], // 시작 방
  [
    [13, -115],
    [13, -150],
    [13, -185],
    [53, -115],
    [53, -150],
    [53, -185],
  ], // 1번 방 [x, z]
  [[33, -260]], // 2번 방
  [
    [111, -256],
    [146, -256],
    [181, -256],
    [111, -218],
    [146, -218],
    [181, -218],
  ], // 3번 방
  [[255, -238]], // 4번 방
  [
    [252, -160],
    [252, -125],
    [252, -90],
    [212, -160],
    [212, -125],
    [212, -90],
  ], // 5번 방
  [[231, -20]], // 6번 방
  [
    [115, -18.5],
    [150, -18.5],
    [115, -58.8],
    [150, -58.8],
  ], // 7번 방
  [], // 중앙 방
];

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
  const [room, setRoom] = useState(0); // 자신이 있는 룸 상태

  const targetArt = (index) => {
    props.targetRoom(room);
    props.targetIndex(index);
  };

  const objectDistance = (objectPosition, roomNum) => {
    // 물체와의 거리 함수
    const deltaX = objectPosition[0] - pos.current[0];
    const deltaZ = objectPosition[1] - pos.current[2];

    let rangelimit = 300; // 물체와의 거리 경계 값
    if (roomNum === 2 || roomNum === 4 || roomNum === 6) {
      // 큰 방에서는 경계 값 증가
      rangelimit = 1000;
    }

    if (deltaX ** 2 + deltaZ ** 2 < rangelimit) {
      return true; // 내부일 경우 true
    } else {
      return false; // 외부일 경우 false
    }
  };

  useEffect(() => {
    // 룸 상태 체크
    if (pos.current[0] < 75) {
      if (pos.current[2] > -60) {
        setRoom(0);
      } else if (pos.current[2] > -204) {
        setRoom(1);
      } else {
        setRoom(2);
      }
    } else if (pos.current[0] < 200) {
      if (pos.current[2] > -60) {
        setRoom(7);
      } else if (pos.current[2] > -204) {
        setRoom(8);
      } else {
        setRoom(3);
      }
    } else {
      if (pos.current[2] > -60) {
        setRoom(6);
      } else if (pos.current[2] > -204) {
        setRoom(5);
      } else {
        setRoom(4);
      }
    }
    // console.log(room);
  });

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
    if (!props.open) {
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation);

      api.velocity.set(direction.x, velocity.current[1], direction.z);
    }

    // activeButton으로 위치값 호출
    // pos.current = [왼오, 높이, 앞뒤]

    if (activeButton) {
      if (0 < room < 7) {
        let artList = artPositionList[room];

        let minIndex = 0; // 가장 가까운 작품 인덱스
        let minValue = 0xffffff; // 가장 가까운 유클리드 거리값

        artList.forEach((artPos, index) => {
          // 가장 가까운 작품 탐색
          let euclidDist =
            Math.abs(artPos[0] - pos.current[0]) +
            Math.abs(artPos[1] - pos.current[2]);

          if (euclidDist < minValue) {
            minValue = euclidDist;
            minIndex = index;
          }
        });

        console.log("가장 가까운 작품 인덱스, 거리", minIndex, minValue);

        if (
          objectDistance(artList[minIndex], room) &&
          !props.toggle &&
          readyTotoggle
        ) {
          // toggle off 상태일때 e를 누르면
          props.setToggle(true);
          setReadyTotoggle(false); // 활성화 키 true 유지시 상태 변화 불가 상태로 변경
          targetArt(minIndex);
        }
        if (props.toggle && readyTotoggle) {
          props.setToggle(false);
          setReadyTotoggle(false);
        }
      }
    } else {
      // 활성화 키 비 활성시 상태 변화 준비 상태로 변경
      setReadyTotoggle(true);
    }

    if (jump && !props.open) {
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
