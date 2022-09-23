import { useState } from "react";
import styled from "styled-components";
import IpfsUploader from "../components/IpfsUploader/IpfsUploader";

const NavArea = styled.div`
  height: 120px;
  background: var(--grey-600);
`;
const Icon = styled.div`
  height: 100px;
  width: 100px;
  background: var(--grey-300);
`;

function GalleryListPage() {
  // ipfs 세팅

  return (
    <div>
      <NavArea />
      <IpfsUploader />
    </div>
  );
}

export default GalleryListPage;
