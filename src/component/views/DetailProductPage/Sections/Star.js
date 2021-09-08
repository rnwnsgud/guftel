import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import axios from "axios";
function Star(props) {
  const [Stars, setStars] = useState(0);
  const [Save, setSave] = useState(true);
  let variable = {
    productId: props.productId,
    userId: props.userId,
    star: Stars,
    save: Save,
  };
  useEffect(() => {
    axios.post("/api/star/getStar", variable).then((response) => {
      if (response.data.success) {
        console.log("response.data", response.data);

        if (response.data.stars.length > 0) {
          setSave(false);
          setStars(response.data.stars[0].star);
        }
        //별의 개수가 몇개인지
      } else {
        alert("Stars에 정보를 가져오지 못했습니다.");
      }
    });
  }, []);
  const OnStar = (event) => {
    setStars(event);
  };

  useEffect(() => {
    axios.post("/api/star/upStar", variable).then((response) => {
      if (response.data.success) {
        setSave(false);
      } else {
        alert("Star를 올리지 못했습니다.");
      }
    });
  }, [Stars]);

  return (
    <div>
      <Rate onChange={OnStar} value={Stars} />
    </div>
  );
}

export default Star;
