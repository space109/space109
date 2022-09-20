import React from "react";
import styled from "styled-components";

interface Props {
  title?: string;
  width?: string;
  theme?: string;
}

interface PropStyle {
  width: string;
}

const Card = styled.div<PropStyle>`
  /* max-width: 425px; */
  /* max-height: 625px; */
  width: ${(props) => props.width};
  height: 625px;
  background: url("https://cdn.imweb.me/upload/S201906191c3595f104fd6/4dacf6c8274de.jpg");
  color: var(--grey-100);
  position: relative;
  transition: 1s ease-out;

  &:hover {
    background: rgb(0, 0, 0, 0);
    & div .cardContent {
      opacity: 1;
    }
  }
`;

const CardMain = styled.div<PropStyle>`
  height: calc(100% - 40px);
  width: calc(${(props) => props.width} - 40px);
  top: 20px;
  left: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTheme = styled.div`
  display: block;
  margin: 0 0 5px 0;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  /* or 17px */

  display: flex;
  align-items: center;
`;

const CardTitle = styled.div`
  display: block;
  margin: 0 0 5px 0;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 140%;
  /* or 34px */

  display: flex;
  align-items: center;
`;

const CardContent = styled.div`
  /* position: absolute; */
  border: 0;
  outline: 0;
  /* vertical-align: baseline; */
  padding: 0;
  margin: 20px 0 5px 0;
  word-break: all;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  opacity: 0;
  /* transition: 0.5s; */
  /* or 25px */

  display: flex;
  align-items: center;
`;

const BgImage = styled.div<PropStyle>`
  position: absolute;
  width: ${(props) => props.width};
  height: 625px;
  background-color: var(--spinach-200);
  z-index: -1;
  color: var(--grey-100);
`;

const CardAuthor = styled.div``;

function GalleryCard({ theme, title, width = "425px" }: Props) {
  return (
    <div>
      <BgImage width={width} />
      <Card width={width}>
        <CardMain width={width}>
          <div>
            <CardTheme>테마: {theme ? theme : "테마"}</CardTheme>
            <CardTitle>{title ? title : "제목"}</CardTitle>
            <CardContent className="cardContent">
              여름 휴가를 가고 싶지만 시간 이슈로 가지 못한 저를 위로하고자 그린
              해변 그림 컬렉션입니다. 저의 상상과 꿈을 담아 그렸습니다.
            </CardContent>
          </div>
          <CardAuthor>둘기</CardAuthor>
        </CardMain>
      </Card>
    </div>
  );
}
export default GalleryCard;
