import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { DesktopOutlined } from "@ant-design/icons";
import axios from "axios";
import ImageSlider from "../../utils/ImageSlider";
import { useDispatch } from "react-redux";
import { removeMasterpiece } from "../../../_actions/user_action";

function Masterpiece(props) {
  const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let masterpieceItems = [];
    //리덕스 user State안에 masterpiece안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.masterpiece) {
      if (props.user.userData.masterpiece.length > 0) {
        props.user.userData.masterpiece.forEach((item) => {
          masterpieceItems.push(item.id);
        });
        console.log("masterpiece", masterpieceItems);
        //axios로 보내서 product에서 받아오자.

        getProducts(masterpieceItems);
      }
    }
    console.log("user", props.user.userData);
  }, [props.user.userData]);

  const getProducts = (masterpieceItems) => {
    let body = { masterpieceItems };
    axios.post("/api/product/getMasterpiece", body).then((response) => {
      if (response.data.success) {
        console.log("response.data.명작", response.data);
        setProducts(response.data.product);
      } else {
        alert("명작을 가져오는데 실패했습니다.");
      }
    });
  };

  let removeFromMasterpiece = (productId) => {
    dispatch(removeMasterpiece(productId)).then((response) => {
      console.log("상품지우기", response.data);
    });
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} />
          <br />
          <Button onClick={() => removeFromMasterpiece(product._id)}>
            remove
          </Button>
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          It's your Masterpiece <DesktopOutlined type="align-right" />
        </h2>
      </div>
      <Row gutter={[16, 16]}> {renderCards}</Row>
    </div>
  );
}

export default Masterpiece;
