import React, { useState } from "react";
import { Div, PropStyle, UL, LI } from "../../styles/BaseStyles";
import styled from "styled-components";

interface DropStyle extends PropStyle {
  hoverBg?: string;
  hoverColor?: string;
}

const DropDownDiv = styled(Div)<DropStyle>`
  z-index: 100;
  background: var(${(props) => (props.bg ? props.bg : "--grey-100")});
  height: ${(props) => (props.h ? props.h : "auto")};

  & .list {
    transition: max-height 0.35s ease;
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
    background: var(${(props) => (props.bg ? props.bg : "--grey-100")});
    height: ${(props) => (props.h ? props.h : "auto")};

    //active한
    &--active {
      background: var(
        ${(props) => (props.hoverBg ? props.hoverBg : "--grey-100")}
      );
      color: var(
        ${(props) => (props.hoverColor ? props.hoverColor : "--grey-750")}
      );
    }

    //옵션 hover시 컬러
    &:hover {
      background: var(
        ${(props) => (props.hoverBg ? props.hoverBg : "--grey-750")}
      );
      color: var(
        ${(props) => (props.hoverColor ? props.hoverColor : "--grey-100")}
      );
    }
  }
  //메뉴 버튼 hover 컬러
  & .toggle {
    height: ${(props) => (props.h ? props.h : "auto")};
    &:hover {
      background: var(
        ${(props) => (props.hoverBg ? props.hoverBg : "--grey-750")}
      );
      color: var(
        ${(props) => (props.hoverColor ? props.hoverColor : "--grey-100")}
      );
    }
  }
`;

interface Props {
  w?: string;
  h?: string;
  hoverColor?: string;
  color?: string;
  options?: any;
  hoverBg?: string;
  bg?: string;
  fontWeight?: string;
  fontSize?: string;
  children?: string;
  dataFunc: (data: string) => void;
}

export default function DropDown({
  options,
  dataFunc,
  w = "200px",
  h = "30px",
  bg = "--grey-750",
  hoverBg = "--grey-100",
  color = "--grey-100",
  hoverColor = "--grey-750",
  fontSize = "--h7",
  fontWeight = "--bold",
  children = "메뉴를 선택하세요",
}: Props) {
  const [selected, setSelected] = useState<number>(-1);
  const [active, setActive] = useState<boolean>(false);
  const Items: any = () => {
    return options.map((item: string, idx: number) => {
      return (
        <LI
          onClick={(e) => {
            handleClick(idx);
            toggleDropdown();
          }}
          key={`items${idx}`}
          className={
            "list-item " + (idx === selected ? "list-item--active" : "")
          }
          display="flex"
          alignItems="center"
        >
          <Div>{item}</Div>
        </LI>
      );
    });
  };

  const toggleDropdown = () => {
    setActive((state) => !state);
  };
  const handleClick = (idx: any) => {
    setSelected(idx);
    dataFunc(options[idx]);
  };

  return (
    <DropDownDiv
      color={color}
      w={w}
      bg={bg}
      hoverBg={hoverBg}
      hoverColor={hoverColor}
      h={h}
      fontSize={fontSize}
    >
      <Div
        className="toggle list-item"
        onClick={toggleDropdown}
        display="flex"
        alignItems="center"
        fontWeight={fontWeight}
      >
        {selected !== -1 ? options[selected] : <Div>{children}</Div>}
      </Div>
      <UL
        className={"list " + (active ? "list--active" : "")}
        textAlign="center"
        fontWeight={fontWeight}
      >
        <Items></Items>
      </UL>
    </DropDownDiv>
  );
}
