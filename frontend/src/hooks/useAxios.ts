import axios, { AxiosRequestConfig } from "axios";
import React, { useCallback } from "react";

const useAxios = () => {
  const sendRequest:Function = useCallback(
    (config: AxiosRequestConfig, getData: Function) => {
      axios({
        url: config.url,
        method: config.method ? config.method : "get",
        headers: config.headers ? config.headers : {},
        data: config.data ? config.data : null,
      })
        .then((res) => {
          console.log("값입니다", res)
          getData(res.data);
        })
        .catch((err) => console.log("에러", err.message));
    },
    []
  );

  return sendRequest;
};

export default useAxios;
