import { useBox } from '@react-three/cannon';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import * as THREE from "three";
import axios from 'axios';
import { useState } from 'react';
import uploadImage from '../../assets/uploadImage.png';
import { useFrame, useLoader } from '@react-three/fiber';
import GifLoader from "three-gif-loader";


const ImageFrame = ({
  prevNFT = {},
  toggleModal,
  position,
  args = [0.1, 27, 27],
  rotation = [0, 0, 0],
}) => {
  useEffect(() => {
    axios
      .get(prevNFT?.METADATA)
      .then((res) => {
        setImageNFT(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [prevNFT]);
  const [imageNFT, setImageNFT] = useState("");
  const img = useMemo(
    () => new THREE.TextureLoader().load(imageNFT),
    [imageNFT]
  );
  
  const uploadImageTexture = useMemo(
    () => new THREE.TextureLoader().load(uploadImage),
    []
  );
    
  const textTexture = new GifLoader().load(
    "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa"
    // imageNFT
  );
  console.log(textTexture)

  const [ref] = useBox(() => ({
    mass: 0,
    position: position,
    args: args,
    rotation: rotation,
  }));

  return (
    <>
      <mesh receiveShadow castShadow ref={ref} onClick={toggleModal}>
        <boxGeometry args={args} />
        <meshPhongMaterial
          map={imageNFT ? textTexture.image ? textTexture : img : uploadImageTexture}
          color="white"
        />
      </mesh>
    </>
  );
};

export default ImageFrame;