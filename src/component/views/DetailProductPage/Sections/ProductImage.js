import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.forEach((item) => {
        images.push({
          original: `http://localhost:4000/${item}`,
          thumbnail: `http://localhost:4000/${item}`,
        });
      });
      setImages(images);
    } //첫 렌더링 때는 props.detail이 없어서 실행x
  }, [props.detail]); //detailProductPage의 useEffect가 작동 된 이후에 나온 결과값을 detail={Product}로 넣어줄때
  //props.detail이 생기는거(바뀌는거) 그래서 다시 실행되서 이미지가 나오는거

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
