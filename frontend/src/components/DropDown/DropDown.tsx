import React, { useState } from 'react'
import { Div } from '../../styles/BaseStyles'
import styled from 'styled-components';

type Props = {}

const DropDownDiv = styled(Div)`
  border-radius: 1px;
  background: white;
  /* & .arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #eee;
    border-radius: 3px;
  } */

  & .list {
    transition: max-height 0.6s ease-out;
    max-height: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;

    &--active {
      max-height: 1000px;
      opacity: 1;
    }
  }

  & .list-item {
    border-bottom: 1px solid #eee;
    cursor: pointer;
    list-style: none;
    padding: 15px;
    transition: 0.2s ease-in all;
    background: #f4f4f4;
    //active한
    &--active {
      background: black;
      color: white;
    }
    //옵션 hover시 컬러
    &:hover {
      background: black;
      color: white;
    }
  }
  //메뉴 버튼 hover 컬러
  & .toggle {
    &:hover {
      background: black;
      color: white;
    }
  }
`;




export default function DropDown({}: Props) {
  const [selected, setSelected] = useState<number>(-1);
  const [active, setActive] = useState<boolean>(false);
  const options = ["Apple", "Orange", "Pear", "Mango"];
  const toggleDropdown = () => {
    setActive((state) => !state)
  }
  const handleClick = (idx:any) => {
    setSelected(idx)
  }

  const Items:any = () => {
    return options.map((item, idx) => {
      return (
        <li onClick={e => handleClick(idx)} key={`items${idx}`} className={"list-item " + (idx === selected ? "list-item--active" : '')}>
          {item}
        </li>
      )
    });
  };

  return (
    <DropDownDiv color="--grey-750" w="400px">
      <Div className="toggle list-item" onClick={toggleDropdown}>
        {selected !== -1 ? options[selected] : <Div>메뉴를 선택하세요</Div>}
      </Div>
      <ul className={"list " + (active ? "list--active" : "")}>
        <Items></Items>
      </ul>
    </DropDownDiv>
  );
}