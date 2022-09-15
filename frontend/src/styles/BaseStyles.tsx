import styled from "styled-components";

export interface MediaQueryTypes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export const screenSizes: MediaQueryTypes = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1366,
  xxl: 1920,
};
export interface PropStyle {
  m?: any;
  p?: any;
  mt?: any;
  mb?: any;
  ml?: any;
  mr?: any;
  pl?: any;
  pr?: any;
  pb?: any;
  pt?: any;
  fontSize?: any;
  w?: any;
  h?: any;
  display?: any;
  justifyContent?: any;
  alignItems?: any;
  textAlign?: any;
  borderRadius?: any;
  border?: any;
  gap?: any;
  flexDirection?: any;
  top?: any;
  left?: any;
  bottom?: any;
  right?: any;
  bgColor?: any;
  bg?: any;
  fontWeight?: any;
  position?: any;
  fontStyle?: any;
  fontFamily?: any;
  lineHeight?: any;
  letterSpacing?: any;
  boxShadow?: any;
  maxWidth?: any;
  maxHeight?: any;
  transition?: any;
  transform?: any;
  bgAttach?: any;
  bgImage?: any;
  bgSize?: any;
  cursor?: any;
  flex?: any;
  flexWrap?: any;
  objectFit?: any;
  zIndex?: any;
}

export const Div = styled.div<PropStyle>`
  margin: ${(props) => (props.m ? props.m : "0px")};
  padding: ${(props) => (props.p ? props.p : "0px")};
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "0px")};
  margin-left: ${(props) => (props.ml ? props.ml : "0px")};
  margin-right: ${(props) => (props.mr ? props.mr : "0px")};
  padding-left: ${(props) => (props.pl ? props.pl : "0px")};
  padding-right: ${(props) => (props.pr ? props.pr : "0px")};
  padding-top: ${(props) => (props.pt ? props.pt : "0px")};
  padding-bottom: ${(props) => (props.pb ? props.pb : "0px")};
  width: ${(props) => (props.w ? props.w : "")};
  height: ${(props) => (props.h ? props.h : "")};
  display: ${(props) => (props.display ? props.display : "block")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "none"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "none")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  position: ${(props) => (props.position ? props.position : "relative")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  border: ${(props) => (props.border ? props.border : "")};
  gap: ${(props) => (props.gap ? props.gap : "")};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  top: ${(props) => (props.top ? props.top : "")};
  left: ${(props) => (props.left ? props.left : "")};
  bottom: ${(props) => (props.bottom ? props.bottom : "")};
  right: ${(props) => (props.right ? props.right : "")};
  color: var(${(props) => (props.color ? props.color : "")});
  background-color: var(${(props) => (props.bgColor ? props.bgColor : "")});
  background: ${(props) => (props.bg ? props.bg : "")};
  font-size: var(${(props) => (props.fontSize ? props.fontSize : "")});
  font-weight: var(${(props) => (props.fontWeight ? props.fontWeight : "")});
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : "")};
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : "")};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "")};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : ""};
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
  transition: ${(props) => (props.transition ? props.transition : "")};
  transform: ${(props) => (props.transform ? props.transform : "")};
  background-attachment: ${(props) => (props.bgAttach ? props.bgAttach : "")};
  background-image: url(${(props) => (props.bgImage ? props.bgImage : "")});
  background-size: ${(props) => (props.bgSize ? props.bgSize : "")};
  cursor: ${(props) => (props.cursor ? props.cursor : "")};
  flex: ${(props) => (props.flex ? props.flex : "")};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "")};
  z-index: ${(props) => (props.zIndex ? props.zIndex : "")};

  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {
  }
`;

export const Button = styled.button<PropStyle>`
  margin: ${(props) => (props.m ? props.m : "0px")};
  padding: ${(props) => (props.p ? props.p : "0px")};
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "0px")};
  margin-left: ${(props) => (props.ml ? props.ml : "0px")};
  margin-right: ${(props) => (props.mr ? props.mr : "0px")};
  padding-left: ${(props) => (props.pl ? props.pl : "0px")};
  padding-right: ${(props) => (props.pr ? props.pr : "0px")};
  padding-top: ${(props) => (props.pt ? props.pt : "0px")};
  padding-bottom: ${(props) => (props.pb ? props.pb : "0px")};
  width: ${(props) => (props.w ? props.w : "auto")};
  height: ${(props) => (props.h ? props.h : "auto")};
  display: ${(props) => (props.display ? props.display : "block")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "none"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "none")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  position: ${(props) => (props.position ? props.position : "relative")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  border: ${(props) => (props.border ? props.border : "")};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  top: ${(props) => (props.top ? props.top : "")};
  left: ${(props) => (props.left ? props.left : "")};
  bottom: ${(props) => (props.bottom ? props.bottom : "")};
  right: ${(props) => (props.right ? props.right : "")};
  color: var(${(props) => (props.color ? props.color : "")});
  background-color: var(${(props) => (props.bgColor ? props.bgColor : "")});
  background: ${(props) => (props.bg ? props.bg : "")};
  font-size: var(${(props) => (props.fontSize ? props.fontSize : "")});
  font-weight: var(${(props) => (props.fontWeight ? props.fontWeight : "")});
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : "")};
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : "")};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "")};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : ""};
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
`;

export const Image = styled.img<PropStyle>`
  margin: ${(props) => (props.m ? props.m : "0px")};
  padding: ${(props) => (props.p ? props.p : "0px")};
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "0px")};
  margin-left: ${(props) => (props.ml ? props.ml : "0px")};
  margin-right: ${(props) => (props.mr ? props.mr : "0px")};
  padding-left: ${(props) => (props.pl ? props.pl : "0px")};
  padding-right: ${(props) => (props.pr ? props.pr : "0px")};
  padding-top: ${(props) => (props.pt ? props.pt : "0px")};
  padding-bottom: ${(props) => (props.pb ? props.pb : "0px")};
  width: ${(props) => (props.w ? props.w : "auto")};
  height: ${(props) => (props.h ? props.h : "auto")};
  display: ${(props) => (props.display ? props.display : "block")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "none"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "none")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  position: ${(props) => (props.position ? props.position : "relative")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  border: ${(props) => (props.border ? props.border : "")};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  top: ${(props) => (props.top ? props.top : "")};
  left: ${(props) => (props.left ? props.left : "")};
  bottom: ${(props) => (props.bottom ? props.bottom : "")};
  right: ${(props) => (props.right ? props.right : "")};
  color: var(${(props) => (props.color ? props.color : "")});
  background-color: var(${(props) => (props.bgColor ? props.bgColor : "")});
  background: ${(props) => (props.bg ? props.bg : "")};
  font-size: var(${(props) => (props.fontSize ? props.fontSize : "")});
  font-weight: var(${(props) => (props.fontWeight ? props.fontWeight : "")});
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : "")};
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : "")};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "")};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : ""};
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
  cursor: ${(props) => (props.cursor ? props.cursor : "")};
  background-size: ${(props) => (props.bgSize ? props.bgSize : "")};
  object-fit: ${(props) => (props.objectFit ? props.objectFit : "")};
  z-index: ${(props) => (props.zIndex ? props.zIndex : "")};
`;
