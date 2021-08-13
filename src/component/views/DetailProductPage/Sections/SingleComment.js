import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input, Form } from "antd";
import LikeDislikes from "./LikeDislikes";
const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const productId = props.productId;

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: productId,
      responseTo: props.comment._id,
    };
    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue("");
        setOpenReply(false);
        props.refreshFunction(response.data.result);
      } else {
        alert("커멘트를 저장하지 못했습니다.");
      }
    });
  };

  const actions = [
    <LikeDislikes
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && (
        <Form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default SingleComment;
