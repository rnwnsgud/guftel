import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
function RegisterPage(props) {
  const Email = useRef("");
  const Name = useRef("");
  const Password = useRef("");
  const ConfirmPassword = useRef("");

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다
    console.log("Password:", Password.current.value);
    console.log("ConfirmPassword:", ConfirmPassword.current.value);

    if (Password.current.value !== ConfirmPassword.current.value) {
      return alert("비밀번호와 비민번호확인은 같아야 합니다.");
    }

    let body = {
      email: Email.current.value,
      name: Name.current.value,
      password: Password.current.value,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/"); //
      } else {
        alert("failed to sign up");
      }
    });
  };
  //보통 axios.post('/api/users/register',body)이런식으로 서버에 보내는데,
  //앱의 규모가 커져 자식 컴포넌트가 많아지면 복잡해진다. 이 때, 리덕스에게 '해줘'하면 알아서 해줌

  //

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={onSubmitHandler}>
        <div>
          <TextField inputRef={Email} label="이메일주소" />
        </div>
        <br />

        <div>
          <TextField
            //   onBlur={onNameHandler}
            inputRef={Name}
            label="이름"
          />
        </div>
        <br />

        <div>
          <TextField type="password" inputRef={Password} label="비밀번호" />
        </div>
        <br />

        <div>
          <TextField
            type="password"
            inputRef={ConfirmPassword}
            label="비밀번호 확인"
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
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
