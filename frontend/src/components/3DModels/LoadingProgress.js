import React from 'react';
import { Html, useProgress } from "@react-three/drei";

const LoadingProgress = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      { progress } % 로드 중입니다.
    </Html>
  );
};

export default LoadingProgress;