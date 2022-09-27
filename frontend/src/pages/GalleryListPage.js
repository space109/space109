import { useState, useEffect } from "react";
import styled from "styled-components";
import { GalleryList, SearchBar, FilterButtons } from "../components";
import { Div, screenSizes } from "../styles/BaseStyles";
import { getGalleryList } from "../apis";

const NavArea = styled.div`
  height: 120px;
  background: var(--grey-600);
`;

const SearchArea = styled.div`
  height: 200px;
  background: var(--grey-600);
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--ocean-300);
  z-index: -10;
`

const Content = styled.div`

`

function GalleryListPage() {

  const [ gallerys, setGallerys ] = useState();
  
  const getGallerys = async () => {
    setGallerys(await getGalleryList());
  }

  useEffect(() => {
    getGallerys();
  }, [])

  return (
    <div>
      <Background>
      </Background>
      <NavArea />
      <SearchArea>
        <SearchBar></SearchBar>
        <FilterButtons></FilterButtons>
      </SearchArea>
      <Content>
        <GalleryList></GalleryList>
        {/* <GalleryList gallerys={gallerys}></GalleryList> */}
      </Content>
    </div>
  );
}

export default GalleryListPage;
