import {useState} from 'react';
import styled, {css} from 'styled-components';
import { Div } from '../../styles/BaseStyles';

const StyledSelect = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  z-index: 1;
  font-size: var(--h5);
  font-weight: var(--semi-bold);
`

interface PropsStyle {
  isOpen?: any;
  Last?: any;
}

const Label = styled.button<PropsStyle>`
  all: unset;
  position: relative; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;

  ${({isOpen}) => {
    if(isOpen) {
      return css`
        border-bottom: 1px solid red;
      `
    } else {
      return css``
    }
  }}
`

const StyledUl = styled.ul`
  all: unset;
  position: absolute;
  top: 2.9rem;
  display: flex;
  flex-direction: column;
  background-color: var(--grey-100);
  width: 100%;
  height: auto;
  max-height: 9rem;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`



const StyledLi = styled.li<PropsStyle>`
  all: unset;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;

  border-bottom: ${({Last}) => Last ? 0 : `1px dashed var(--grey-650)`};

  :hover {
    background-color: #F8FAF7;
  }
`

const SelectBox = ({options, labelText, setValue}:any) => {

  const Last = true;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(labelText);

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  }

  const Selected = (e:any) => {
    setSelected(e.target.innerText);
    setValue(e.target.innerText);
  }

  return (
    <StyledSelect>
      <Label onClick={onClickHandler} isOpen={isOpen}>
        <Div pl="1rem">
          <Div>{selected}</Div>
        </Div>
        <Div pr="1rem">
          {isOpen ? 
            <Div>△</Div> : <Div>▼</Div>
          }
          
        </Div>
        {
        isOpen ?
          <>
            <StyledUl onClick={Selected}>
              {options.map((option:any, index:any) => {
                if (index === options.length - 1) {
                  return (
                    <StyledLi Last key={index+option}>
                      {option}
                    </StyledLi>
                  );
                } else {
                  return (
                    <StyledLi key={index+option}>
                      {option}
                    </StyledLi>
                  );
                }
              })}
            </StyledUl>
          </> : null
        }
      </Label>
    </StyledSelect>
  );
}

SelectBox.defaultProps = {
  labelText: '선택',
  options: ['하이', '바이', '이건', '연습용', '디폴트값']
}

export default SelectBox;
