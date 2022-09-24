import React from "react";
import { Div } from "../../styles/BaseStyles";
import styled, { css } from "styled-components";

interface PropsStyle{
  url?: any,
}

// ??ㅠㅠ??PropsStyle 이렇게 타입 두번 줘야하나??
const Image = styled.img.attrs<PropsStyle>(props => ({
  src: props.url,
  alt: "NFT 이미지",
  }))<PropsStyle>`
  width: 100%;
`

const Card = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  cursor: pointer;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0 0 0;
  gap: 0.5rem;
  width: 100%;
`

function NftCard({ author, description, fileName, image, name }: any) {
  return (
    <Card>
      <Image url={image} />
      <Section>
        <Div w="100%" color="--grey-100" fontSize="--h6" fontWeight="--bold">{name}</Div>
        <Div w="100%" color="--grey-100" fontSize="--h7" fontWeight="--light">{author}</Div>
      </Section>
    </Card>
  );
}

NftCard.defaultProps = {
  author: "사슴입니다",
  description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
  fileName: "파일네임이 멀까?",
  image: "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
  name: "하와이안감자",
}

export default NftCard;
