import { useBox } from "@react-three/cannon";
import React, { useEffect } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import axios from "axios";
import { useState } from "react";
import uploadImage from "../../assets/uploadImage.png";
import GifLoader from "three-gif-loader";
import { a, config } from "@react-spring/three";

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
    if (meta) {
      axios.get(meta).then((res) => {
        setImageNFT(res?.data.image);
        setType(res?.data.type);
        
      }).catch(console.log('ImageFrame'));
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
    "https://skywalker.infura-ipfs.io/ipfs/QmQizUKRdG8NG1H6GvjEqbyrmvmqxdzFYSTrZR1o6DQCsa"
    // imageNFT
  );
  return (
    <>
      {/* 공통 변경 사항, 작품 클릭시 토글 모달 비활성화 */}

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
