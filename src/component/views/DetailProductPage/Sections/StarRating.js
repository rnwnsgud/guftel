import React, { useState, useEffect } from "react";
import { Rate } from "antd";
import axios from "axios";

function StarRating(props) {
  const [Star, setStar] = useState(0);
  let variable = {
    productId: props.productId,
    userId: props.userId,
    star: Star,
  };

  useEffect(() => {
    axios.post("/api/star/getStars", variable).then((response) => {
      if (response.data.success) {
        console.log("response.data.stars", response.data.stars);
        setStar(response.data.stars.star);
      } else {
        alert("Stars에 대한 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  const onStar = (event) => {
    setStar(event);
    axios.post("/api/star/upStar", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
      } else {
        alert("Star를 올리지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <Rate onChange={onStar} value={Star} />
    </div>
  );
}

export default StarRating;
