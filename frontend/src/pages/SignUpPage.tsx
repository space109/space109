import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Div, screenSizes } from "../styles/BaseStyles";
import { Input, SharpButton, NavArea } from "../components";
import { dupCheck, join, login } from "../apis";
import { useAccount } from "../hooks";
import { useNavigate } from "react-router-dom";

interface PropsStyle {
  imgURL?: any;
}

const DivWidth = styled(Div)`
  max-width: 600px;

  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 60%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 76%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    width: 92%;
  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {
  }
`;

const Img = styled.div<PropsStyle>`
  border: 3px solid black;
  width: 100px;
  height: 100px;
  background-image: url("${({ imgURL }) => imgURL}");
`;

const BackGround = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--grey-150);
`
interface Props {
  account?: any;
}

// account가 없을 시 return 해버리기
// account가 이미 있는 회원가입 되어있는 애도 return 해주기.
function SignUpPage() {
  const [nickname, setNickname] = useState("");
  const [helpMsg, setHelpMsg] = useState("\u00A0");
  const [color, setColor] = useState("--grey-650");
  const navigate = useNavigate();

  const [account, logined] = useAccount();

  const dupCheckClick = async () => {
    if (!nickname) {
      setColor("--carmine-100");
      setHelpMsg("닉네임은 비어있을 수 없습니다.");
      return;
    }
    const isDup = await dupCheck(nickname);
    if (isDup) {
      setColor("--carmine-100");
      setHelpMsg("중복된 닉네임 입니다.");
    } else {
      setColor("--spinach-300");
      setHelpMsg("사용 가능한 닉네임 입니다.");
    }
  };

  const signUpClick = async () => {
    if (helpMsg === "사용 가능한 닉네임 입니다.") {
      const isJoin = await join(account, nickname);
      if (isJoin) {
        console.log("성공했당");
        alert("성공적으로 가입되었습니다.");
        navigate("/");
        // 메인으로 이동시키기 이전꺼 기억 가넝.,.?
      } else {
        console.log("회원가입실패");
        alert("회원가입에 실패하였습니다");
      }
    } else if (helpMsg === "\u00A0") {
      setColor("--carmine-100");
      setHelpMsg("닉네임 중복 확인을 해주세요.");
    }
  };

  const nicknameCheck = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const nameData = await login(accounts[0]);
      if (nameData.length) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setColor("--grey-650");
    setHelpMsg("\u00A0");
  }, [nickname]);

  useEffect(() => {
    nicknameCheck();
  }, []);

  return (
    <BackGround>
      <NavArea />
      <Div
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="calc(100vh - 240px)"
      >
        <DivWidth display="flex" flexDirection="column" gap="2rem">
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="0.5rem"
          >
            <Div fontSize="--h3" fontWeight="--bold">
              닉네임 등록하기
            </Div>
            <Div fontSize="--h7" fontWeight="--thin" color="--carmine-100">
              ※ 닉네임은 추후 변경이 불가능합니다. 신중히 선택해주세요.
            </Div>
          </Div>
          <Div display="flex" flexDirection="column" gap="0.5rem">
            <Div display="flex" borderRadius="4px">
              <Input
                fontSize="--h5"
                fontWeight="--regular"
                borderRadius="4px 0 0 4px"
                borderWidth="3px"
                borderColor={color}
                borderStyle="solid none solid solid"
                placeholder="닉네임을 입력해주세요."
                setValue={setNickname}
              />
              <SharpButton
                fontSize="--h5"
                width="150px"
                height="auto"
                borderRadius="0 4px 4px 0"
                bg={color}
                borderWidth="3px"
                borderColor={color}
                onClick={dupCheckClick}
              >
                중복확인
              </SharpButton>
            </Div>
            <Div
              fontSize="--h7"
              fontWeight="--thin"
              color={color}
              pl="calc(calc(var(--h5) / 1.5) + 3px)"
            >
              {helpMsg}
            </Div>
          </Div>
          <SharpButton
            fontSize="--h5"
            fontWeight="--bold"
            width="100%"
            height="69px"
            borderWidth="3px"
            borderRadius="4px"
            bg="--grey-650"
            borderColor="--grey-650"
            onClick={signUpClick}
          >
            회원가입
          </SharpButton>
        </DivWidth>
      </Div>
    </BackGround>
  );
}

export default SignUpPage;
