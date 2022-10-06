import React from "react";
import { RockChair } from ".";
import Book from "./Book";
import Desk from "./Desk";
import Inkwell from "./Inkwell";
import ShareText from "./ShareText";
import SkyEnvironment from "./SkyEnvironment";
import WallGroup from "./WallGroup";
import MainCharacter from "./MainCharacter";
// import Owl from "./Owl";
import LogoBox from "./LogoBox";

const Decorations = (props) => {
  return (
    <>
      <LogoBox
        position={[130, 41, -130]}
        args={[100, 100, 0.1]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
      <ShareText />
      <WallGroup />
      <SkyEnvironment />
      <Inkwell
        position={[11.7, 13.8, -39.9]}
        scale={4}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Book toggleOpen={props.toggleOpen} />
      <Desk
        position={[8, 6, -38.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.17}
      />
      <RockChair position={[113, 11, -39]} />
      <RockChair position={[148, 11, -39]} />
      {/* <Plant1 position={[27, 10, -64]} scale={4} />
      <Plant1 position={[41, 10, -64]} scale={4} /> */}
      <MainCharacter
        position={[5, 10, -37.5]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.62}
      />
      {/* <Owl position={[110, 10, -226.5]} scale={0.2} /> */}
    </>
  );
};

export default Decorations;
