import React, { useState, useEffect } from "react";
import { Div, Image } from "../../styles/BaseStyles";
import { Input, SharpButton, Loading } from "../";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { TestContract, MintTestContract } from "../../web3Config";
import styled from "styled-components";
import { useAccount } from "../../hooks";

interface Ipfs {
  cid: object;
  path: string;
}

const DataArea = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextArea = styled.div``;

const FileArea = styled.div`
  flex: 3;
  border-left: 3px solid #1d1d1d;
  padding: 20px;

  @media (max-width: 992px) {
    flex: 2;
  }

  @media (max-width: 768px) {
    border-top: 3px solid #1d1d1d;
    border-left: 0px;
  }
`;

const NftImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const NftVideo = styled.video`
  /* object-fit: contain; */
  width: 100%;
  height: 100%;
`;

function NftMake(props: any) {
  const [image, setImage] = useState<Ipfs | any>("");
  const [json, setJson] = useState<Ipfs | string>("");
  const [file, setFile] = useState("");
  const [account, nickname] = useAccount();
  const [type, setType] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [helpText, setHelpText] = useState<string>("helpText");

  // IPFS 키
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const projectSecretKey = process.env.REACT_APP_PROJECT_SECRET_KEY;
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

  // IPFS 호출
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  // 민팅 함수
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setHelpText("IPFS 생성중입니다.");
    const form = event.target;
    console.log(form);

    const files = form[2].files;

    if (!files || form[0].value === 0) {
      return alert("작품이름을 입력해 주세요");
    }
    if (!files || form[1].value === 0) {
      return alert("작품설명을 입력해주세요");
    }
    if (!files || files.length === 0) {
      return alert("선택된 파일이 없어요");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setImage({
      cid: result.cid,
      path: result.path,
    });
    console.log(result.path);

    // setLoadingIpfs(true);

    const Json = await ipfs.add(
      JSON.stringify({
        fileName: `${result.path}.json`,
        name: form[0].value,
        author: nickname,
        description: form[1].value,
        image: "https://skywalker.infura-ipfs.io/ipfs/" + result.path,
        type: file.type,
      })
    );
    console.log("1", Json);
    setJson(Json.path);

    form.reset();
    setFile("");

    // setLoadingMeta(true);

    setHelpText("서명해주세요");

    const response = await MintTestContract.methods
      .create(
        window.ethereum.selectedAddress,
        "https://skywalker.infura-ipfs.io/ipfs/" + Json.path
      )
      .send({ from: window.ethereum.selectedAddress });

    console.log(response);

    // setLoadingMint(true);
    setLoading(false);
    // await setTimeout(() => {
    //   setLoading(false);
    //   setLoadingIpfs(false);
    //   setLoadingMeta(false);
    //   setLoadingMint(false);
    //   setFile("");
    // }, 1000);
  };

  // 이미지 업로드
  const onChange = (e: any) => {
    const fileType = ["image/gif", "image/png", "image/jpeg", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const file = e.target.files[0];
    if (!fileType.includes(file.type)) {
      return alert("이미지만 업로드 가능합니다.");
    }

    if (maxSize < file.size) {
      return alert("파일은 최대 10MB까지 업로드 가능합니다.");
    }

    if (file.type === "video/mp4") {
      setType(true);
    } else {
      setType(false);
    }
    setFile(URL.createObjectURL(file));
  };

  return (
    <>
      {loading && <Loading HelpText={helpText} />}
      <Div display="flex" flexDirection="column" bgColor="--grey-100">
        <form onSubmit={onSubmitHandler}>
          <DataArea>
            <Div flex="7" display="flex" flexDirection="column">
              <Div borderBottom="3px solid #1d1d1d">
                <Div
                  fontWeight="--bold"
                  fontSize="--h4"
                  mb="16px"
                  ml="12px"
                  mt="12px"
                >
                  이름
                </Div>
                <Div fontSize="--h4" ml="12px" mb="30px">
                  <Input fontSize="--h4"></Input>
                </Div>
              </Div>
              <Div>
                <Div
                  fontWeight="--bold"
                  fontSize="--h4"
                  ml="12px"
                  mt="24px"
                  mb="24px"
                >
                  작가명
                </Div>
              </Div>
              <Div
                bgColor="--grey-650"
                color="--grey-100"
                pl="24px"
                pt="24px"
                pb="24px"
                pr="24px"
                mb="30px"
              >
                <Div fontSize="--h4">{nickname}</Div>
              </Div>
              <Div>
                <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px">
                  설명
                </Div>
                <Div ml="12px">
                  <Input fontSize="--h4"></Input>
                </Div>
              </Div>
            </Div>
            <FileArea>
              <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px">
                파일
              </Div>
              <Div fontSize="--h4" mb="160px" ml="20px">
                미디어 파일만 올려주세요.
              </Div>

              <label
                htmlFor="file"
                style={{ cursor: "pointer", margin: "auto" }}
              >
                {file ? (
                  <Div
                    ml="auto"
                    mr="auto"
                    mb="36px"
                    h="400px"
                    w="400px"
                    border="3px dashed #1d1d1d"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => console.log("click")}
                  >
                    {type ? (
                      <NftVideo autoPlay src={file} muted></NftVideo>
                    ) : (
                      <NftImage src={file} alt="preview image" />
                    )}
                  </Div>
                ) : (
                  <Div
                    ml="auto"
                    mr="auto"
                    mb="36px"
                    h="400px"
                    w="400px"
                    border="3px dashed #1d1d1d"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => console.log("click")}
                  >
                    <div>
                      <Image
                        alt="plus_vector"
                        src="https://user-images.githubusercontent.com/97648026/191902640-fb114b10-38bf-4ab9-834f-526067ac997d.png"
                      ></Image>
                    </div>
                  </Div>
                )}
              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept=".jpg, .jpeg, .mp4, .gif, .png"
                onChange={onChange}
                style={{ display: "none" }}
              />
            </FileArea>
          </DataArea>
          <Div
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="140px"
            borderTop="3px solid #1d1d1d"
          >
            <Div mr="15%">
              <SharpButton
                width="250px"
                height="80px"
                fontSize="--h5"
                type="button"
              >
                취소하기
              </SharpButton>
            </Div>
            <Div>
              <SharpButton width="250px" height="80px" fontSize="--h5">
                저장하기
              </SharpButton>
              {json && (
                <a
                  href={`https://skywalker.infura-ipfs.io/ipfs/${json}`}
                  target="blank"
                >
                  주소
                </a>
              )}
            </Div>
          </Div>
        </form>
      </Div>
    </>
  );
}

export default NftMake;
