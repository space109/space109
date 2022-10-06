import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../.././assets/close-icon.png";
import { useAccount } from "../../hooks";
import { Div } from "../../styles/BaseStyles";
import { SharpButton } from "../Button";
const modalActive = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 5%;
  left: 25%;
  width: 50%;
  z-index: 100;
  overflow: hidden;
  height: 90%;
  background-image: url("/wall_texture.png");
  border-radius: 10px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.25);
  &.community-overlay {
    animation: ${modalActive} 0.5s;
  }
`;

const Img = styled.img`
  width: 7%;
  position: absolute;
  right: 35px;
  top: 35px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 15%;
  height: 15%;
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 50%;
  color: white;
  border: none;
  border-radius: 8px;
  resize: none;
  font-size: 24px;
  font-weight: var(--semi-bold);
  background-color: var(--grey-550);
  opacity: 0.8;
  line-height: 24px;
  overflow: auto;
  height: auto;
  padding: 8px;
  box-shadow: 0px 4px 10px -8px black;
  &::placeholder {
    color: var(--grey-250);
  }
  &:focus {
    outline: none;
  }
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
  width: 28%;
`;

const InnerDiv = styled.div`
  width: 90%;
  margin-top: 9%;
  box-shadow: 1px 1px 2px 0.2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.05, 1.05);
  }

  background-color: #ddc;
  border: solid 2vmin #eee;
  border-bottom-color: #fff;
  border-left-color: #eee;
  border-radius: 2px;
  border-right-color: #eee;
  border-top-color: #ddd;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25) inset,
    0 2px 4px 2px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: inline-block;
  margin: 1.3vh 1.2vw;
  padding: 2vmin;
  position: relative;
  text-align: center;
  &:before {
    border-radius: 2px;
    bottom: -1vmin;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
    content: "";
    left: -1vmin;
    position: absolute;
    right: -1vmin;
    top: -1vmin;
  }
  &:after {
    border-radius: 2px;
    bottom: -1vmin;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    content: "";
    left: -1vmin;
    position: absolute;
    right: -1vmin;
    top: -1vmin;
  }
`;

const TextDiv = styled(Div)`
  word-wrap: break-word;
`;

const TitleDiv = styled(TextDiv)`
  font-size: var(--h6);
  font-weight: bold;
  margin-bottom: 10px;
`

const CommunityOverlay = (props) => {
  const [textVal, setTextVal] = useState({
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 10,
  });
  const [ownerAddress, nickname] = useAccount();
  if (!props.open) return null;
  const handleChange = (e) => {
    const lineHeight = 24;

    const prevRows = e.target.rows;
    e.target.rows = textVal.minRows;

    const curRows = ~~(e.target.scrollHeight / lineHeight);

    if (curRows === prevRows) {
      e.target.rows = curRows;
    }

    if (curRows >= textVal.maxRows) {
      e.target.rows = textVal.maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setTextVal({
      value: e.target.value,
      rows: curRows < textVal.maxRows ? curRows : textVal.maxRows,
      maxRows: textVal.maxRows,
      minRows: textVal.minRows,
    });
  };


  return (
    <>
      <ModalDiv className="community-overlay" overflow="hidden">
        <Div display="flex" justifyContent="center" mt="7%" mb="3%">
          <LogoImg src="/favicon.ico" />
        </Div>
        <Img src={closeIcon} alt="" onClick={props.toggleOpen} />
        <Div
          display="flex"
          justifyContent="center"
          position="absolute"
          w="100%"
        >
          <Textarea
            onChange={handleChange}
            value={textVal.value}
            rows={textVal.rows}
            autoFocus
            placeholder="후기를 남겨보세요!"
          ></Textarea>
          <Div
            display="flex"
            position="absolute"
            bottom="-60px"
            w="20%"
            justifyContent="center"
            zIndex="100"
          >
            <SharpButton
              width="100%"
              onClick={(e) => {
                e.preventDefault();
                props.addCommentHandler(textVal.value);
                setTextVal({ value: "", rows: 1, minRows: 1, maxRows: 10 });
              }}
            >
              댓글 달기
            </SharpButton>
          </Div>
        </Div>
        <Div
          display="flex"
          justifyContent="center"
          overflow="scroll"
          mt="11%"
          h="60%"
        >
          <RowDiv>
            {props.post?.map((item, idx) => {
              if (idx % 3 === 0)
                return (
                  <InnerDiv>
                    <TitleDiv>작성자:{item?.NICKNAME ? item.NICKNAME : "익명"}</TitleDiv>
                    <TextDiv>{item.DESCRIPTION}</TextDiv>
                  </InnerDiv>
                );
            })}
          </RowDiv>
          <RowDiv>
            {props.post?.map((item, idx) => {
              if (idx % 3 === 1)
                return (
                  <InnerDiv>
                    <TitleDiv>작성자:{item.NICKNAME}</TitleDiv>
                    <TextDiv>{item.DESCRIPTION}</TextDiv>
                  </InnerDiv>
                );
            })}
          </RowDiv>
          <RowDiv>
            {props.post?.map((item, idx) => {
              if (idx % 3 === 2)
                return (
                  <InnerDiv>
                    <TitleDiv>작성자:{item.NICKNAME}</TitleDiv>
                    <TextDiv>{item.DESCRIPTION}</TextDiv>
                  </InnerDiv>
                );
            })}
          </RowDiv>
        </Div>
        {!props.disabled && <Div position="absolute" bottom="3%" right="3%">
          <SharpButton bg="--carmine-100" borderRadius="20px" width="70px" height="70px" fontSize="--h7" onClick={props.resetCommentHandler}>RESET</SharpButton>
        </Div>}
      </ModalDiv>
    </>
  );
};

export default CommunityOverlay;
