import { useState } from "react";
import styled from "styled-components";
import { Div, screenSizes } from "../../styles/BaseStyles";
import GalleryCard from "./GalleryCard";
const UL = styled.ul`
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  margin: 200px -40px;
  @media screen and screen and (min-width: 450px) {
    margin: 190px 40px;
  }
  list-style: none;
  box-sizing: border-box;
  border: 10px solid blue;
`;

const Box = styled.div`
  box-sizing: border-box;
  border: 10px solid red;
`

const GalleryList = ({gallerys}:any) => {
  console.log(gallerys)
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
      "description": "아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아",
      "title": "t아아아아아아아아아아아아아앙아아아아아아아아아!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아",
      "title": "title!!!!!!!!",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17nsQEKYpc0pgQBAB6WL-s6tgULypZS1nDg&usqp=CAU"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "test2",
      "title": "title!!!!!!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book01.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "test2",
      "title": "title!!!!!!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book04.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "test2",
      "title": "title!!!!!!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book05.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "test2",
      "title": "title!!!!!!!!",
      "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book06.jpg"
    },
    {
      "gallery_id": 1,
      "oa": "123",
      "category_id": 2,
      "description": "test2",
      "title": "title!!!!!!!!",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YU2uvMzskBXmMHXW8rgb9928Lu0dnN-8Iw&usqp=CAU"
    }
  ]
}

export default GalleryList;