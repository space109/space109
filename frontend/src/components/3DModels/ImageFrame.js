import { useBox } from "@react-three/cannon";
import React, { useEffect } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import axios from "axios";
import { useState } from "react";
import uploadImage from "../../assets/uploadImage.png";
import GifLoader from "three-gif-loader";

const ImageFrame = ({
  meta = {},
  toggleModal,
  position,
  args = [0.1, 27, 27],
  rotation = [0, 0, 0],
  index,
  getIndexOfFrame = () => {},
}) => {
  const [imageNFT, setImageNFT] = useState("");
  // useEffect(() => {
  //   getIndexOfFrame(index);
  // }, [getIndexOfFrame, index])
  useEffect(() => {
    if (meta) {
      axios
        .get(meta)
        .then((res) => {
          setImageNFT(res.data.image);
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

  const textTexture = new GifLoader().load(
    "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa"
    // imageNFT
  );

  const [ref] = useBox(() => ({
    mass: 0,
    position: position,
    args: args,
    rotation: rotation,
  }));

  return (
    <>
      {/* 공통 변경 사항, 작품 클릭시 토글 모달 비활성화 */}
      <mesh
        receiveShadow
        castShadow
        ref={ref}
        onClick={() => {
          toggleModal();
          getIndexOfFrame(index);
        }}
      >
        <boxGeometry args={args} />
        <meshPhongMaterial
          map={
            imageNFT
              ? textTexture.image
                ? textTexture
                : img
              : uploadImageTexture
          }
          color="white"
        />
      </mesh>
    </>
  );
};

export default ImageFrame;
