import React from "react";
import SharpButton from "../components/Button/SharpButton";
import { useState } from "react";

const MainPage = () => {
  const [data, setData] = useState<number>(0);

  const onIncrease = () => setData(data + 1);
  const onDecrease = () => setData(data - 1);

  return (
    <div>
      <SharpButton fc={onIncrease}>+1</SharpButton>
      <SharpButton fc={onDecrease}>-1</SharpButton>
      {data}
    </div>
  );
};

export default MainPage;
