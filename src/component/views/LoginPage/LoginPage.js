import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
function LoginPage(props) {
  const Email = useRef("");
  const Password = useRef("");

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email:", Email.current.value);
    console.log("Password:", Password.current.value);

    let body = {
      email: Email.current.value,
      password: Password.current.value,
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
      <form onSubmit={onSubmitHandler}>
        <div>
          <TextField inputRef={Email} label="이메일주소" />
        </div>
        <br />

        <div>
          <TextField type="password" inputRef={Password} label="비밀번호" />
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
        >
          로그인
        </Button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
