import React from 'react';
import { RockChair } from '.';
import Book from './Book';
import Desk from './Desk';
import Inkwell from './Inkwell';
import ShareText from './ShareText';
import SkyEnvironment from './SkyEnvironment';
import WallGroup from './WallGroup';
import Plant1 from './Plant1';
import MainCharacter from './MainCharacter';
import Owl from './Owl';

const Decorations = (props) => {
  return (
    <>
      <ShareText />
      <WallGroup />
      <SkyEnvironment />
      <Inkwell
        position={[50.8, 13.8, -53.2]}
        scale={4}
        rotation={[0, -Math.PI / 4, 0]}
      />
      <Book toggleOpen={props.toggleOpen} />
      <Desk
        position={[52, 6, -58]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
        scale={0.17}
      />
      <RockChair position={[113, 11, -39]} />
      <RockChair position={[148, 11, -39]} />
      <Plant1 position={[27, 10, -64]} scale={4} />
      <Plant1 position={[41, 10, -64]} scale={4} />
      <MainCharacter
        position={[53, 10, -58.5]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={0.62}
      />
      <Owl position={[110, 10, -226.5]} scale={0.2}/>
    </>
  );
};

export default Decorations;