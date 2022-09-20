import React from "react";
import { Div } from "../../styles/BaseStyles";

function NftCard(props: any) {
  return (
    <Div mb="60px" display="flex" flexDirection="column">
      <Div mb="16px">
      </Div>
      <Div color="--grey-100" fontSize="18px" mb="4px">
        {props.nft.title}
      </Div>
      <Div color="--grey-100" fontSize="16px">
        {props.nft.description}
      </Div>
    </Div>
  );
}

export default NftCard;
