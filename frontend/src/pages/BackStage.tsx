import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { GalleryLoading } from "../components";

type Props = {
  loading: boolean;
  animation: string;
};

function BackStage({ loading, animation }: Props) {
  const [helpText, setHelpText] = useState<string>("E를 누르면 화면 전환이 가능합니다.");
  return (
    <>
      {loading && (
        <GalleryLoading HelpText={helpText} animationName={animation} />
      )}
      <Outlet></Outlet>
    </>
  );
}

export default BackStage;
