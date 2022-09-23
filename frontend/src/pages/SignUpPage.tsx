import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Div, screenSizes } from "../styles/BaseStyles";
import { Input } from "../components";
import SharpButton from "../components/Button/SharpButton";
import { dupCheck, join, getMetadata } from "../apis";
import { TestContract, MintTestContract } from "../web3Config";
import { create as ipfsHttpClient } from "ipfs-http-client";

interface PropsStyle {
  color?: any,
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
`

interface Props {
  account?: any,
};

//----
interface Ipfs {
  cid: object;
  path: string;
}
//---

// account가 없을 시 return 해버리기
// account가 이미 있는 회원가입 되어있는 애도 return 해주기.
function SignUpPage() {
  const [ nickname, setNickname ] = useState("");
  const [ helpMsg, setHelpMsg ] = useState("\u00A0");
  const [ color, setColor] = useState("--grey-650");

  // const [ text, setText ] = useState("ㅋㅋ");
  //-------------------------
  const projectId = "2F6WFaN05FMtbO93ODOLhwvE6EY";
  const projectSecretKey = "1998e51a7c7b5c7a15c51d493138c943";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

  const [image, setImage] = useState<Ipfs | any>("");
  const [json, setJson] = useState<Ipfs | string>("");
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  const [file, setFile] = useState("");

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setImage({
      cid: result.cid,
      path: result.path,
    });

    form.reset();

    const Json = await ipfs.add(
      JSON.stringify({
        fileName: `${result.path}.json`,
        name: "NFT name",
        author: "imukyee",
        description: "설명",
        image: "https://skywalker.infura-ipfs.io/ipfs/" + result.path,
      })
    );
    setJson(Json.path);


    const response = await MintTestContract.methods.create(
      window.ethereum.selectedAddress, 
      "https://skywalker.infura-ipfs.io/ipfs/" + Json.path
    ).send({from: window.ethereum.selectedAddress});

    console.log(response);
  };

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };
  //-------------------
  const textClick = async () => {
    const response = await MintTestContract.methods.create(
      window.ethereum.selectedAddress, 
      "https://skywalker.infura-ipfs.io/ipfs/QmZN1tGPjx8kLpMBEUjxhfGwW3qphu49i5KuBLeF2tiMzM"
    ).send({from: window.ethereum.selectedAddress});

    console.log(response);
  }


  const aaaa = async () => {
    const totalNum = await MintTestContract.methods.balanceOf(window.ethereum.selectedAddress).call();
    console.log("myTotalNum: ",totalNum);
    const total = await MintTestContract.methods.totalSupply().call();
    console.log(total);
    const tokenIds = await MintTestContract.methods.tokenIDsofWallet(window.ethereum.selectedAddress).call();
    console.log(tokenIds);
    const tokenURIs = await MintTestContract.methods.tokenURIsofWallet(window.ethereum.selectedAddress).call();
    console.log(tokenURIs);
    // for (let i = 1; i < totalNum+1; i++) {
    //   const tokenId = await MintTestContract.methods.tokenOfOwnerByIndex(window.ethereum.selectedAddress, i).call();
    //   console.log(tokenId);
    // }
  }
  // useEffect(() => {
  //   (async function () {
  //     console.log("있나?")
  //     const text = await TestContract.methods.current().call();
  //     setText(text);
  //   })();
  // }, [])

  // const textClick = async () => {
  //   console.log('테스트', window.ethereum.selectedAddress);
  //   const result = await TestContract.methods.write(nickname).send({from: window.ethereum.selectedAddress});
  //   if (!result) {
  //     console.log('안됐대');
  //     return;
  //   }
  //   const text = await TestContract.methods.current().call();
  //   setText(text);
  // }

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
  }

  const signUpClick = async () => {
    if (helpMsg === "사용 가능한 닉네임 입니다.") {
      const isJoin = await join(window.ethereum.selectedAddress, nickname);
      // const isJoin = await join(account, nickname);
      if (isJoin) {
        console.log('성공했당');
        // 메인으로 이동시키기 이전꺼 기억 가넝.,.?
      } else {
        console.log('회원가입실패');
      }
    } else if (helpMsg === "\u00A0") {
      setColor("--carmine-100");
      setHelpMsg("닉네임 중복 확인을 해주세요.");
    }
  }

  useEffect(() => {
    setColor("--grey-650");
    setHelpMsg("\u00A0");
  }, [nickname])

  return (
    <>
    <Div 
      display="flex"
      alignItems="center" justifyContent="center"
      h="calc(100vh - 120px)"
    >      
      <DivWidth 
        display="flex" flexDirection="column" gap="2rem"
      >
        <Div 
          display="flex" flexDirection="column" 
          alignItems="center" justifyContent="center"
          gap="0.5rem"
        >
          <Div fontSize="--h3" fontWeight="--bold">
            닉네임 등록하기
          </Div>
          <Div fontSize="--h7" fontWeight="--thin" color="--carmine-100">
          ※ 닉네임은 추후 변경이 불가능합니다. 신중히 선택해주세요.
          </Div>
        </Div>
        <Div 
          display="flex" flexDirection="column"
          gap="0.5rem"
        >
          <Div display="flex"  borderRadius="4px">
            <Input fontSize="--h5" fontWeight="--regular" borderRadius="4px 0 0 4px"
              borderWidth="3px" borderColor={color} borderStyle="solid none solid solid"
              placeholder="닉네임을 입력해주세요." setValue={setNickname}
            />
            <SharpButton 
              fontSize="--h5" width="150px" height="auto" borderRadius="0 4px 4px 0" bg={color}
              borderWidth="3px" borderColor={color}
              onClick={dupCheckClick}
            >
              중복확인
            </SharpButton>
          </Div>
          <Div fontSize="--h7" fontWeight="--thin" color={color} pl="calc(calc(var(--h5) / 1.5) + 3px)">
            {helpMsg}
          </Div>
        </Div>
        <SharpButton 
          fontSize="--h5" fontWeight="--bold"
          width="100%" height="69px" 
          borderWidth="3px" borderRadius="4px" bg="--grey-650"
          borderColor="--grey-650"
          onClick={signUpClick}
        >
          회원가입
        </SharpButton>
      </DivWidth>
    </Div>
    <SharpButton onClick={textClick}>버튼</SharpButton>
    <SharpButton onClick={aaaa}>보기</SharpButton>
    {ipfs && (
        <>
          <h3>Upload file to IPFS</h3>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              {file ? (
                <img
                  src={file}
                  alt="preview image"
                  style={{ maxWidth: "400px", margin: "15px" }}
                />
              ) : (
                <img
                  alt={`Uploaded #`}
                  src={
                    "https://skywalker.infura-ipfs.io/ipfs/QmZBMUfWxHG86SCy8ZXfrTnK26PFpvevujEZ8cmfB6VL8N"
                  }
                  style={{ maxWidth: "400px", margin: "15px" }}
                />
              )}
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={onChange}
              style={{ display: "none" }}
            />
            <SharpButton>NFT 민팅</SharpButton>
          </form>
        </>
      )}
      {image && (
        <img
          alt={`Uploaded #`}
          src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
          style={{ maxWidth: "400px", margin: "15px" }}
        />
      )}

      <br></br>
      {json && (
        <a
          href={`https://skywalker.infura-ipfs.io/ipfs/${json}`}
          target="blank"
        >
          주소
        </a>
      )}
    </>
  );
}

export default SignUpPage;
