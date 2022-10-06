import React from 'react';
import Wall from './Wall';
import EdgeWall from './EdgeWall';

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
      {/* 모서리 */}
      <Wall
        position={[10.8, 10, -99.4]}
        args={[0.1, 40, 10]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Wall
        position={[12.4, 10, -100.7]}
        args={[0.1, 40, 10]}
        rotation={[0, Math.PI, 0]}
      />
      <EdgeWall position={[53.4, 10, -99.4]} args={[0.1, 40, 10]} />
      <EdgeWall position={[53.4, 10, -201.4]} args={[0.1, 40, 10]} />
      <EdgeWall position={[12.4, 10, -201.4]} args={[0.1, 40, 10]} />
      <EdgeWall position={[64.9, 10, -231.4]} args={[0.1, 40, 6.56]} />
      <EdgeWall
        position={[95.1, 10, -216.4]}
        args={[0.2, 40, 14]}
        // rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall position={[95.15, 10, -257.4]} args={[0.1, 40, 5]} />
      <EdgeWall
        position={[197.2, 10, -216]}
        args={[0.2, 40, 14]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[197, 10, -260]}
        args={[0.1, 40, 10]}
        rotation2={[0, -Math.PI / 2, 0]}
        rotation1={[0, -Math.PI, 0]}
      />
      <EdgeWall
        position={[226.7, 10, -203]}
        args={[0.2, 40, 7]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[211.7, 10, -175]}
        args={[0.2, 40, 12]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[253.2, 10, -175]}
        args={[0.2, 40, 12]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[253.2, 10, -73.7]}
        args={[0.2, 40, 12]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[211.7, 10, -73.7]}
        args={[0.2, 40, 12]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[198.7, 10, -44.3]}
        args={[0.2, 40, 7]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[170.6, 10, -59]}
        args={[0.2, 40, 34]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[95, 10, -59]}
        args={[0.2, 40, 14]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[95, 10, -17]}
        args={[0.2, 40, 14]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[170.6, 10, -18]}
        args={[0.2, 40, 14]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[65, 10, -69.5]}
        args={[0.2, 40, 14]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
      <EdgeWall
        position={[65, 10, -28]}
        args={[0.2, 40, 14]}
        rotation2={[0, Math.PI / 2, 0]}
        rotation1={[0, Math.PI, 0]}
      />
    </>
  );
};

export default WallGroup;