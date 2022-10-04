import React, { useState, useEffect, useCallback, Suspense } from "react";
import styled from "styled-components";
import {
  DropDown,
  SharpButton,
  NavArea,
  Input,
  CropModal,
} from "../components";
import { Div } from "../styles/BaseStyles";
import { myGalleryInfo, myGalleryInfoUpdate } from "../apis";
import { useLocation } from "react-router-dom";

interface Props {}

const BorderBox = styled(Div)`
  border-left: 0.3rem black solid;
`;

export default function ProfilePage({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<any>("");
  const [optionData, setOptionData] = useState<string>("");
  const [data, setData] = useState<any>("");
  const [file, setFile] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<string>("");
  const [isOpend, setIsOpend] = useState<any>(false);
  const [check, setCheck] = useState<any>(false);
  const [category, setCategory] = useState<any>(10);
  const [isOnModal, setIsOnModal] = useState(false);

  const eth = window?.ethereum;
  const location = useLocation();

  const openModal = () => {
    setIsOnModal(true);
  };
  const closeModal = () => {
    setIsOnModal(false);
  };

  const isOpendHandler = (data: string): void => {
    setIsOpend(data);
  };
  const categoryHandler = (data: string): void => {
    setCategory(data);
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // setFile(file);
      setFileImage(URL.createObjectURL(file));
      openModal();
    }
  };

  const getName = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await loadData(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async (oa: string) => {
    setLoading(true);
    const data = await myGalleryInfo(oa);
    console.log(oa);
    console.log("로드 데이터", data[0]);
    setTitle(data[0].title);
    setDescription(data[0].description);
    setThumbnail(process.env.REACT_APP_BACKEND_HOST2 + data[0].thumbnail);
    setData(data[0]);

    setLoading(false);
  };

  const updateData = {
    oa: eth.selectedAddress,
    category_id: 4,
    title: title,
    description: description,
    thumbnail: file,
    isOpen: true,
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();

    Object.entries(updateData).forEach((item) =>
      formData.append(item[0], item[1])
    );
    const data = await myGalleryInfoUpdate(formData);
  };

  useEffect(() => {
    getName();
    console.log("랜더", check);
    return () => {
      console.log("언마운트", check);
      setThumbnail("");
    };
  }, []);

  return (
    <>
      {isOnModal && (
        <CropModal
          closeModal={closeModal}
          file={file}
          fileImage={fileImage}
          setFile={setFile}
          setFileImage={setFileImage}
          setThumbnail={setThumbnail}
        />
      )}
      <NavArea />
      <form onSubmit={submitHandler}>
        <Div w="100vw" h="calc(100vh - 120px)" display="flex">
          <Div
            bgColor="--grey-100"
            w="20%"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Div fontSize="--h1" mt="200px" fontWeight="--bold">
              {title}
            </Div>

            <Div mt="30px">
              <SharpButton
                width="195px"
                height="63px"
                fontSize="--h4"
                fontWeight="--semi-bold"
                borderWidth="3px"
                type="button"
              >
                입장하기
              </SharpButton>
            </Div>
          </Div>
          <Div w="80%" bgColor="--grey-100">
            <Div w="100%" h="100%">
              <BorderBox
                h="8%"
                w="100%"
                bgColor="--grey-100"
                boxSizing="border-box"
              ></BorderBox>
              <Div h="84%" display="flex">
                <Div
                  w="65%"
                  borderTop="4px black solid"
                  borderBottom="4px black solid"
                  borderLeft="4px black solid"
                >
                  <Div
                    h="9%"
                    bgColor="--grey-100"
                    boxSizing="border-box"
                    display="flex"
                  >
                    <Div
                      w="50%"
                      h="100%"
                      borderRight="4px black solid"
                      fontSize="--h4"
                      fontWeight="--semi-bold"
                      display="flex"
                      alignItems="center"
                    >
                      <Div ml="10px">공개여부</Div>
                    </Div>
                    <Div
                      w="50%"
                      h="100%"
                      fontSize="--h4"
                      fontWeight="--semi-bold"
                      display="flex"
                      alignItems="center"
                    >
                      <Div ml="10px">갤러리 테마</Div>
                    </Div>
                  </Div>
                  <Div
                    h="9%"
                    bgColor="--grey-100"
                    boxSizing="border-box"
                    borderTop="4px black solid"
                    display="flex"
                  >
                    <Div w="50%" h="100%" borderRight="4px black solid">
                      <DropDown
                        w="100%"
                        h="calc((100vh - 120px) * 0.032)"
                        dataFunc={isOpendHandler}
                        options={["ON", "OFF"]}
                        fontSize="--h4"
                      >
                        공개여부를 선택하세요
                      </DropDown>
                    </Div>
                    <Div w="50%" h="100%">
                      <DropDown
                        w="100%"
                        h="calc((100vh - 120px) * 0.032)"
                        dataFunc={categoryHandler}
                        options={["바다", "가을"]}
                        color="--grey-750"
                        hoverBg="--grey-750"
                        bg="--grey-100"
                        fontSize="--h4"
                        hoverColor="--grey-100"
                      >
                        테마를 선택하세요
                      </DropDown>
                    </Div>
                  </Div>
                  <Div
                    h="15%"
                    bgColor="--grey-100"
                    boxSizing="border-box"
                    borderTop="4px black solid"
                  >
                    <Div
                      fontSize="--h4"
                      fontWeight="--semi-bold"
                      ml="10px"
                      pt="10px"
                    >
                      <Div>제목</Div>
                      <input
                        type="text"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        value={title}
                      />
                    </Div>
                  </Div>
                  <Div
                    h="54%"
                    bgColor="--grey-100"
                    boxSizing="border-box"
                    borderTop="4px black solid"
                  >
                    {" "}
                    <Div
                      fontSize="--h4"
                      fontWeight="--semi-bold"
                      ml="10px"
                      pt="10px"
                    >
                      <Div>설명</Div>
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                      />
                    </Div>
                  </Div>
                  <Div
                    h="13%"
                    bgColor="--grey-100"
                    boxSizing="border-box"
                    borderTop="4px black solid"
                  >
                    <Div
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                      h="100%"
                      ml="300px"
                      mr="300px"
                    >
                      <SharpButton
                        type="button"
                        width="195px"
                        height="63px"
                        fontSize="--h4"
                        fontWeight="--semi-bold"
                        borderColor="--grey-750"
                        borderWidth="0.2rem"
                      >
                        갤러리 편집
                      </SharpButton>
                      <SharpButton
                        width="195px"
                        height="63px"
                        fontSize="--h4"
                        bg="--grey-100"
                        color="--grey-750"
                        fontWeight="--semi-bold"
                        borderColor="--grey-750"
                        borderWidth="0.2rem"
                      >
                        저장
                      </SharpButton>
                    </Div>
                  </Div>
                </Div>
                <Div
                  w="35%"
                  borderRight="4px black solid"
                  borderTop="4px black solid"
                  borderBottom="4px black solid"
                  borderLeft="4px black solid"
                >
                  <Div m="auto" border="10px solid red">
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      <Div border="10px solid blue" w="20rem" h="24rem">
                        <img
                          alt={`Uploaded`}
                          src={thumbnail}
                          style={{ width: "100%" }}
                        />
                      </Div>
                    </label>
                    {/* <label htmlFor="file" style={{ cursor: "pointer" }}>
                    {file && thumbnail ? (
                      <Div border="10px solid yellow" w="20rem" h="24rem">
                        <>
                        {console.log(file)}
                        {console.log(fileImage)}
                        <img
                          src={fileImage}
                          alt="preview image"
                          style={{ width: "100%" }}
                        />
                        </>
                      </Div>
                    ) : (
                      <Div border="10px solid blue" w="20rem" h="24rem">
                        <img
                          alt={`Uploaded #`}
                          src={thumbnail}
                          style={{ width: "100%" }}
                        />
                      </Div>
                    )}
                  </label> */}

                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={onFileChange}
                      style={{ display: "none" }}
                      accept=".jpg, .png"
                    />
                  </Div>
                </Div>
              </Div>
              <BorderBox h="8%" w="100%" bgColor="--grey-100"></BorderBox>
            </Div>
          </Div>
          <Div bgColor="--grey-100" w="7%"></Div>
        </Div>
      </form>
    </>
  );
}
