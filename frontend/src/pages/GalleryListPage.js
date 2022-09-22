// import { useState } from "react";
// import styled from "styled-components";
// import { create } from "ipfs-http-client";
// import { FileUpload } from 'react-ipfs-uploader'

// interface Props {}

// // type Props = {};

// const NavArea = styled.div`
//   height: 120px;
//   background: var(--grey-600);
// `;
// const Icon = styled.div`
//   height: 100px;
//   width: 100px;
//   background: var(--grey-300);
// `;

// function GalleryListPage() {
//   const [nickname, setNickname] = useState("");
//   const [account, setAccount] = useState("");

//   // ipfs 세팅
//   const [fileUrl, updateFileUrl] = useState(``);
//   const [image, setImage] = useState<any>(null);

//   const client = create();

//   const onChange = async (e: any) => {
//     const file = e.target.files[0];
//     setImage(URL.createObjectURL(file));
//     try {
//       const added = await client.add(file);
//       const url = `https://ipfs.io/ipfs/${added.path}`;
//       updateFileUrl(url);
//     } catch (error) {
//       console.log("Error uploading file: ", error);
//     }
//   };

//   const dupCheck = () => {
//     console.log(nickname);
//   };

//   const EXTENSION_DOWNLOAD_URL = "https://metamask.io";

//   const walletConnect = async () => {
//     try {
//       if (typeof window.ethereum !== "undefined") {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(accounts[0]);
//       } else {
//         if (window.confirm("노 메타마스크. 설치 고?")) {
//           window.open(EXTENSION_DOWNLOAD_URL, "_blank");
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 계정이 바뀌면 account의 상태 업데이트
//   if (typeof window.ethereum !== "undefined") {
//     window.ethereum.on("accountsChanged", function (accounts: any) {
//       setAccount(accounts[0]);
//     });
//   }

//   return (
//     <div>
//       <NavArea />
//       {/* <GalleryCard theme="SSAFY" title="제목: 여름엔 해변으로!" />
//       <SharpButton onClick={walletConnect}>지갑연결</SharpButton>
//       <SharpButton onClick={() => console.log(account)}>계정출력</SharpButton> */}
//       <label>
//         {image ? <img src={image} alt="preview image" /> : <Icon />}
//       </label>
//       <input type="file" name="file" onChange={onChange} id="fileInput" />
//       {fileUrl && <img src={fileUrl} width="600px" />}
//     </div>
//   );
// }

// export default GalleryListPage;

import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styled from "styled-components";

const NavArea = styled.div`
  height: 120px;
  background: var(--grey-600);
`;

const client = create("https://ipfs.infura.io:5001/api/v0");

const GalleryListPage = () => {
  const [file, captureFile] = useState(null);
  const [url, setUrl] = useState([]);

  const fileCapture = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    window.Buffer = window.Buffer || require("buffer").Buffer;

    reader.onloadend = () => {
      captureFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const created = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      console.log(url);
      setUrl((nextUrl) => [nextUrl, url]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <NavArea></NavArea>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={fileCapture} /> //This button collects the
        image for upload
        <button type="submit">Submit</button>//Submit collected image to ipfs
      </form>

      <div className="display">
        {url.length !== 0 ? (
          url.map((el) => <img src={el} alt={url} />)
        ) : (
          <h3>Post Image to Ipfs</h3>
        )}
      </div>
    </div>
  );
};

export default GalleryListPage;
