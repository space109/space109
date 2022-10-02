import React from "react";
import DatGui, { DatNumber } from "react-dat-gui";
import number from "./_number.scss";

const FrameDataHandler = (props) => {
  return (
    <>
      <DatGui
        data={props.changable}
        onUpdate={(e) => {
          props.handleUpdate(e);
        }}
      >
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          path="positionX"
          label="X축"
          min={-300}
          max={300}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="Y축"
          path="positionY"
          min={-300}
          max={300}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="Z축"
          path="positionZ"
          min={-300}
          max={300}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="가로 길이"
          path="scaleX"
          min={0}
          max={200}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="세로 길이"
          path="scaleY"
          min={0}
          max={200}
          step={1}
        />
        <DatNumber
          style={{ marginBottom: "15px", listStyle: "none" }}
          label="가로 회전"
          path="rotationY"
          min={-3.15}
          max={3.15}
          step={0.01}
        />
        <DatNumber
          style={{ listStyle: "none" }}
          label="세로 회전"
          path="rotationX"
          min={-3.15}
          max={3.15}
          step={0.01}
        />
      </DatGui>
    </>
  );
};

export default FrameDataHandler;
