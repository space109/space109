import React, { useEffect } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { useState } from "react";
import uploadImage from "../../assets/uploadImage.png";
import GifLoader from "three-gif-loader";
import { a } from "@react-spring/three";
import { useAxios } from "../../hooks";
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
  const sendRequest = useAxios();

  //이미지 타입(gif, jpg)을 받는 함수와 NFT이미지를 함수
  const getNFTData = (data) => {
        setImageNFT(data.image);
        setType(data.type);
  }

  useEffect(() => {
    if (Object.keys(meta).length) {
      sendRequest({url: meta}, getNFTData)
    } else {
      setImageNFT("");
    }
  }, [meta, sendRequest]);

  const img = useMemo(
    () => new THREE.TextureLoader().load(imageNFT),
    [imageNFT]
  );

  const uploadImageTexture = useMemo(
    () => new THREE.TextureLoader().load(uploadImage),
    []
  );

  const gifTexture = useMemo(() => new GifLoader().load(
    imageNFT
  ), [imageNFT]);
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
