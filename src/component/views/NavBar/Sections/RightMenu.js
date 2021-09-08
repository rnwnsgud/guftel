import React from "react";
import { Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        console.log("로그아웃:", response.data);
        window.location.replace("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
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
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/products/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge
            style={{ marginTop: 10 }}
            count={user.userData && user.userData.cart.length}
          >
            <a
              href="/user/cart"
              className="head-example"
              style={{ color: "#667777" }}
            >
              <ShoppingCartOutlined style={{ marginTop: 10, fontSize: 27 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a href="#!" onClick={onClickHandler}>
            logout
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
