import React from "react";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import styled from "styled-components";
import SharpButton from "../Button/SharpButton";
import { TestContract, MintTestContract, SsafyNFTContract } from "../../web3Config";

type Props = {};

interface Ipfs {
  cid: object;
  path: string;
}

function IpfsUploader({}: Props) {
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const projectSecretKey = process.env.REACT_APP_PROJECT_SECRET_KEY;
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

  // ----------
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingIpfs, setLoadingIpfs] = useState<boolean>(false);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(false);
  const [loadingMint, setLoadingMint] = useState<boolean>(false);
  // ---------

  const [image, setImage] = useState<Ipfs | any>("");
  const [json, setJson] = useState<Ipfs | string>("");
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  const [file, setFile] = useState("");

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file, { wrapWithDirectory: false });

    setImage({
      cid: result.cid,
      path: result.path,
    });
    console.log(result.path);

    form.reset();

    setLoadingIpfs(true);

    const Json = await ipfs.add(
      JSON.stringify({
        fileName: `${result.path}.json`,
        name: "NFT name",
        author: "imukyee",
        description: "설명",
        image: "https://skywalker.infura-ipfs.io/ipfs/" + result.path,
        type: file.type,
      })
    );
    console.log("1", Json);
    setJson(Json.path);

    setLoadingMeta(true);

    const response = await SsafyNFTContract.methods
      .create(
        window.ethereum.selectedAddress,
        "https://skywalker.infura-ipfs.io/ipfs/" + Json.path
      )
      .send({ from: window.ethereum.selectedAddress });

    console.log(response);

    setLoadingMint(true);

    await setTimeout(() => {
      setLoading(false);
      setLoadingIpfs(false);
      setLoadingMeta(false);
      setLoadingMint(false);
      setFile("");
    }, 1000);
  };

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };

  return (
    <div>
      {ipfs && (
        <>
          <h3>Upload file to IPFS</h3>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              {file ? (
                <img
                  src={file}
                  alt="preview image"
                  style={{ maxWidth: "400px", margin: "15px" }}
                />
              ) : (
                <img
                  alt={`Uploaded #`}
                  src={
                    "https://skywalker.infura-ipfs.io/ipfs/QmZBMUfWxHG86SCy8ZXfrTnK26PFpvevujEZ8cmfB6VL8N"
                  }
                  style={{ maxWidth: "400px", margin: "15px" }}
                />
              )}
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpg .jpeg .mp4 .gif .png"
              onChange={onChange}
              style={{ display: "none" }}
            />
            <SharpButton>NFT 민팅</SharpButton>
          </form>
        </>
      )}

      {loading ? (
        <div>
          <div>IPFS 업로드 {loadingIpfs ? "완료" : "대기"}</div>
          <div>메타 데이터 업로드 {loadingMeta ? "완료" : "대기"}</div>
          <div>민팅 {loadingMint ? "완료" : "대기"}</div>
        </div>
      ) : (
        <div>
          {image && (
            <img
              alt={`Uploaded #`}
              src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
              style={{ maxWidth: "400px", margin: "15px" }}
            />
          )}

          <br></br>
          {json && (
            <a
              href={`https://skywalker.infura-ipfs.io/ipfs/${json}`}
              target="blank"
            >
              주소
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default IpfsUploader;
