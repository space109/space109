import React from "react";
import styled from "styled-components";

interface Props {
  title?: string;
}

interface PropStyle {}

const Card = styled.div`
  width: 371px;
  height: 504px;
  background-color: var(--wine-100);
  color: var(--grey-100);
`;

function GalleryCard({ title }: Props) {
  return <Card>{title ? title : "제목"}</Card>;
}
export default GalleryCard;
