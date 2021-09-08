import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
function LoginPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email:", Email);
    console.log("Password:", Password);

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/"); //
      } else {
        alert("failed to sign up");
      }
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Form onSubmit={onSubmitHandler}>
        <div>
          <Input
            type="email"
            style={{ width: "400px", height: "40px" }}
            value={Email}
            onChange={onEmailHandler}
            label="이메일주소"
          />
        </div>
        <br />

        <div>
          <Input
            style={{ width: "400px", height: "40px" }}
            type="password"
            onChange={onPasswordHandler}
            value={Password}
            label="비밀번호"
          />
        </div>

        <br />
        <Button
          style={{
            minWidth: "400px",
            minHeight: "50px",
          }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmitHandler}
        >
          로그인
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(LoginPage);
