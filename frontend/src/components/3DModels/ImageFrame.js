import { useBox } from '@react-three/cannon';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import * as THREE from "three";
import axios from 'axios';
import { useState } from 'react';
import uploadImage from '../../assets/uploadImage.png';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";
import { useFrame, useLoader } from '@react-three/fiber';
import { useVideoTexture } from '@react-three/drei';
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
    imageNFT
  );

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
          map={imageNFT ? textTexture : uploadImageTexture}
          color="white"
        />
        {/* <Image
          raycast={() => null}
          position={[0, -10, 0.7]}
          url={
            imageNFT
              ? imageNFT
              : "https://skywalker.infura-ipfs.io/ipfs/QmQh7722NPdJixn7kGwSZngrY1Vd5rqGnNEcUWXAXwX2kE"
          }
        /> */}
      </mesh>
    </>
  );
};

export default ImageFrame;