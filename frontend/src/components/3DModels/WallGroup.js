import React from 'react';
import Wall from './Wall';

const WallGroup = () => {
  return (
    <>
      {/* 가벽 */}
      {/* 3번방 */}
      <Wall position={[232, 20, -143]} args={[1, 21, 27]} />
      <Wall position={[232, 20, -103]} args={[1, 21, 27]} />
      {/* 2번방 */}
      <Wall position={[128, 20, -244]} args={[1, 37, 35]} />
      <Wall position={[163, 20, -230]} args={[1, 37, 35]} />
    </>
  );
};

export default WallGroup;