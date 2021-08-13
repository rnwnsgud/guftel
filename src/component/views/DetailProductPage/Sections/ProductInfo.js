import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_action";
import LikeDislikes from "./LikeDislikes";
import StarRating from "./StarRating";
function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToCart(props.detail._id));
  };

  return (
    <div>
      <Descriptions title="Animation Info" bordered>
        <Descriptions.Item label="Episode">
          {props.detail.episode}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.view}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={clickHandler} size="large" shape="round" type="danger">
          Add to Cart
        </Button>
        <br />
        <br />
      </div>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <LikeDislikes
          product
          userId={localStorage.getItem("userId")}
          productId={props.productId}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StarRating
          userId={localStorage.getItem("userId")}
          productId={props.productId}
        />
      </div>
    </div>
  );
}

export default ProductInfo;
