import {useState, useRef, useEffect} from 'react';
import styled, {css, keyframes} from 'styled-components';
import { Div } from '../../styles/BaseStyles';
import closeIcon from "../../assets/close-icon.png";
import { getMetadata } from "../../apis";


interface PropsStyle {
  isOnAlarm?: any,
  url?: any;
  isClose?: any;
}

const SlideOn = keyframes`
  from {
    height: 0;
  }
  to {
    height: 360px;
  }
`;

const SlideOff = keyframes`
from {
  height: 360px;
  opacity: 1;
}
to {
  height: 0;
  opacity: 1;
}
`;

const SellAlarmDiv = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 500px;
  ${({isClose}) => {
    if (!isClose) {
      return css`
        height: 360px;
        animation: ${SlideOn} .6s;
      `
    } else {
      return css`
        height: 0;
        animation: ${SlideOff} .6s;
        opacity: 0;
      `
    }
  }}
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  background-color: var(--grey-200);
  box-shadow: -5px -5px 15px rgba(0, 0, 0, 0.4);
  z-index: 1;
  `

const ContentDiv = styled.div<PropsStyle>`
  margin: 5px 36px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.trans {
    color: transparent;
  }

  transition: .3s;
`

const TotalItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  overflow: scroll;
  margin: 1rem 0;
  gap: 1rem;
`

const ItemDiv = styled.div`
  display: flex;
  gap: 1rem;
  background-color: var(--grey-150);
  border-radius: 10px;
`

const Img = styled.img`
  width: 8%;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  z-index: 10;
`;

const NFTImg = styled.div<PropsStyle>`
  width: 120px;
  height: 120px;
  background-image: url('${(props) => props.url}');
  background-size: cover;
  border-radius: 10px 0 0 10px;
`

const Item = ({data}:any) => {

  const [meta, setMeta] = useState<any>();

  const getData = async () => {
    const meta = await getMetadata(data.METADATA);
    setMeta(meta);
  }
  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return (<>
    <ItemDiv>
    <NFTImg url={meta?.image}/>
    <Div display="flex" flexDirection="column" gap=".5rem" fontSize="--h7" 
      pt=".5rem" fontWeight="--semi-bold"
    >
      <Div display="flex">
        <Div color="--grey-500">ID :&nbsp;</Div>
        <Div>{`#` + data.TOKEN_ID.toString().padStart(4, '0')}</Div>
      </Div>
      <Div display="flex">
        <Div color="--grey-500">작품 제목 :&nbsp;</Div>
        <Div>{meta?.name}</Div>
      </Div>
      <Div display="flex">
        <Div color="--grey-500">제작자 :&nbsp;</Div>
        <Div>{meta?.author}</Div>
      </Div>
    </Div>
  </ItemDiv>
  </>);
}

const SellAlarm = ({closeAlarm, datas, isOnAlarm}:any) => {
  const [transClass, setTransClass] = useState("");
  const [isClose, setIsClose] = useState<any>(false);

  const alarm = useRef<any>();

  const onClickHandler = () => {
    setTransClass("trans")
    setIsClose(true);
  }

  return (
    <>
    <SellAlarmDiv isClose={isClose} ref={alarm}>
      <ContentDiv className={transClass}>
        <Img src={closeIcon} onClick={onClickHandler} alt={`닫기 아이콘`} />
        <Div fontSize="--h5" fontWeight="--bold">새로운 판매 알림!</Div>
        <TotalItemDiv>
          {
            datas ? datas.map((data:any, i:any) => {
              return <Item key={i} data={data}/>
            }) : null
          }
        </TotalItemDiv>
        <Div fontSize="--h5" style={{alignSelf: "end"}} fontWeight="--bold">총 {datas.length}개가 팔렸습니다</Div>
      </ContentDiv>
    </SellAlarmDiv>
    </>
  );
}

export default SellAlarm;
