import React from 'react';
import { RockChair } from '.';
import Book from './Book';
import Desk from './Desk';
import Inkwell from './Inkwell';
import ShareText from './ShareText';
import SkyEnvironment from './SkyEnvironment';
import WallGroup from './WallGroup';

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
      <Book
        toggleOpen={props.toggleOpen}
      />
      <Desk
        position={[52, 6, -58]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
        scale={0.17}
      />
      <RockChair position={[113, 11, -39]}/>
      <RockChair position={[148, 11, -39]}/>
    </>
  );
};

export default Decorations;