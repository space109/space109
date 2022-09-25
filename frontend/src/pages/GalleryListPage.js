import { useState } from "react";
import styled from "styled-components";
import { GalleryList } from "../components";

const NavArea = styled.div`
  height: 120px;
  background: var(--grey-650);
`;
const Icon = styled.div`
  height: 100px;
  width: 100px;
  background: var(--grey-300);
`;

const SearchArea = styled.div`
  height: 200px;
  background: var(--grey-650);
`

function GalleryListPage() {
  // ipfs 세팅

  return (
    <div>
      <NavArea />
      <SearchArea />
      <GalleryList></GalleryList>
    </div>
  );
}

export default GalleryListPage;
