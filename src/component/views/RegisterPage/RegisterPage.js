import React, { useState } from "react";
import { Button, Input } from "antd";

import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다
    console.log("Password:", Password);
    console.log("ConfirmPassword:", ConfirmPassword);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비민번호확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
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
          <Input
            style={{ width: "400px", height: "40px" }}
            value={Email}
            placeholder="이메일주소"
            onChange={onEmailHandler}
          />
        </div>
        <br />

        <div>
          <Input
            style={{ width: "400px", height: "40px" }}
            //   onBlur={onNameHandler}
            value={Name}
            placeholder="이름"
            onChange={onNameHandler}
          />
        </div>
        <br />

        <div>
          <Input
            style={{ width: "400px", height: "40px" }}
            type="password"
            value={Password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
        </div>
        <br />

        <div>
          <Input
            style={{ width: "400px", height: "40px" }}
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            placeholder="비밀번호 확인"
          />
        </div>
        <br />
        <Button
          onClick={onSubmitHandler}
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
