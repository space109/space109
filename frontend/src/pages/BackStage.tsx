import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { GalleryLoading } from "../components";

type Props = {
  loading: boolean;
  animation: string;
};

function BackStage({ loading, animation }: Props) {
  const [helpText, setHelpText] = useState<string>("에몽이와 함께하는 즐거운");
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
