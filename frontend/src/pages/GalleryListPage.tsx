import React from "react";
import styled from "styled-components";
import GalleryCard from "../components/Card/GalleryCard";

// type Props = {};

const NavArea = styled.div`
  height: 120px;
  background: var(--grey-600);
`;

function GalleryListPage() {
  return (
    <div>
      <NavArea />
      <GalleryCard theme="SSAFY" title="제목: 여름엔 해변으로!" />
    </div>
  );
}

export default GalleryListPage;
