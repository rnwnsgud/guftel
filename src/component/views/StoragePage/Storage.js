import React, { useState, useEffect } from "react";
import { Comment, Avatar, Col, Card, Row, Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";
import axios from "axios";
import "./Tab.css";

function Storage(props) {
  const [Masterpieces, setMasterpieces] = useState([]);
  const [Carts, setCarts] = useState([]);
  const [Stars, setStars] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const [renderType, setRenderType] = useState("CT");
  const { TabPane } = Tabs;

  const callback = (key) => {
    if (key === "1") {
      setActiveKey("1");
      setRenderType("CT");
    }

    if (key === "2") {
      setActiveKey("2");
      setRenderType("ST");
    }

    if (key === "3") {
      setActiveKey("3");
      setRenderType("MP");
    }
  };

  const Demo = () => (
    <Tabs
      style={{ display: "flex" }}
      size="large"
      defaultActiveKey="1"
      activeKey={activeKey}
      centered
      onTabClick={callback}
    >
      <TabPane tab={<div className="foo">보고싶다</div>} key="1"></TabPane>
      <TabPane tab={<div className="foo">평가작품</div>} key="2"></TabPane>
      <TabPane tab={<div className="foo">명작추천</div>} key="3"></TabPane>
    </Tabs>
  );

  useEffect(() => {
    let masterpieceItems = [];
    let cart = [];
    //리덕스 user State안에 masterpiece안에 상품이 들어있는지 확인
    if (
      props.user.userData &&
      props.user.userData.masterpiece &&
      props.user.userData.cart
    ) {
      if (props.user.userData.masterpiece.length > 0) {
        props.user.userData.masterpiece.forEach((item) => {
          masterpieceItems.push(item.id);
        });
        console.log("masterpiece", masterpieceItems);
        //axios로 보내서 product에서 받아오자.

        getProducts(masterpieceItems);
      }
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cart.push(item.id);
        });
        console.log("cart", cart);
        getCarts(cart);
        //axios로 보내서 product에서 받아오자.
      }
    }
  }, [props.user.userData]);

  let userid = localStorage.getItem("userId");

  useEffect(() => {
    let body = { userId: userid };
    let stars = [];
    axios.post("/api/star/gotStar", body).then((response) => {
      if (response.data.success) {
        //console.log("star", response.data);
        response.data.stars.forEach((item) => {
          if (item.star > 0) {
            stars.push(item.productId);
          }
        });
        getStars(stars);
      } else {
        alert("평가 작품의 정보를 가져오지 못했습니다.");
      }
    });
    console.log("stars", stars);
  }, []);

  const getProducts = (masterpieceItems) => {
    let body = { masterpieceItems };
    axios.post("/api/product/getMasterpiece", body).then((response) => {
      if (response.data.success) {
        console.log("response.data.명작", response.data);
        setMasterpieces(response.data.product);
      } else {
        alert("명작을 가져오는데 실패했습니다.");
      }
    });
  };

  const getCarts = (cart) => {
    let body = { cart };
    axios.post("/api/product/getCart", body).then((response) => {
      if (response.data.success) {
        console.log("response.data.cart", response.data);
        setCarts(response.data.product);
      } else {
        alert("명작을 가져오는데 실패했습니다.");
      }
    });
  };

  const getStars = (stars) => {
    let body = { stars };
    axios.post("/api/product/getStar", body).then((response) => {
      if (response.data.success) {
        console.log("response.data.star", response.data);
        setStars(response.data.product);
      } else {
        alert("명작을 가져오는데 실패했습니다.");
      }
    });
  };

  const renderMasterpiece = Masterpieces.map((product, index) => {
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
        </Card>
      </Col>
    );
  });

  const renderCart = Carts.map((product, index) => {
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
        </Card>
      </Col>
    );
  });

  const renderStar = Stars.map((product, index) => {
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
        </Card>
      </Col>
    );
  });

  const RenderTaps = (props) => {
    const type = props.type;

    if (type === "CT") {
      return <Row gutter={[16, 16]}>{renderCart}</Row>;
    } else if (type === "MP") {
      return <Row gutter={[16, 16]}>{renderMasterpiece}</Row>;
    } else if (type === "ST") {
      return <Row gutter={[16, 16]}>{renderStar}</Row>;
    }
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "left",
          }}
        >
          {props.user.userData && (
            <Comment
              avatar={<Avatar size={64} icon={<UserOutlined />} />}
              author={props.user.userData.email + "님"}
            />
          )}

          <br />
        </div>
        <div>
          <Demo />
        </div>
        <div>
          <RenderTaps type={renderType} />
        </div>
      </div>
    </div>
  );
}

export default Storage;
