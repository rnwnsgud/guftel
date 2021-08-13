import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [commentValue, setcommentValue] = useState("");

  const handleClick = (event) => {
    setcommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      productId: props.productId,
    };
    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log("result", response.data.result);
        setcommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("커멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/**Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  productId={props.productId}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                  productId={props.productId}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/**Root Comment Form */}

      <Form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Comment;
