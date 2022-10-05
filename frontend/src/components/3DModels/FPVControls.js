import React, { useEffect, useState } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls";
import { useThree, extend } from "@react-three/fiber";
import { useRef } from "react";

extend({ PointerLockControlsImpl });

const FPVControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    // document.addEventListener("mousedown", (event) => {
    //   if (event.defaultPrevented) {
    //     return;
    //   }
    //   console.log(props.toggle)
    //   console.log(controls.current.isLocked)
    //   if (!props.toggle && !controls.current.isLocked) {
    //     // 공통 변경 사항, 모달 없을때 클릭시 lock
    //     controls.current.lock();
    //     console.log("locked by click");
    //   }
    // });
    document.addEventListener("keydown", (event) => {
      // e키에 반응하여 lock / unlock
      if (event.defaultPrevented) {
        return;
      }
      if (event.key === "e") {
        if (controls.current.isLocked) {
          // lock 상태시 unlock
          controls.current.unlock();
        } else {
          // unlock 상태시 lock
          controls.current.lock();
        }
      }
    });
    console.log(controls.current);
  }, []);
  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
    />
  );
};

export default FPVControls;
