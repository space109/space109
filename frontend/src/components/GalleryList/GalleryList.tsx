import { useState } from "react";
import styled from "styled-components";
import { Div, screenSizes } from "../../styles/BaseStyles";
import GalleryCard from "./GalleryCard";
const UL = styled.ul`
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  margin: auto;
  margin-top: 240px;
  margin-left: -40px;
  @media screen and screen and (min-width: 450px) {
    margin: auto;
  }
  list-style: none;
  box-sizing: border-box;
  place-items: center;
  grid-column-gap: 3px;
`;

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
`

const GalleryList = ({gallerys}:any) => {
  return (
    <Box>
      {/* <UL>
        {gallerys ? gallerys.map((gallery:any, i:number) => {
          return (
            <LI key={i} onClick={onClickHandler}>
              <Image url={gallery.thumbnail}/>
            </LI>
          )}) : null
        }
      </UL> */}
      <UL>
        {gallerys ? gallerys.map((gallery:any, i:number) => {
          return (
            <GalleryCard key={i} data={gallery}/>
          )}) : null
        }
      </UL>
    </Box>
  );
};

GalleryList.defaultProps = {
  gallerys: [
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "오늘은금요일내일은토요일내일내일은일요일",
      "title": "월화수목금토일!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
  ]
}

export default GalleryList;