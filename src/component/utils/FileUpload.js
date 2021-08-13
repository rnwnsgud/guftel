import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData(); //파일을 전할 때, 같이 전해줘야하는 것 2개
    //파일,이미지 전송 시, formData이용, 전송포맷이 json이 아닌 <form>형식
    const config = {
      header: { "content-type": "multipart/form-data" }, //헤더에 어떤 파일인지에 대해 content-type을 정해줘서, 백엔드에서 리퀘스트를 받을 때, 에러가 없이 받을 수 있게 해줌
    };
    formData.append("file", files[0]); //파일에 대한 정보가 들어가는거
    //key와 value넣어줘서 서버에 파일 전송

    axios.post("/api/product/image", formData, config).then((response) => {
      //백에서 프론트로 전해준 정보
      if (response.data.success) {
        //console.log(response.data);
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데에 실패했습니다.");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", height: "240px" }}
              src={`http://localhost:4000/${image}`}
              alt={{}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
