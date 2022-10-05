import React, { useState, useEffect, useCallback, Suspense } from "react";
import styled from "styled-components";
import { SharpButton, NavArea, CropModal, SelectBox } from "../components";
import { Div } from "../styles/BaseStyles";
import { myGalleryInfo, myGalleryInfoUpdate, login, resetGallery } from "../apis";
import { useNavigate } from "react-router-dom";
import { CategoryTitle, CategoryId } from "../common/category";

interface Props {
  load: any;
}

const BorderBox = styled(Div)`
  border-left: 0.3rem var(--grey-650) solid;
`;

const Input = styled.input`
  all: unset;
  font-size: var(--h5);
  width: 100%;
  ::placeholder {
    color: var(--grey-300);
  }
`;

const InputDiv = styled.div`
  display: flex;
  align-items: start;
  padding-top: 3px;
  height: 50%;
`;

const TextDiv = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
  font-size: var(--h5);
  font-weight: var(--semi-bold);
`;

const Textarea = styled.textarea`
  all: unset;
  width: 100%;
  height: 100%;
  font-size: var(--h5);
  ::placeholder {
    color: var(--grey-300);
  }
`;

const Thumbnail = styled.div`
  width: 22.5rem;
  height: 27rem;
  border: 8px solid var(--grey-100);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  :hover {
    opacity: 0.5;
  }
`;

const TitleDiv = styled.div`
  text-align: right;
  font-size: var(--h3);
  font-weight: var(--bold);
`;

const CATEGORY = [
  "판타지",
  "팝아트",
  "봄",
  "캘리그라피",
  "추상",
  "여름",
  "사물",
  "게임",
  "가을",
  "일상",
  "일러스트",
  "겨울",
  "기타",
];

export default function ProfilePage({ load }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>("");
  const [file, setFile] = useState(null);
  const [fileImage, setFileImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<string>("");
  const [isOpend, setIsOpend] = useState<any>(true);
  const [category, setCategory] = useState<any>(13);
  const [isOnModal, setIsOnModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [textIsOpend, setTextIsOpend] = useState("");
  const [textCategory, setTextCategory] = useState("");

  const eth = window?.ethereum;

  const openModal = () => {
    setIsOnModal(true);
  };
  const closeModal = () => {
    setIsOnModal(false);
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      e.target.value = ""; // value 리셋(같은 파일 올려도 작동되도록)
      setFileImage(URL.createObjectURL(file));
      openModal();
    }
  };

  const loadData = useCallback(async (oa: string) => {
    setLoading(true);
    const data = await myGalleryInfo(oa);
    setTitle(data[0].title);
    setDescription(data[0].description);
    setThumbnail(
      process.env.REACT_APP_BACKEND_HOST +
        data[0].thumbnail +
        "?" +
        new Date().getTime()
    );
    setFile(data[0].thumbnail);
    setIsOpend(data[0].is_open);
    setCategory(data[0].category_id);
    setData(data[0]);

    data[0].is_open ? setTextIsOpend("ON") : setTextIsOpend("OFF");
    setTextCategory(CategoryTitle(data[0].category_id));

    setLoading(false);
  }, []);

  const ResetGalleryFunc = async () => {
    console.log("머임");
    const data = await resetGallery(eth?.selectedAddress);
    if (data > 1 ) {
      alert("모든 액자를 내렸습니다.");
    } else if (data === 1) {
      alert("이미 비어있는 갤러리 입니다.");
    } else if (data === 0) {
      alert("에러");
    }
  };

  const getNickname = async () => {
    const nameData = await login(eth.selectedAddress);
    if (nameData.length) {
      setNickname(nameData[0].nickname);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadData(eth?.selectedAddress);
      getNickname();
    }, 100);
  }, [eth.selectedAddress, loadData]);

  const InputOnChange = (e: any) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const TextAreaOnChange = (e: any) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const updateData = {
    oa: eth.selectedAddress,
    category_id: category,
    title: title,
    description: description,
    thumbnail: file,
    isOpen: isOpend,
  };

  useEffect(() => {
    if (textIsOpend === "ON") {
      setIsOpend(true);
    } else if (textIsOpend === "OFF") {
      setIsOpend(false);
    }
    setCategory(CategoryId(textCategory));
  }, [textIsOpend, textCategory]);

  const submitHandler = async () => {
    const formData = new FormData();

    Object.entries(updateData).forEach((item) =>
      formData.append(item[0], item[1])
    );

    const data = await myGalleryInfoUpdate(formData);
    if (data) {
      alert("성공적으로 저장되었습니다");
    } else {
      alert("저장에 실패하였습니다");
    }
  };

  const navigate = useNavigate();

  const GoEditVirtualGallery = () => {
    load();
    setTimeout(() => {
      navigate(`/edit-virtual-gallery/${data.gallery_id}`);
    }, 2000);
  };

  const GoMyGallery = () => {
    load();
    setTimeout(() => {
      navigate(`/virtual-gallery/${data.gallery_id}`);
    }, 2000);
  };

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

      <Div w="100vw" h="calc(100vh - 120px)" display="flex">
        <Div
          bgColor="--grey-100"
          w="20%"
          display="flex"
          alignItems="end"
          flexDirection="column"
          mt="2rem"
          gap="2rem"
        >
          <Suspense fallback={null}>
            <TitleDiv>{!loading && `${nickname} 님의 공간`}</TitleDiv>
          </Suspense>
          <SharpButton
            width="240px"
            height="60px"
            fontSize="--h4"
            fontWeight="--semi-bold"
            borderRadius="0"
            onClick={GoMyGallery}
            bg="--grey-650"
          >
            입장하기
          </SharpButton>
          <SharpButton
            width="240px"
            height="60px"
            fontSize="--h4"
            fontWeight="--semi-bold"
            borderRadius="0"
            bg="--grey-650"
            onClick={GoEditVirtualGallery}
          >
            갤러리 편집하기
          </SharpButton>
          <SharpButton
            width="240px"
            height="60px"
            fontSize="--h4"
            fontWeight="--semi-bold"
            borderRadius="0"
            bg="--grey-100"
            color="--mandarin-300"
            onClick={ResetGalleryFunc}
          >
            갤러리 비우기
          </SharpButton>
        </Div>
        <Div w="80%" bgColor="--grey-100">
          <Div w="100%" h="100%">
            <BorderBox
              h="8%"
              w="100%"
              bgColor="--grey-100"
              boxSizing="border-box"
            ></BorderBox>
            <Div h="71%" display="flex">
              <Div
                w="65%"
                borderTop="4px var(--grey-650) solid"
                borderBottom="4px var(--grey-650) solid"
                borderLeft="4px var(--grey-650) solid"
              >
                <Div
                  h="16%"
                  bgColor="--grey-100"
                  boxSizing="border-box"
                  display="flex"
                >
                  <Div
                    w="100%"
                    h="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <TextDiv
                      style={{
                        padding: "0 0 0 1rem",
                        borderBottom: "4px solid var(--grey-650)",
                      }}
                    >
                      공개여부
                    </TextDiv>
                    <SelectBox
                      options={["OFF", "ON"]}
                      labelText={textIsOpend}
                      setValue={setTextIsOpend}
                    />
                  </Div>
                  <Div
                    borderLeft="4px solid var(--grey-650)"
                    w="100%"
                    h="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <TextDiv
                      style={{
                        padding: "0 0 0 1rem",
                        borderBottom: "4px solid var(--grey-650)",
                      }}
                    >
                      갤러리 테마
                    </TextDiv>
                    <SelectBox
                      options={CATEGORY}
                      labelText={textCategory}
                      setValue={setTextCategory}
                    />
                  </Div>
                </Div>
                <Div
                  h="16%"
                  bgColor="--grey-100"
                  boxSizing="border-box"
                  borderTop="4px var(--grey-650) solid"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  pl="1rem"
                  pr="1rem"
                >
                  <TextDiv>제목</TextDiv>
                  <InputDiv>
                    <Input
                      placeholder="갤러리 제목을 입력해주세요"
                      value={title}
                      onChange={InputOnChange}
                    />
                  </InputDiv>
                </Div>
                <Div
                  h="8%"
                  bgColor="--grey-100"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  borderTop="4px var(--grey-650) solid"
                  pl="1rem"
                  pr="1rem"
                >
                  <TextDiv>설명</TextDiv>
                </Div>
                <Div
                  h="59%"
                  bgColor="--grey-100"
                  boxSizing="border-box"
                  pl="1rem"
                  pr="1rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Textarea
                    placeholder="갤러리에 대한 설명을 입력해주세요"
                    value={description}
                    onChange={TextAreaOnChange}
                  />
                </Div>
              </Div>
              <Div
                w="35%"
                borderRight="4px var(--grey-650) solid"
                borderTop="4px var(--grey-650) solid"
                borderBottom="4px var(--grey-650) solid"
                borderLeft="4px var(--grey-650) solid"
              >
                <Div
                  h="8%"
                  bgColor="--grey-100"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  pl="1rem"
                  pr="1rem"
                >
                  <TextDiv>썸네일</TextDiv>
                </Div>
                <Div
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  h="92%"
                >
                  <label htmlFor="file" style={{ cursor: "crosshair" }}>
                    <Thumbnail>
                      <img
                        alt={`Uploaded #`}
                        src={thumbnail}
                        style={{ width: "100%" }}
                      />
                    </Thumbnail>
                  </label>
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
            <Div
              h="13%"
              bgColor="--grey-100"
              boxSizing="border-box"
              borderLeft="4px var(--grey-650) solid"
              borderRight="4px var(--grey-650) solid"
              borderBottom="4px var(--grey-650) solid"
            >
              <Div
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="12rem"
                h="100%"
              >
                <SharpButton
                  onClick={() => loadData(eth?.selectedAddress)}
                  width="240px"
                  height="60px"
                  fontSize="--h5"
                  fontWeight="--semi-bold"
                  borderColor="--grey-650"
                  borderWidth="3px"
                  bg="--grey-650"
                >
                  취소하기
                </SharpButton>
                <SharpButton
                  width="240px"
                  height="60px"
                  fontSize="--h5"
                  bg="--grey-100"
                  color="--grey-650"
                  fontWeight="--semi-bold"
                  borderColor="--grey-650"
                  borderWidth="3px"
                  onClick={submitHandler}
                >
                  저장하기
                </SharpButton>
              </Div>
            </Div>
            <BorderBox h="8%" w="100%" bgColor="--grey-100"></BorderBox>
          </Div>
        </Div>
        <Div bgColor="--grey-100" w="7%"></Div>
      </Div>
    </>
  );
}
