import React from "react";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import './App.css';
import styled from "styled-components";
import SharpButton from "../Button/SharpButton";

type Props = {};

interface Ipfs {
  cid: object;
  path: string;
}

function IpfsUploader({}: Props) {
  const projectId = "2F6WFaN05FMtbO93ODOLhwvE6EY";
  const projectSecretKey = "1998e51a7c7b5c7a15c51d493138c943";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

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
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setImage({
      cid: result.cid,
      path: result.path,
    });

    form.reset();

    const Json = await ipfs.add(
      JSON.stringify({
        fileName: `${result.path}.json`,
        name: "NFT name",
        author: "imukyee",
        description: "설명",
        image: "https://skywalker.infura-ipfs.io/ipfs/" + result.path,
      })
    );
    setJson(Json.path);
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
              onChange={onChange}
              style={{ display: "none" }}
            />
            <SharpButton>NFT 민팅</SharpButton>
          </form>
        </>
      )}
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
  );
}

export default IpfsUploader;
