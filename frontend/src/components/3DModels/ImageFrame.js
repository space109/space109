import React, { useEffect } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { useState } from "react";
import uploadImage from "../../assets/uploadImage.png";
import GifLoader from "three-gif-loader";
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
      <mesh
        receiveShadow
        castShadow
        rotation={rotation}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
          getIndexOfFrame(index);
        }}
      >
        <boxGeometry args={args} />
        <meshStandardMaterial color="white" />
        <meshPhongMaterial
          map={
            imageNFT
              ? type === "image/gif"
                ? gifTexture
                : img
              : uploadImageTexture
          }
          transparent
          color="white"
        />
      </mesh>
    </>
  );
};

export default ImageFrame;
