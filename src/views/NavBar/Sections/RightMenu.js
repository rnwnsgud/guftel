import React from "react";
import { Menu } from "antd";

function RightMenu(props) {
  //props.mode는 어디서 가져온거지?
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
