import React, { useState } from "react";
import { Div, Image } from "../../styles/BaseStyles";
import { SharpButton, Loading } from "../";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { SsafyNFTContract } from "../../web3Config";
import styled from "styled-components";
import { useAccount } from "../../hooks";

interface Ipfs {
  cid: object;
  path: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--grey-100);
  max-width: 1800px;
  width: 100%;

  border-radius: 2px;
`;

const DataArea = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Textarea = styled.textarea`
  all: unset;
  padding: 20px 24px 20px 24px;
  width: calc(100% - 48px);
  font-size: var(--h5);
  ::placeholder {
    color: var(--grey-300);
  }
`;

const Input = styled.input`
  all: unset;
  width: calc(100% - 48px);
  height: 100%;
  padding: 20px 24px 20px 24px;
  font-size: var(--h5);

  ::placeholder {
    color: var(--grey-300);
  }
`;

const FileArea = styled.div`
  flex: 3;
  border-left: 3px solid #1d1d1d;

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

const ImageArea = styled.div`
  margin: 60px 60px 60px 60px;
  aspect-ratio: 1;
  min-width: 300px;
  border: 3px dashed #1d1d1d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageArea = styled.div`
  color: var(--carmine-100);
  font-size: var(--body);
  font-weight: var(--medium);
  margin: 5px 10px;
`;

function NftMake(props: any) {
  const [image, setImage] = useState<Ipfs | any>("");
  const [json, setJson] = useState<Ipfs | string>("");
  const [file, setFile] = useState("");
  const [account, nickname] = useAccount();
  const [type, setType] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [helpText, setHelpText] = useState<string>("???????????? ???????????? ?????????");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [descriptionMessage, setDescriptionMessage] = useState<string>("");
  const [fileMessage, setFileMessage] = useState<string>("");
  const [active, setActive] = useState<any>("");

  // IPFS ???
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const projectSecretKey = process.env.REACT_APP_PROJECT_SECRET_KEY;
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

  // IPFS ??????
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  // ?????? ??????
  const NftMint = async (Json: any) => {
    try {
      await SsafyNFTContract.methods
        .create(
          window.ethereum.selectedAddress,
          "https://skywalker.infura-ipfs.io/ipfs/" + Json.path
        )
        .send({ from: window.ethereum.selectedAddress });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ?????? ??????
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();

    const form = event.target;

    const files = form[2].files;

    if (!files || form[0].value.length === 0) {
      setNameMessage("???????????? ???????????????.");
      return;
    }
    if (!files || form[1].value.length === 0) {
      setDescriptionMessage("????????? ???????????????.");
      return;
    }
    if (!files || files.length === 0) {
      setFileMessage("???????????? ???????????????.");
      return;
    }
    setActive("start");
    setLoading(true);
    setHelpText("IPFS ??????????????????");

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setImage({
      cid: result.cid,
      path: result.path,
    });

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
    setJson(Json.path);

    form.reset();
    setFile("");

    setHelpText("?????? ??????????????????");
    await NftMint(Json);
    setActive("end");
    console.log("???");
    setTimeout(() => {
      console.log("???2");
      setLoading(false);
      props.setCheck((pre: any) => !pre);
    }, 2000);
  };

  // ????????? ?????????
  const onChange = (e: any) => {
    const fileType = ["image/gif", "image/png", "image/jpeg", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const file = e.target.files[0];
    setFileMessage("");
    if (!fileType.includes(file.type)) {
      return alert("gif, jpg, jpeg, png ????????? ????????? ???????????????.");
    }

    if (maxSize < file.size) {
      return alert("????????? ?????? 10MB?????? ????????? ???????????????.");
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
      {/* {loading && <GalleryLoading HelpText={helpText} animationName={active} />} */}
      <Container>
        <form onSubmit={onSubmitHandler}>
          <DataArea>
            <Div flex="7" display="flex" flexDirection="column">
              <Div borderBottom="3px solid #1d1d1d">
                <Div
                  fontWeight="--bold"
                  fontSize="--h5"
                  pl="12px"
                  pt="20px"
                  // pb="20px"
                  pr="12px"
                  flexDirection="row"
                  display="flex"
                >
                  ????????? <MessageArea>{nameMessage}</MessageArea>
                </Div>
                <Div>
                  <Input
                    placeholder="???????????? ??????????????????."
                    onChange={() => setNameMessage("")}
                  ></Input>
                </Div>
              </Div>
              <Div>
                <Div
                  fontWeight="--bold"
                  fontSize="--h5"
                  pl="12px"
                  pt="20px"
                  pb="20px"
                  pr="12px"
                >
                  ?????????
                </Div>
              </Div>
              <Div
                bgColor="--grey-650"
                color="--grey-100"
                pl="24px"
                pt="20px"
                pb="20px"
                pr="24px"
              >
                <Div fontSize="--h5">{nickname}</Div>
              </Div>
              <Div>
                <Div
                  fontWeight="--bold"
                  fontSize="--h5"
                  pl="12px"
                  pt="20px"
                  // pb="20px"
                  pr="12px"
                  flexDirection="row"
                  display="flex"
                >
                  ?????? <MessageArea>{descriptionMessage}</MessageArea>
                </Div>
                <Div h="100%">
                  <Textarea
                    placeholder="????????? ??????????????????."
                    onChange={() => setDescriptionMessage("")}
                  />
                </Div>
              </Div>
            </Div>
            <FileArea>
              <Div
                fontWeight="--bold"
                fontSize="--h5"
                pl="12px"
                pt="20px"
                pb="20px"
                pr="12px"
                flexDirection="row"
                display="flex"
              >
                ????????? <MessageArea>{fileMessage}</MessageArea>
              </Div>

              <label
                htmlFor="file"
                style={{ cursor: "pointer", margin: "auto" }}
              >
                {file ? (
                  <ImageArea>
                    {type ? (
                      <NftVideo autoPlay src={file} muted></NftVideo>
                    ) : (
                      <NftImage src={file} alt="preview image" />
                    )}
                  </ImageArea>
                ) : (
                  <ImageArea>
                    <div>
                      <Image
                        alt="plus_vector"
                        src="https://user-images.githubusercontent.com/97648026/191902640-fb114b10-38bf-4ab9-834f-526067ac997d.png"
                      ></Image>
                    </div>
                  </ImageArea>
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
            h="100px"
            borderTop="3px solid #1d1d1d"
          >
            <Div>
              <SharpButton
                width="200px"
                height="50px"
                fontSize="--h5"
                fontWeight="--semi-bold"
                borderColor="--grey-650"
                borderWidth="3px"
                bg="--grey-650"
              >
                ????????????
              </SharpButton>
            </Div>
          </Div>
        </form>
      </Container>
    </>
  );
}

export default NftMake;
