import React from "react";
import styled from "styled-components";
import { ReactComponent as Go } from "../../assets/Icon/go.svg";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: any;
  width?: string;
  height?: string;
  bg?: string;
  color?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  fontWeight?: string;
  fontSize?: string;
}

interface PropStyle {
  w: string;
  h: string;
  bg: string;
  color: string;
  borderRadius: string;
  borderWidth: string;
  borderColor: string;
}

interface TextStyle {
  fontWeight: string;
  fontSize: string;
}

const Square = styled.button<PropStyle>`
  background: var(${(props) => props.bg});
  color: var(${(props) => props.color});
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  font-size: 2rem;
  padding: 0px, 16px;
  gap: 16px;
  border-radius: ${(props) => props.borderRadius};
  user-select: none;
  border: ${(props) => props.borderWidth} solid
    var(${(props) => props.borderColor});

  &:hover {
    background: var(${(props) => props.color});
    color: var(${(props) => props.bg});
    border: ${(props) => props.borderWidth} solid
      var(${(props) => props.borderColor});

    & div div svg {
      transform: scale(1.3);
    }

    & div div svg rect {
      fill: var(${(props) => props.bg});
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    & div div svg path {
      fill: var(${(props) => props.color});
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;

const Area = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0px 16px;
  gap: 16px;

  & svg {
    transform: scale(1.3);
  }
`;

const TextBox = styled.div<TextStyle>`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: var(${(props) => props.fontWeight});
  font-size: var(${(props) => props.fontSize});
  line-height: 140%;
  /* identical to box height, or 28px */

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
`;

function NaviButton({
  onClick,
  children,
  width = "334px",
  height = "52px",
  bg = "--grey-750",
  color = "--grey-100",
  borderRadius = "0px",
  borderWidth = "1px",
  borderColor = "--grey-750",
  fontWeight = "--bold",
  fontSize = "--h6",
}: Props) {
  return (
    <Square
      onClick={onClick}
      w={width}
      h={height}
      bg={bg}
      color={color}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
    >
      <Area>
        <TextBox fontWeight={fontWeight} fontSize={fontSize}>
          {children ? children : "제목"}
        </TextBox>
        <div>
          <Go></Go>
        </div>
      </Area>
    </Square>
  );
}

export default NaviButton;
