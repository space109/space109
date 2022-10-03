import {useState, useRef, useEffect} from 'react';
import styled, {css, keyframes} from 'styled-components';
import { Div } from '../../styles/BaseStyles';

interface PropsStyle {
  isOpen?: any;
  Last?: any;
  ref?: any;
  height?: any;
  liHeight?: any;
}

const StyledSelect = styled.div<PropsStyle>`
  width: 100%;
  height: 50%;
  cursor: pointer;
  box-sizing: border-box;
  z-index: 1;
  font-size: var(--h5);
  font-weight: var(--semi-bold);
  display: flex
  flex-direction: column;
`

const Label = styled.button<PropsStyle>`
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1rem solid var(--grey-100);
  width: 100%;
  height: 100%;
  background-color: white;
  :hover {
    background-color: var(--grey-650);
    color: var(--grey-100);
    border-color: var(--grey-650);
  }

  ${({isOpen}) => {
    if(isOpen) {
      return css`
        background-color: var(--grey-650);
        border-color: var(--grey-650);
        color: var(--grey-100);
      `
    } else {
      return css``
    }
  }}
  transition: .3s;
`

const StyledUl = styled.ul<PropsStyle>`
  all: unset;
  top: ${({height}) => height}px;
  display: flex;
  flex-direction: column;
  background-color: var(--grey-650);
  box-sizing: border-box;
  width: 100%;
  color: var(--grey-100);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  ${({isOpen, liHeight}) => {
    if(isOpen) {
      if (liHeight > 200) {
        return css`
          height: 200px;
        `
      } else {
        return css`
          height: ${liHeight}px;
        `
      }
    } else {
      return css`
        height: 0;
      `
    }
  }}

  ${({liHeight}) => {
    if(liHeight > 200) {
      return css`
        transition: height ${0.02 * (200/10)}s;
      `
    } else {
      return css`
        transition: height ${0.02 * (liHeight/10)}s;
      `
    }
  }}
  border-radius: 0 0 4px 4px;
`

const StyledLi = styled.li<PropsStyle>`
  all: unset;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  border-bottom: ${({Last}) => Last ? 0 : `1px dashed var(--grey-100)`};
  :hover {
    background-color: var(--grey-100);
    color: var(--grey-650);
  }
`

const IconDiv = styled.div<PropsStyle>`
  ${({isOpen}) => {
    if(isOpen) {
      return css`
        transform: rotate(-180deg);
      `
    }
  }}
  transition: transform .5s;
`

const SelectBox = ({options, labelText, setValue}:any) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(labelText);
  const [liHeight, setLiHegiht] = useState(0);
  
  const Select = useRef<HTMLInputElement>(null);
  const Li = useRef<HTMLInputElement>(null);
  const Ui = useRef<HTMLInputElement>(null);

  const Last = true;

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
    // 스크롤 맨 처음으로
    if (Ui.current) {
      Ui.current.scrollTo(0, 0);
    }
  }

  const Selected = (e:any) => {
    setSelected(e.target.innerText);
    setValue(e.target.innerText);
  }

  const blurHandler = () => {
    setIsOpen(false);

  }

  useEffect(() => {
    setSelected(labelText);
  }, [labelText])

  useEffect(() => {
    Select.current?.addEventListener('blur', blurHandler);
    return () => {
      Select.current?.removeEventListener('blur', blurHandler);
    }
  }, [Select])


  useEffect(() => {
    if (Li.current) {
      setLiHegiht(Li?.current.offsetHeight * options.length);
    }
  }, []);

  return (
    <StyledSelect >
      <Label onClick={onClickHandler} isOpen={isOpen} ref={Select}>
        <Div pl="">
          <Div>{selected}</Div>
        </Div>
        <Div pr="">
          <IconDiv isOpen={isOpen}>▼</IconDiv>
        </Div>
      </Label>
      <StyledUl isOpen={isOpen} liHeight={liHeight} ref={Ui}>
          {options.map((option:any, index:any) => {
            if (index === options.length - 1) {
              return (
                <StyledLi Last key={index+option} id={index} ref={Li} onMouseDown={Selected}>
                  {option}
                </StyledLi>
              );
            } else {
              return (
                <StyledLi key={index+option} id={index} onMouseDown={Selected}>
                  {option}
                </StyledLi>
              );
            }
          })}
        </StyledUl>
    </StyledSelect>
  );
}

SelectBox.defaultProps = {
  labelText: '선택',
  valueIndex: 0,
  options: ['하이', '바이', '이건', '연습용', '디폴트값', '히히', '에잉']
}

export default SelectBox;
