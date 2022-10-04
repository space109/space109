import { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal, Input, SharpButton } from "..";
import { Div, screenSizes } from "../../styles/BaseStyles";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../../common/canvasUtils";

const On = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const BackGround = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--modal-bg);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${On} 0.3s ease;
`

const Content = styled(Div)`
  width: 50%;
  height: 60%;
  overflow: auto;
  animation: ${On} 0.3s ease;
  background-color: var(--grey-650);
`

function CropModal (props) {

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const CropImage = useCallback(async () => {
    try {
      Promise.all(await getCroppedImg(props.fileImage, croppedAreaPixels, rotation)).then((cropped) => {
        console.log("이거머임??", cropped)
        props.setFileImage(cropped[0])
        props.setThumbnail(cropped[0])
        props.setFile(cropped[1])
      })
    } catch (e) {
      console.error(e)
    }
    props.closeModal();
  }, [props.fileImage, props.file, croppedAreaPixels, rotation])

  const CloseModal = useCallback((e) => {
    props.closeModal();
    e.stopPropagation();
  }, []);

  return (
    <>
    <ModalPortal>
      <BackGround 
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Content 
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Cropper
            image={props.fileImage}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={5 / 6}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            width="100%"
          />
        </Content>
        <Div display="flex" gap="3rem">
        <SharpButton 
            onClick={CloseModal}
            bg="--grey-650" 
            color="--grey-100" 
            borderColor="--grey-650" 
            borderWidth="1px"
            fontSize="--h6"
          >
            취소하기
          </SharpButton>
          <SharpButton 
            onClick={CropImage}
            bg="--grey-100" 
            color="--grey-650" 
            borderColor="--grey-100" 
            borderWidth="1px"
            fontSize="--h6"
          >
            적용하기
          </SharpButton>
        </Div>
      </BackGround>
    </ModalPortal>
    </>
  );
}

export default CropModal;