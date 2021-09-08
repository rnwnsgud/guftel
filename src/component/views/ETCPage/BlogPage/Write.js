import React, { useState } from "react";
import "./blog.css";
import { Button, Form, Input } from "antd";
import axios from "axios";

const { TextArea } = Input;

function Write(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  const submitHandler = (event) => {
    if (!Title || !Description) {
      return alert("제목과 내용을 입력해주세요.");
    }
    const body = {
      title: Title,
      description: Description,
    };
    axios.post("/api/blog", body).then((response) => {
      if (response.data.success) {
        alert("블로그 업로드에 성공했습니다.");
        props.history.push("/blog");
      } else {
        alert("블로그 업로드에 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <div className="blog">
        <div id="blog-left">
          <h3>Left Side</h3>
        </div>

        <Form onSubmit={submitHandler}>
          <div className="Write">
            <Input
              id="title_txt"
              placeholder="제목"
              onChange={titleChangeHandler}
              value={Title}
            />
          </div>

          <div>
            <TextArea
              id="content_txt"
              placeholder="내용을 입력하세요."
              onChange={descriptionChangeHandler}
              value={Description}
            ></TextArea>
          </div>
        </Form>
        <div id="blog-right">
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Button type="submit" onClick={submitHandler}>
              {" "}
              포스트 등록{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
