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
  box-shadow: -1px 3px 5px rgba(0, 0, 0, 0.5);
`;

const Container = styled(Div)`
  box-sizing: border-box;
  width: 100%;
  max-width: 1800px;

  margin: 0 auto;

  @media (max-width: 1920px) {
    width: calc(100vw - 120px);
  }
  @media (max-width: 1366px) {
    width: calc(100vw - 64px);
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--grey-150);
  z-index: -10;
`;

const FilterDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 40px 0 50px 0;
`;

const Content = styled.div`
  box-sizing: border-box;
`;

const SearchDiv = styled.div`
  margin: 0 auto;
  width: 60%;
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 80%;
  }
`;

function GalleryListPage({ load }) {
  const [gallerys, setGallerys] = useState();
  const [searchValue, setSearchValue] = useState();
  const [theme, setTheme] = useState(0);

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
          if (
            datas[i].description.includes(searchValue) ||
            datas[i].title.includes(searchValue)
          ) {
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
          if (
            datas[i].description.includes(searchValue) ||
            datas[i].title.includes(searchValue)
          ) {
            result.push(datas[i]);
          }
        }
        setGallerys(result);
      } else {
        setGallerys(datas);
      }
    }
  };

  useEffect(() => {
    getGallerys(theme, searchValue);
  }, [theme, searchValue]);

  return (
    <>
      <Background></Background>
      <NavArea />

      <SearchArea>
        <Container>
          <SearchDiv>
            <SearchBar setValue={setSearchValue} />
          </SearchDiv>
          <FilterDiv>
            <FilterButtons List={CATEGORY} setValue={setTheme} />
          </FilterDiv>
        </Container>
      </SearchArea>
      <Container>
        <Content>
          <GalleryList gallerys={gallerys} load={load}></GalleryList>
          {/* <GalleryList></GalleryList> */}
        </Content>
      </Container>
    </>
  );
}

export default GalleryListPage;
