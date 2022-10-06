import styled from "styled-components";

export interface StyleProps {
  active?: boolean;
}

export const Nav = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 120px;

  background-color: rgba(0, 0, 0, 0);

  display: flex;
  flex-direction: row;
  transition: 0.5s;

  opacity: 1;
  width: 100%;
  top: 0;

  @media (max-width: 768px) {
    background-color: var(--grey-650);
  }

  &:hover {
    background-color: var(--grey-650);
  }
`;

export const LogoDiv = styled.div`
  width: 25%;
  z-index: 120;

  & svg {
    cursor: pointer;
    float: left;
    display: block;
    position: relative;
    top: 0px;
    height: 87px px;
    overflow: hidden;
  }
`;

export const NavBox = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;
  width: 100%;
  max-width: 1800px;
  padding-right: 60px;
  padding-left: 60px;
  margin-bottom: 0;

  @media (max-width: 1366px) {
    padding-right: 32px;
    padding-left: 32px;
  }
`;

export const Menu = styled.ul`
  user-select: none;
  width: 320px;
  box-sizing: border-box;

  display: inline-block;
  white-space: nowrap;
  position: relative;
  margin-top: 3px;

  /* identical to box height, or 42px */

  display: flex;

  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const PrimayMenu = styled.div`
  display: flex;
  flex-direction: row;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 140%;
`;

export const SecondaryMenu = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;

  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 140%;
`;

export const PrimayMenuItem = styled.li<StyleProps>`
  padding-right: 4.5%;
  list-style: none;
  color: var(--grey-100);
  transition: 0.5s;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: var(--grey-350);
    /* text-decoration: underline; */
  }
`;

export const SecondaryMenuItem = styled.li<StyleProps>`
  display: inline-block;
  margin-left: 4%;
  list-style: none;
  color: var(--grey-100);
  transition: 0.5s;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    color: var(--grey-350);
  }
`;

export const TokenAddMenuItem = styled(SecondaryMenuItem)`
  color: var(--mandarin-100);

  &:hover {
    color: var(--mandarin-200);
  }
`;

export const TokenAmount = styled.li<StyleProps>`
  display: flex;
  margin-left: 4%;
  list-style: none;
  color: var(--mandarin-100);

  & div {
    display: inline-block;
    color: var(--grey-100);
    font-weight: 400;
  }
`;

export const HamburgerMenu = styled.div<StyleProps>`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: var(--grey-100);
  margin-top: 0;
  cursor: pointer;
  user-select: none;

  @media (min-width: 768px) {
    display: none;
  }
`;
