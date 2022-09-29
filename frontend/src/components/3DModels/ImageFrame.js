import React, { useEffect } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import axios from "axios";
import { useState } from "react";
import uploadImage from "../../assets/uploadImage.png";
import GifLoader from "three-gif-loader";
import { a } from "@react-spring/three";
// import ImageLight from './ImageLight';
// import { SpotLight } from "@react-three/drei";

const ImageFrame = ({
  meta = {},
  toggleModal,
  position,
  args = [0.1, 27, 27],
  rotation = [0, 0, 0],
  index,
  getIndexOfFrame = () => {},
  // controlArgs = [0.1, 27, 27]
}) => {
  const [imageNFT, setImageNFT] = useState("");
  const [type, setType] = useState("image/png");

  useEffect(() => {
    if (Object.keys(meta).length) {
      axios
        .get(meta)
        .then((res) => {
          setImageNFT(res?.data.image);
          setType(res?.data.type);
        })
        .catch((err) => console.log(err));
    }
  }, [meta]);

  const img = useMemo(
    () => new THREE.TextureLoader().load(imageNFT),
    [imageNFT]
  );

  const uploadImageTexture = useMemo(
    () => new THREE.TextureLoader().load(uploadImage),
    []
  );

  const gifTexture = new GifLoader().load(
    // "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa"
    imageNFT
  );
  return (
    <>
      {/* <ImageLight
          lightFrom={[position[0]+20, position[1]+30, position[2]]}
          lightTo={[position[0], position[1], position[2]]}
          angle={0.5}
          intensity={1}
          penumbra={0.1}
          rotation={rotation}
        /> */}
      {/* <SpotLight
        angle={3}
        distance={30}
        position={[position[0] + 4, position[1] + 10, position[2]]}
        anglePower={5}
        attenuation={5}
      /> */}
      <a.mesh
        receiveShadow
        castShadow
        rotation={rotation}
        position={position}
        onClick={() => {
          toggleModal();
          getIndexOfFrame(index);
        }}
      >
        <boxGeometry args={args} />
        <a.meshPhongMaterial
          map={
            imageNFT
              ? type === "image/gif"
                ? gifTexture
                : img
              : uploadImageTexture
          }
          color="white"
        />
      </a.mesh>
    </>
  );
};

export default ImageFrame;
