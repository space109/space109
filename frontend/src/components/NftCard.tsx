import React from "react";
import { Div, Image } from '../styles/BaseStyles';


function NftCard(props: any) {
  return (
    <Div mb="60px" display="flex" flexDirection="column">
      <Div>
        <Image width="400px" height="100%" src={`${props.image}`} alt={`${props.title}`}></Image>
      </Div>
      <Div>{props.title}</Div>
      <Div>{props.description}</Div>
    </Div>
  );
}

export default NftCard;
