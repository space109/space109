import { useState } from "react";
import styled from "styled-components";
<<<<<<< HEAD
import IpfsUploader from "../components/Ipfs/IpfsUploader";
=======
import { IpfsUploader } from "../components";
>>>>>>> 0dbd47fa59146e1c41515fee4c22fbcf503fc82e

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
