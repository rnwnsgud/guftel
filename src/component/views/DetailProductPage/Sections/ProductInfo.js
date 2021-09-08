import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart, addToMasterpiece } from "../../../../_actions/user_action";
import LikeDislikes from "./LikeDislikes";
import Star from "./Star";
function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToCart(props.detail._id));
  };

  const clickMasterpiece = () => {
    dispatch(addToMasterpiece(props.detail._id));
  };

  return (
    <div>
      <Descriptions title="Animation Info" bordered>
        <Descriptions.Item label="Episode">
          {props.detail.episode}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="Masterpiece">
          {props.detail.view}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LikeDislikes
          product
          userId={localStorage.getItem("userId")}
          productId={props.productId}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "100px" }}>
        <Button onClick={clickHandler} size="large" shape="round" type="danger">
          Add to Cart
        </Button>

        <Star
          userId={localStorage.getItem("userId")}
          productId={props.productId}
        />
        <Button
          onClick={clickMasterpiece}
          size="large"
          shape="round"
          type="primary"
        >
          Masterpiece
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
