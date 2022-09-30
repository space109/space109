import { useState } from "react";
import styled from "styled-components";
import { GalleryDetailModal } from "../"

const LI = styled.li`
  border: 10px solid yellow;
  box-sizing: border-box;
  grid-column-end: span 2;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-top: -50%;

  &:nth-child(2n) {
    grid-column-start: 2;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-size: 50% 100%, 50% 100%;
    background-position: left, right;
  }

  &::before {
    z-index: -10;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    -webkit-clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background-repeat: no-repeat;
    background-image: linear-gradient(
        -45deg,
        var(--mandarin-300) 53.5%,
        var(--navy-100) 53.5%,
        var(--navy-100) 60%,
        var(--mandarin-300) 60%
      ),
      linear-gradient(
        45deg,
        var(--mandarin-300) 53.5%,
        var(--navy-100) 53.5%,
        var(--navy-100) 60%,
        var(--mandarin-300) 60%
      );
  }

  &::after {
    clip-path: polygon(100% 50%, 50% 100%, 0 50%, 20% 50%, 50% 80%, 80% 50%);
    -webkit-clip-path: polygon(
      100% 50%,
      50% 100%,
      0 50%,
      20% 50%,
      50% 80%,
      80% 50%
    );
    background-repeat: no-repeat;
    background-image: linear-gradient(
        45deg,
        var(--mandarin-300) 40%,
        var(--navy-100) 40%
      ),
      linear-gradient(-45deg, var(--mandarin-300) 40%, var(--navy-100) 40%);
  }

  &:nth-child(2n)::before {
    background-image: linear-gradient(
        -45deg,
        var(--grey-300) 53.5%,
        var(--spinach-300) 53.5%,
        var(--spinach-300) 60%,
        var(--grey-300) 60%
      ),
      linear-gradient(
        45deg,
        var(--grey-300) 53.5%,
        var(--spinach-300) 53.5%,
        var(--spinach-300) 60%,
        var(--grey-300) 60%
      );
  }

  &:nth-child(2n)::after {
    background-image: linear-gradient(45deg, var(--grey-300) 40%, var(--spinach-300) 40%),
      linear-gradient(-45deg, var(--grey-300) 40%, var(--spinach-300) 40%);
  }

  &:nth-child(5n)::before {
    background-image: linear-gradient(
        -45deg,
        var(--navy-100) 53.5%,
        var(--grey-300) 53.5%,
        var(--grey-300) 60%,
        var(--navy-100) 60%
      ),
      linear-gradient(
        45deg,
        var(--navy-100) 53.5%,
        var(--grey-300) 53.5%,
        var(--grey-300) 60%,
        var(--navy-100) 60%
      );
  }

  &:nth-child(5n)::after {
    background-image: linear-gradient(45deg, var(--navy-100) 40%, var(--grey-300) 40%),
      linear-gradient(-45deg, var(--navy-100) 40%, var(--grey-300) 40%);
  }

  &:nth-child(7n)::before,
  &:nth-child(7n-4)::before {
    background-image: linear-gradient(
        -45deg,
        var(--spinach-300) 53.5%,
        var(--grape-300) 53.5%,
        var(--grape-300) 60%,
        var(--spinach-300) 60%
      ),
      linear-gradient(
        45deg,
        var(--spinach-300) 53.5%,
        var(--grape-300) 53.5%,
        var(--grape-300) 60%,
        var(--spinach-300) 60%
      );
  }

  &:nth-child(7n)::after,
  &:nth-child(7n-4)::after {
    background-image: linear-gradient(45deg, var(--spinach-300) 40%, var(--grape-300) 40%),
      linear-gradient(-45deg, var(--spinach-300) 40%, var(--grape-300) 40%);
  }

  &:nth-child(9n)::before,
  &:nth-child(9n-5)::before {
    background-image: linear-gradient(
        -45deg,
        var(--grape-300) 53.5%,
        var(--navy-100) 53.5%,
        var(--navy-100) 60%,
        var(--grape-300) 60%
      ),
      linear-gradient(
        45deg,
        var(--grape-300) 53.5%,
        var(--navy-100) 53.5%,
        var(--navy-100) 60%,
        var(--grape-300) 60%
      );
  }

  &:nth-child(9n)::after,
  &:nth-child(9n-5)::after {
    background-image: linear-gradient(45deg, var(--grape-300) 40%, var(--navy-100) 40%),
      linear-gradient(-45deg, var(--grape-300) 40%, var(--navy-100) 40%);
  }

  img {
    position: absolute;
    width: 43%;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-60%);
    box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.3);
    transition-property: transform;
    transition-duration: 0.3s;
  }

  img:hover {
    transform: translateX(-40%) translateY(-70%) rotatez(25deg);
  }

  @media screen and (min-width: 750px) {
    &:nth-child(2n){
      grid-column-start:auto;
    }
    &:nth-child(4n-1){
      grid-column-start:2;
    }
  }
  @media screen and (min-width: 1200px) {
    &:nth-child(4n-1){
      grid-column-start:auto;
    }
    &:nth-child(6n-2){
      grid-column-start:2;
    }
  }
  @media screen and (min-width: 1500px) {
    &:nth-child(6n-2){
      grid-column-start:auto;
    }
    &:nth-child(8n-3){
      grid-column-start:2;
    }
  }
  @media screen and (min-width: 2000px) {
    &:nth-child(8n-3){
      grid-column-start:auto;
    }
    &:nth-child(10n-4){
      grid-column-start:2;
    }
  }
  @media screen and (min-width: 2300px) {
    &:nth-child(10n-4){
      grid-column-start:auto;
    }
    &:nth-child(12n-5){
      grid-column-start:2;
    }
  }
  @media screen and (min-width: 2500px) {
    &:nth-child(12n-5){
      grid-column-start:auto;
    }
    &:nth-child(14n-6){
      grid-column-start:2;
    }
  }
`;

interface propsStyle {
  url?: any;
}

// 2:3 비율
const Image = styled.div<propsStyle>`
  box-sizing: border-box;
  position: absolute;
  width: 50%;
  height: 60%;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-60%);
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.3);
  transition-property: transform;
  transition-duration: 0.3s;
  background-image: url(${({url}) => process.env.REACT_APP_BACKEND_HOST + url});
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    transform: translateX(-40%) translateY(-70%) rotatez(25deg);
  }
  cursor: pointer;
`

function GalleryCard ({data}:any) {

  const [ isOnModal, setIsOnModal ] = useState(false);
  const openModal = () => {
    setIsOnModal(true);
  }
  const closeModal = () => {
    setIsOnModal(false);
  }
  return (
    <>
    {
      isOnModal && <GalleryDetailModal
      data={data}
      closeModal={closeModal}
      />
    }
    <LI>
      <Image url={data.thumbnail + "?" + new Date().getTime()}  onClick={openModal}/>
    </LI>
    </>
  )
}

export default GalleryCard;