import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Div, Image, screenSizes } from "../styles/BaseStyles";
import { Input, SharpButton, NftCard, NftMake } from "../components";
import ReactDOM from "react-dom";
import { debounce } from "lodash";
import { useAccount } from "../hooks";
import { TestContract, MintTestContract } from "../web3Config";
import { getMetadata } from "../apis";

const NavDiv = styled.div`
  background-color: var(--grey-650);
  width: 100%;
  height: 120px;
`

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 4rem;
`

const NftListContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
`

const NftCol = styled(Div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 400px;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 25%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    width: 33.3333%
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 50%;
  }
  @media screen and (max-width: ${screenSizes.saseumSmall + "px"}) {
    width: 100%;
  }
`

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
`

const DumpDatas = [
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFRYYGBgaGhgYGBoaGhgYGhgYGBgZGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjQhISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDE0MTQxMf/AABEIALEBHAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADUQAAIBAgMFBwMDBAMBAAAAAAABAgMRBCExBRJBUWEGInGBkbHwE6HBMtHhFBVC8VJysiP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAQEAAgIDAQEBAAAAAAAAAQIRAxIhMQRBUSJhE//aAAwDAQACEQMRAD8A42wkOMJucewkOyQVhxCAEIZBXAGEIQA6QcabfAubOwm87NHSYbZcEu8rme/NnP20zi6cthsLKT0NOnsZ8Tp8NgYrOMUS/QZy6/K/jXPh/rm1sZO9yWjsJbyzyNLENxuRYfFd6xnPPppfDOIV2cWf2KuN2M4qTSzf2zX8nWQnkNJp3K/99M/R59PZM00raq/h0LNPYkrXfzI7KUFyI3Yd/J0c8McbPZMr6aZv9ilUwzVsuGfud5OmrFepgoS4IrP5P9F8P8cLKjLl8RG4M7xbOhy6FXG7DhLTJmmfyc37Z3xWOMaGNLFbOnD/AB6FaOHfHhqdE1Ky4rCJ5UnyZEo8FqV0cMwbBgsRBEOxigQhCQAQgUwgFCxCYgBxXGESBXEmMOgAhCEAMyShTu/wRo19hYVSnd6LMW9TObVZnbxubNwahFSas2jUw2bzKWKrW0IsPiszyt6ur13YxyOljFLNEFaskndozv7jYz605zT5dSOdVnP9WsVWUvYgwuH7135EeGovVl2L9R84q39RchMdVCvCTE5iqOJpTA3iv9Qkjdgrg5yGUyOQ6eQxxLGZNBlXeJITEVi46MZLNIysZs6m28rGhCZRx0msy871PpnMS35ZOJ2OrXg+Gn8mLicK4J5O/XkdbRmgq+GjNWaXQ3x+RZ8aRvw/xwbRGzosfsfcTkzAqRsduNzU7HNrNn2jEKwmaJIQhgB0EAPcBSYhwZSAHCQMRyQQ4hMAdBMBMe4A8VfI6rZWDUIb2d2jB2RT3qkVwvn5HWV9Mjl/I3yerfwZ7eqWKncowlLRX8i1VfAmjeMMmn5L3OWO3vFZSTynJrw18y1Gusox068SnDDOT7y4/LmlRopINchWjg2SxkNYfcuZ0C3hIjlCwcGBj3USwRCpB72YFTzQkshlmw20BIJZZv0EpksolepGzuBrMag2ISkivGZJGdwTUNCkW7ELlu66E0aqtdE6X3p501OO7I4fa+GcJta9TtlUVzG7QqPJaHV+NqzXHN5s/HXJDElRq+SI5TPQchMEFyBcigkuK5HvDpgKmkyIObAYAcWEmBEMkDGaEhwALCYUgbAGv2emlO3E6CvLmc1sOVqnPI6aGHcn0OL8if6dXgvIpTpOTyLVPBv/AC0NOnSihpx5M5rpv7dVowSyHVuA84v4wd0npjSHbAl4eY1uen3XJgot5BuRC55/MwXVtn6efQOBLv5/Odhb1s+JFKovD/eYovNZ6XuPgWU7Lm/moUSpGqpfi2n8hKfAVhcWVIinASdskGqgBVnG2iHhPr90TzjfgRKLv+n7jhJm4tWdvcp1KjhlquBbhbw8yhtODtdXfPIcnfgS8PDF3Zj9o8XFTSfItYe9+JxfaPGSnVk72SyXlyOr8Xx90x8+v8p54yPMhnjEYzbCSPS9I42n/VoX9VczbE1EVzAvqbZPTpuwOHL0HkZ2nYrtgsjeIRHPFRHyktwZImZqxyFLaKH60NLeHUjIe0gZbSD1obEpAb65mLPaDZC8XIqeOh3XZyovqpZN5ncKnZHB9gtn1HNVZq0bO1+p6M4HmflT/Tfx6+FSNPO4NZdC7uWK9eBy1tL2qLRHu3CnO2QMZg1DNWXuBFrW5K2iGq1HP9vtkCgTn58uD9PQjnUyssny/cgnW626W+w3023eOd9Vfh7IuZCda5XWWb1t8zChDVJ/vzs/UBrLklrw58h4Sjeyi7LjfXXR88kgB9NbX/gKM7c3w/0JK+dvNNWXLrcD4r8+tl9xBYhbj6X/AAHez09it9RLVPx19skSwm9dejXtYXAnjN8fcOcGwKduWfRe5PGfQSajjHmNOnkTLxJN264D6isGaUVJ8r6/uebbQq705PjdnpnaG1OjOeuXueV1q2872PS/Dz96c/m1+gJBIFMJSO5gceLGTE0INHDVi/CpkYEJtF2hVdjO5O1m1JPefi/cBtl+jh022+b9wcTQsa+07wlG46i2JI1dn0FIetcgZbi0SYXDynJRjqbtTZLnojT7O7DlGd2jLXmkz39nwWyuxO+k5tnRYbsTTi13TqtmUFFLIvOSucOvNq37VyKtLBRpwUYpIJIsy7xFBGG/lWaFxKuIRdkinXjrmY1rlj4mmVnUs7WsXMTO2iMerWk3ll1DM66I0JVLLh5/Myhi8Xk88+SH+m3nJ/chnOnDV38Fc0zhN1Ix6tSd3JviaWGxKilva6pfllatioTaSXG2eWZI6UZLLLp0Nbn4+YJrq3HFZPdeb4Xul4L8DYevvN9eaXO/8mS4NXtfl6FvDPcavp9+r6k3MPrYjLRWu1lz8yeKy5PjbkU44qOST1te/rl9vQszxUdU+H5+5lZR0NSPO3iv3C3HzyIJ1k2rO3TKwdOpbX14fwLlV1ZhPyaDjPn89CJ5/wC/lxlFX+exPAswl81+5cpq5Rw5p0o3QmerxzPbyuo4ZxvnJpWPLY0zte2mJdStuK+7D0b5mDDCnrfj/wCMSf1x7vazY4dkscIzXp4XoXaeFNL5anjChgmWYbP6G5DDdCzTw3Qzvkp8YdPZfQsf2tG7DDvkPVpPlwIvktKxx+HwzuWZ7OckXadSKLMMVFci7rXTkYsNgNm1szYe6Sw2hBcUTx2zBcUTrW6Phu4PZsFyNbD4SK0RyuG24pSUIZyeiR2ezsPJRTnqzn3LPtXf4s0oeRYhSiBYZsy9ofKsbi4FW1mx/qAOpcLewScKbKdZ8EW5u40aaMdNc3jLlhb5shls9X0NxU0VqtJphFTVecdr3OEklJpZteV/2OR+rKf66s0vOV81luprhd+R6j2h2aqkbpd5Xt58LHm+K2PVg2t2/J3s/NM9P8bWPXn7Z+Wa6q4Kq4yUbtq/vl+F9zdeL3ZLelZLK/kZ+GwcaS362vCKf/pkmBnN71Tdvd/LL5oaeTl+T8fY3qqTXPLho/S48INq/X7aFOdfeeUJdcnbyuamzaTfPzy8nY5NTjaBw9PevnxJKtWMI5tJdbGJtWrOFWVnZOzyvbqU8fCcqKqubaeSz0V7FZ8Pty9+KnXk9W4tow/xehPQ2ipf5ZrTP7Hn13fJs6XY2zJO0pJl+TwZzO9TnyXTqKeN3tPRe6LsJ73zO5nU8Hu8MzRwtCT1Rxak/TX2XMPY16UlYqYbB6ZGtRwnQzk+We9Ry+2Oz0Jtzjrx6mRDYvQ9Cnh7FKeHVzqz5LzjnsclDY/QsQ2R0OlVFCdMq7pcYcNlrkWYbORrKAyiT702fHAorYzBq68Pyzb3CljV3l4flhKTxOeKnd58X7g/Wm+LOlp7AbztqWYbAXI775cRElcjeb4svbO2bUqyUY5vkdZQ2Cr6Hcdnuz8KSU7Xk+PIy3+RJPhXrZ9qfZjsjCglOXenbXgvA6lUg7j7xw63dXtVID6YEoE1wWI1Guig69maeJjkc7jalnYeYqfLZhNMkdQ5/A7TilaUrGpHEKSvBpi1jgn2tqoKTvxM51WnqWI11zz6GfGnBTpJrMwdqYFtpQtd+GXU1sTXa/Tm3w4gUt9vq9X7ly8VOsPD9l01vVHvNPJWjJJdW43LkNmU1nZfOBuVIOK6WORx+3JqbjCKydnKWfor/c0k1oTXGjPCwvfd9idYRNXVkY9LbU1+uCl1T3fVGns3a0Kj3N1wn/xfFc0yLjUV7Ri7X2I3ecEnK2V1nfplkcy9nznFw32lfvRysnrk+GZ6s8KtW7nL7WwG5U34q8Zfq5xfPwNfH5bPhGpNMXZvZiEHvSTb65nT4XBJLJdENhK1NLW75czoMBQ3lvPjw5E73rV+SvMz4U8Pszi1maNLZ6RdhTJkjP1/rK6qGlh0izGIosTY5EW2lOCMqvHM1ZPIyq8rvzKEBANRAHXMDFuCUB4thJMAHdKON/UvD8s0NwpY2PeXh+WVCrLp4Vbqy4L2DjhC9Rh3Y+C9iRQCnLxFs/BpzV9FmdHGBm4BWuacRVNvTbg7gGh2TYOokgZhyIakhHFevyOW2zGz3kzpMRO17nK7Vrdyfg2Vj7aZc5XrZsl2ZthwlZyyevExK2K5EGHoVZy7kWdcxLPktV6VTrxmt6LuiaEraI5TY9GtTs5Zx5HU4aonq/nU5d49b8LzrsX8LBWvxZoQprVGPTrqLutOJo08TFrJmfBbUuKinF5HknaapJTnCNr72t7OPFNW1+x6jisYlFnm/aHCOpUcoPvP0yva75nT4OS/KL3jPW05Rg3rKMV5yZrdmv8A6zhmpSupytlbp0MHDbOrTut22ed8m7fjI7zsvs76UFd3k3eT4eCXCxr5fWZvPsZ1bXWuNonL7YlKTcba5avQ6iU+7YwtqzhCLnJrLrY4p9tJeOd2RBKtuclo+p6BhcopHk8cVJ1d+CzWadnutcU22k/FL3Oz2f2mgoP6l4SSzTulpqm1n5G+8X7Z3XXWqQ7qLizBqbepxpqpKW7F6X/ZZmdsnainJydSM95uyUk8rtrLhYz9bzpcdfCquY8qhyu0sdeK3I1JtytanGTvzz0XqS/1WJmkqdHdWm9UkopW1uldsJKLI6JYmO68zNpz3nfXPIq4bZVR3U5pJ67vPpfga9LDxirL15/yIfSKKbdiRU/VehI4Z8vyJ/YRIm7aeo6evL3Ct42+cRpJvohgrXzzRm7RvvLw/LNHd8vW5nbQfe04fljyVSUY92PgvYMUF3I+C9gm+Awlw07NrzL9OoZFSUo95J/uUFtSpGTvTnu31Sv7C50cdTvilM5z+8Tk7KE3yajJ+uQ9fGVp7u5Cdnr3Wv8A1YXKfq3Z1kitOurNtmUp4ia/Ru/9nb1Aex6so2niLNu9oQ06XbzFw+RDtfakYR8dFxfgc3UwlfEvdUZRj6HZw2NSVnJOcl/k3oXYwSskrF516/Q64nCdjlF3lmzaw+x1D9KszoUvIFx/3b3C7t+x1ztfZc5N2yXv5lWGx6kc4s6xrOzfQSitA9qOuPnhcT/xTXDP8EMoYlK/02/Br8nb7nFaDyp8/EXt/wAP2efzq1Gu9Ge9yaeV+SM2vSxEv0Qnqrd1+h6hGCvf8BbmjWX2Lzvn6FvXm+HwmMuk6L87Ry8b+5t4Oli4vddFeKnF+p1rhfzHUPUWt9/RS8Zawta2coLwuyP+xQk71G55aNtRXguPmbDjw/0N86EdHtaqUNnUoW3YK1raaeBLDCxTUtyPK9k3Yntp8QnxtmHSQRwkFZ7kE/8ArFPPXQkhRilZRjFLPRIlkvUSXHiACnZeOi0uKXPToE48wXJLqIyzev2GcL9BL7hX4sCAk+ISXPQS1uMpXdwAlms1kA1cKb6jSldZDBoxvmUcfLvLw/LLUp8EUMa3vLw/LHkrFygluR45L2DUOaGoQ7kb8lb0DguoUGivMKHReQ6jrkJy6CB4+nt6juT8hl4BWAGfMZv508QmvP5yH3QMDjcThzC+w8UANbx+cxOPEdxGsAPGPH0Gbu8h2JRyAE4jpP8AcSE07WAg6cBWJIoZvggAbCig+A1wAZx+4nHMSEtQMhMKw0kANcVuWQrD2ABzHlyHeQzAGtkLxHQziIFYUmBKQMmME3bIdKyG3OIMVcDNbiUMa+8vD8s1GihjY95eH5Y4TPofpXgvYKIhGlR+hTE9GIQgkpiiMIBTcRCEBiiMxCAFxQ6HEAMxkIQAcR2IQwEQhCBSGQ4gBkOIQALGEIAMFiEAISGEAFIZjCAAB4jiADegERCAHZUxmq8PyxCGH//Z",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-NZleEfY--f3Zu74zzxQqNtOaEJLKiTECw&usqp=CAU",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-NZleEfY--f3Zu74zzxQqNtOaEJLKiTECw&usqp=CAU",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-NZleEfY--f3Zu74zzxQqNtOaEJLKiTECw&usqp=CAU",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자"
  },
  {
    author: "사슴입니다.",
    description: "사슴의 NFT 입니다. 관통 프로젝트 시절 제가 느낀 감자의 모습을 담았습니다.",
    fileName: "파일네임이 뭘까?",
    image: "https://skywalker.infura-ipfs.io/ipfs/QmVHPPcKkiJAEYSEG4VFWZZEd21NjhDuNvtWfLpTVMUUm2",
    name: "하와이안 감자"
  },
]

function MyNftPage() {

  const [ account, nickname ] = useAccount();
  const [ metaDatas, setMetadatas ] = useState<any>();
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [viewPage, setViewPage] = useState(0);

  const setNftListPage = () => setViewPage(0); // NFT 목록 페이지로 세팅
  const setNftMakePage = () => setViewPage(1); // NFT 생성 페이지로 세팅

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    console.log(windowSize.width, windowSize.height)
  }, 200);

  const getData = async () => {
    const tokenURIs = await MintTestContract.methods.tokenURIsofWallet(window.ethereum.selectedAddress).call();
    const Metas = [];
    for (let i = 0; i < tokenURIs.length; i++) {
      const Meta = await getMetadata(tokenURIs[i]);
      Metas.push(Meta);
    }
    console.log('zzz',Metas)
    setMetadatas(Metas);
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [account])

  const NftCols = (num:any) => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(
        <NftCol>
            {
              metaDatas.map((metaData:any, index:any) => {
                if (index % num == i) {
                  return <NftCard key={index} {...metaData}/>
                }
              })
            }
        </NftCol>
      )
    }
    return result;
  };

  let viewContent;

  if (viewPage === 0) {
    viewContent = <>
    {
      metaDatas ? 
      <NftListContent>
        {
          windowSize.width > screenSizes.lg ? (
          <>
            {NftCols(4)}
          </>
          ) : null
        }
        {
          windowSize.width > screenSizes.md && windowSize.width <= screenSizes.lg ? (
            <>
              {NftCols(3)}
            </>
          ) : null
        }
        {
          windowSize.width > screenSizes.saseumSmall && windowSize.width <= screenSizes.md ? (
            <>
              {NftCols(2)}
            </>
          ) : null
        }
        {
          windowSize.width <= screenSizes.saseumSmall ? (
            <>
              {NftCols(1)}
            </>
          ) : null
        }
      </NftListContent> 
        : null
      }</>;
  } else {
    viewContent = <NftMake></NftMake>;
  }

  return (
    <Div bgColor="--grey-650" w="100vw" minHeight="100vh">
    <NavDiv></NavDiv>
    <ButtonSection>
      <SharpButton onClick={setNftListPage}>내 NFT 조회</SharpButton>
      <SharpButton onClick={setNftMakePage}>NFT 생성하기</SharpButton>
    </ButtonSection>
    <Content>
      {viewContent}
    </Content>
    </Div>
  );
}

export default MyNftPage;

// const ModalBackgroundDiv = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
//   background: rgba(0, 0, 0, 0.25);
// `;

// const modalActive = keyframes`
//   from { top: 10%; opacity: 0; }
//   to { top: 20%; opacity: 1; }
// `;

// const ModalDiv = styled.div`
//   position: fixed;
//   top: 20%;
//   height: 80%; 
//   left: 10%;
//   width: 80%;
//   z-index: 2;
//   &.modal-active {
//     animation: ${modalActive} 0.5s;
//   }
// `
// const ModalBackground = (props:any) => {
//   if (!props.modal) return null;
//   return <ModalBackgroundDiv onClick={props.offModal}></ModalBackgroundDiv>;
// };

// const ModalContent = (props:any) => {
//   if (!props.modal) return null;
//   return (
//     <ModalDiv onClick={props.offModal}>
//       <Div display="flex" justifyContent="space-between">
//         <Div w="35%">
//           <Image
//             w="100%"
//             src={`${props.nft.image}`}
//             alt={`${props.nft.title}`}
//           ></Image>
//         </Div>
//         <Div w="50%" display="flex" flexDirection="column">
//           <Div color="--grey-100" fontSize="60px" mb="24px">
//             {props.nft.title}
//           </Div>
//           <Div ml="20px" mb="56px" display="flex">
//             <Div mr="64px">
//               <Div color="--grey-400" fontSize="18px" mb="8px">제작자</Div>
//               <Div color="--grey-100" fontSize="24px">{props.nft.author}</Div>
//             </Div>
//             <Div>
//               <Div color="--grey-400" fontSize="18px" mb="8px">소유자</Div>
//               <Div color="--grey-100" fontSize="24px">{props.nft.owner}</Div>
//             </Div>
//           </Div>
//           <Div ml="20px" mb="56px">
//             <Div color="--grey-400" fontSize="30px" mb="12px">작품 설명</Div>
//             <Div ml="48px" color="--grey-100" fontSize="20px" >{props.nft.description}</Div>
//           </Div>
//           <Div ml="20px" mb="48px">
//             <Div color="--grey-400" fontSize="30px" mb="12px">거래 내역</Div>
//             {props.nft.history.map((deal:any) => (
//               <Div>
//                 <Div color="--grey-100" mb="8px">{deal.date.getFullYear()}년 {deal.date.getMonth() + 1}월 {deal.getDate()}일</Div>
//                 <Div ml="4px" display="flex" alignItems="center">
//                   <Div mr="12px" color="--grey-400" fontSize="16px">from</Div>
//                   <Div mr="84px" color="--grey-100" fontSize="16px">{deal.from}</Div>
//                   <Div mr="12px" color="--grey-400" fontSize="16px">to</Div>
//                   <Div mr="84px" color="--grey-100" fontSize="16px">{deal.to}</Div>
//                 </Div>
//               </Div>
//             ))}
//           </Div>
//           <Div display="flex" alignItems="center">
//             <Div display="flex" alignItems="center">
//               <Div color="--grey-100" fontSize="60px">{props.nft.price}</Div>
//               <Div color="--grey-400" fontSize="60px">SSF</Div>
//             </Div>
//             <Div>
//               <SharpButton fontSize="60px" width="400px" height="76px">판매하기</SharpButton>
//             </Div>
//           </Div>
//         </Div>
//       </Div>
//     </ModalDiv>
//   );
// }

// // 나의 NFT 목록

// function NftList(props:any) {

//   const [nft, setNft] = useState({}); // 디테일 볼 컨텐트
//   const [myNft, setMyNft] = useState([]); // 요청하여 nft 목록 받아올것
//   // const [firstRow, setFirstRow] = useState([]); // 첫번째 줄
//   // const [secondRow, setSecondRow] = useState([]); // 두번째 줄
//   // const [thirdRow, setThirdRow] = useState([]); // 세번째 줄
//   // const [forthRow, setForthRow] = useState([]); // 네번째 줄
//   const [modal, setModal] = useState(false); // 모달 활성화
//   const onModal = () => { // 모달 활성화
//     setModal(true);
//   };
//   const offModal = () => {
//     setModal(false);
//   };

//   // 이하 firstRow~ forthRow는 임시 확인용 변수

//   let firstRow: Array<object> = [
//     {
//       id: 1,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//       author: '작가이름',
//       owner: '소유주이름',
//     },
//     {
//       id: 2,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//   ];
//   let secondRow: Array<object> = [
//     {
//       id: 3,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//     {
//       id: 4,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//   ];
//   let thirdRow: Array<object> = [
//     {
//       id: 5,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//     {
//       id: 6,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//   ];
//   let forthRow: Array<object> = [
//     {
//       id: 7,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//     {
//       id: 8,
//       image: 'https://user-images.githubusercontent.com/97648026/190099927-687d3792-fc2a-43ce-a796-a4aef8441527.jpg',
//       title: '파이썬',
//       description: '이게 어떻게 파이썬;',
//     },
//   ];

//   useEffect(() => {
//     let tempFirst: Array<object> = [];
//     let tempSecond: Array<object> = [];
//     let tempThird: Array<object> = [];
//     let tempForth: Array<object> = [];

//     myNft.forEach(function (value, index) {
//       if (index % 4 === 0) {
//         tempFirst.push(value);
//       } else if (index % 4 === 1) {
//         tempSecond.push(value);
//       } else if (index % 4 === 2) {
//         tempThird.push(value);
//       } else {
//         tempForth.push(value);
//       }
//     });

//     firstRow = tempFirst;
//     secondRow = tempSecond;
//     thirdRow = tempThird;
//     forthRow = tempForth;
//   }, [myNft]);

//   let modalBackground = document.getElementById("modal-background") as HTMLElement;
//   let modalContent = document.getElementById("modal-content") as HTMLElement;

//   return (
//     <div>
//       <>
//         {ReactDOM.createPortal(
//           <ModalBackground modal={modal} offModal={offModal} />,
//           modalBackground
//         )}
//         {ReactDOM.createPortal(
//           <ModalContent modal={modal} nft={nft} offModal={offModal} />,
//           modalContent
//         )}
//       </>
//       <Div display="flex" justifyContent="space-between">
//         <Div w="400px" display="flex" flexDirection="column">
//           {firstRow.map((nft, index) => (
//             <NftCard nft={nft} onClick={()=>{console.log('click'); setNft(nft); onModal()}} key={index}></NftCard>
//           ))}
//         </Div>
//         <Div w="400px" display="flex" flexDirection="column">
//           {secondRow.map((nft, index) => (
//             <NftCard nft={nft} onClick={()=>{setNft(nft); onModal()}} key={index}></NftCard>
//           ))}
//         </Div>
//         <Div w="400px" display="flex" flexDirection="column">
//           {thirdRow.map((nft, index) => (
//             <NftCard nft={nft} onClick={()=>{setNft(nft); onModal()}} key={index}></NftCard>
//           ))}
//         </Div>
//         <Div w="400px" display="flex" flexDirection="column">
//           {forthRow.map((nft, index) => (
//             <NftCard nft={nft} onClick={()=>{setNft(nft); onModal()}} key={index}></NftCard>
//           ))}
//         </Div>
//       </Div>
//     </div>
//   );
// }

// // NFT 생성하기

// function NftMake(props:any) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState();

//   return (
//     <div>
//       <Div display="flex" flexDirection="column">
//         <form>
//           <Div display="flex">
//             <Div flex="7" display="flex" flexDirection="column">
//               <Div borderBottom="3px solid #1d1d1d">
//                 <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px" mt="12px">이름</Div>
//                 <Div fontSize="--h4" ml="12px" mb="30px">
//                   <Input fontSize="--h4" value={title} setValue={setTitle}></Input>
//                 </Div>
//               </Div>
//               <Div>
//                 <Div fontWeight="--bold" fontSize="--h4" ml="12px" mt="24px" mb="24px">작가명</Div>
//               </Div>
//               <Div bgColor="--grey-650" color="--grey-100" pl="24px" pt="24px" pb="24px" pr="24px" mb="30px">
//                 <Div fontSize="--h4">(로그인한 유저 명)</Div>
//               </Div>
//               <Div>
//                 <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px">설명</Div>
//                 <Div ml="12px">
//                   <Input fontSize="--h4" value={description} setValue={setDescription}></Input>
//                 </Div>
//               </Div>
//             </Div>
//             <Div flex="3" borderLeft="3px solid #1d1d1d" p="20px">
//               <Div fontWeight="--bold" fontSize="--h4" mb="16px" ml="12px">파일</Div>
//               <Div fontSize="--h4" mb="160px" ml="20px">미디어 파일만 올려주세요.</Div>
//               <Div ml="auto" mr="auto" mb="36px" h="400px" w="400px" border="3px dashed #1d1d1d" display="flex" alignItems="center" justifyContent="center" onClick={() => console.log("click")}>
//                 <div>
//                   <Image alt="plus_vector" src="https://user-images.githubusercontent.com/97648026/191902640-fb114b10-38bf-4ab9-834f-526067ac997d.png"></Image>
//                 </div>
//               </Div>
//             </Div>
//           </Div>
//           <Div display="flex" justifyContent="center" alignItems="center" h="140px" borderTop="3px solid #1d1d1d">
//             <Div mr="15%">
//               <SharpButton width="250px" height="80px" fontSize="--h5">취소하기</SharpButton>
//             </Div>
//             <Div>
//               <SharpButton width="250px" height="80px" fontSize="--h5" type="submit">저장하기</SharpButton>
//             </Div>
//           </Div>
//         </form>
//       </Div>
//     </div>
//   );
// }

// const MyNftPage = () => {

//   const [viewPage, setViewPage] = useState(0);

//   const setNftListPage = () => setViewPage(0); // NFT 목록 페이지로 세팅
//   const setNftMakePage = () => setViewPage(1); // NFT 생성 페이지로 세팅

//   let viewContent;

//   if (viewPage === 0) {
//     viewContent = <NftList></NftList>;
//   } else {
//     viewContent = <NftMake></NftMake>;
//   }

//   return (
//     <div>
//       <Div h="120px"></Div>
//       <Div pl="124px" pr="124px" bgColor="#1d1d1d">
//         <Div mt="64px" mb="64px" display="flex">
//           <Div mr="20px">
//             <SharpButton onClick={setNftListPage}>나의 NFT 목록</SharpButton>
//           </Div>
//           <Div>
//             <SharpButton onClick={setNftMakePage}>NFT 생성하기</SharpButton>
//           </Div>
//         </Div>
//         {viewContent}
//       </Div>
//     </div>
//   );
// };

// export default MyNftPage;
