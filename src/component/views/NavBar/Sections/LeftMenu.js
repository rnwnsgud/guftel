import React from "react";
import { Menu } from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  //props.mode는 navbar.js의 마지막줄에 잇구나 ㅎㅎ
  //span태그는 div와 달리 display가 block이 아니라 inline, 줄 바꿈이 되지않음
  return (
    <div>
      <Menu mode={props.mode}>
        <Menu.Item key="masterpiece">
          <a href="/user/masterpiece">명작</a>
        </Menu.Item>
        <Menu.Item key="storage">
          <a href="/user/storage">내 보관함</a>
        </Menu.Item>
        <SubMenu key="sub1" title={<div>기타</div>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">
              <a href="/blog">블로그</a>
            </Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">
              <a href="/visual">Option 3</a>
            </Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default LeftMenu;
