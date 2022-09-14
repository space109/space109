import React from "react";

interface Props {
  title?: string;
}

function GalleryCard({ title }: Props) {
  return <div>{title ? title : "제목"}</div>;
}

export default GalleryCard;
