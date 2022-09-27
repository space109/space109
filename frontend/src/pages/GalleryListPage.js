import { useState, useEffect } from "react";
import styled from "styled-components";
import { GalleryList, SearchBar, FilterButtons, NavArea } from "../components";
import { CATEGORY } from "../common/category";
import { Div, screenSizes } from "../styles/BaseStyles";
import { getGalleryList, getGalleryThemeList } from "../apis";

const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const [ theme, setTheme ] = useState(0);
  
  const getGallerys = async (theme) => {
    if (theme) {
      setGallerys(await getGalleryThemeList(theme));
    } else {
      setGallerys(await getGalleryList());
    }
  }

  useEffect(() => {
    getGallerys(theme);
  }, [theme])

  return (
    <div>
      <Background>
      </Background>
      <NavArea />
      <SearchArea>
        <Div w="60%">
          <SearchBar />
        </Div>
        <Div w="100%" mt="40px" mb="50px" pl="60px" pr="60px" boxSizing="border-box">
          <FilterButtons List={CATEGORY} setValue={setTheme} />
        </Div>
      </SearchArea>
      <Content>
        <GalleryList gallerys={gallerys}></GalleryList>
      </Content>
    </div>
  );
}

export default GalleryListPage;
