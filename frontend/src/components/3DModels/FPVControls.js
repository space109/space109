import React, { useEffect, useState } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls";
import { useThree, extend } from "@react-three/fiber";
import { useRef } from "react";

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    document.addEventListener("click", () => {
        controls.current.lock();
    });
    document.addEventListener("keydown", (event) => { // e키에 반응하여 lock / unlock
      if (event.defaultPrevented) {
        return;
      }
      if (event.key === "e") {
        if (controls.current.isLocked) { // lock 상태시 unlock
          controls.current.unlock();
        } else { // unlock 상태시 lock
          controls.current.lock();
        }
      };
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
