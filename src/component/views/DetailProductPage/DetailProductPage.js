import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import Comment from "./Sections/Comment";
import { Row, Col } from "antd";
function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const variable = { productId: productId };
  const [Product, setProduct] = useState({});
  const [Comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));

    axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
        console.log("Comments", response.data.comments);
        //console.log("productId:", productId);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패했습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>

      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/**ProductImage */}
          <ProductImage detail={Product} />
        </Col>

        <Col lg={12} sm={24}>
          {/**ProductInfo */}
          <ProductInfo detail={Product} productId={productId} />
        </Col>

        {/**Comments */}
      </Row>
      <Comment
        refreshFunction={refreshFunction}
        commentLists={Comments}
        productId={productId}
      />
    </div>
  );
}

export default DetailProductPage;
