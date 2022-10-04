import React from 'react';
import CeilingBox from './CeilingBox';

const CEILING_POSITION = [
  [8, 40, -48.7],
  [14, 40, -48.7],
  [20, 40, -48.7],
  [44, 40, -48.7],
  [50, 40, -48.7],
  [56, 40, -48.7],
];

const CeilingBoxGroup = () => {
  return (
    <>
      {CEILING_POSITION.map((item, idx) => {
        return (
          <CeilingBox
            key={`CEILINGBOX_KEY${idx}`}
            position={item}
            args={[4, 1, 39]}
            color="darkgrey"
          />
        );
      })}
    </>
  );
};

export default CeilingBoxGroup;