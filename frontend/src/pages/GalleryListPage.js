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
  const [ searchValue, setSearchValue ] = useState();
  const [ theme, setTheme ] = useState(0);
  
  // 필터링과 검색어에 따라 보여줄 갤러리 정보 깎는 함수
  // if문 너무 더럽다ㅠ 나중에 수정
  const getGallerys = async (theme, searchValue) => {
    // 테마 필터 버튼이 눌려있을 경우
    if (theme) {
      const datas = await getGalleryThemeList(theme);
      // 검색어가 있을 경우
      if (searchValue) {
        let result = [];
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].description.includes(searchValue) || datas[i].title.includes(searchValue)) {
            result.push(datas[i]);
          }
        }
        setGallerys(result);
      } 
      // 검색어가 없을 경우
      else {
        setGallerys(datas);
      }
    }
    // 전체 선택 인 경우 
    else {
      const datas = await getGalleryList();
      if (searchValue) {
        let result = [];
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].description.includes(searchValue) || datas[i].title.includes(searchValue)) {
            result.push(datas[i]);
          }
        }
        setGallerys(result);
      }
      else {
        setGallerys(datas);
      } 
    }
  }

  useEffect(() => {
    getGallerys(theme, searchValue);
  }, [theme, searchValue])

  return (
    <div>
      <Background>
      </Background>
      <NavArea />
      <SearchArea>
        <Div w="60%">
          <SearchBar setValue={setSearchValue}/>
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
