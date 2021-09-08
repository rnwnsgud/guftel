import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Card, Row, Button } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "./utils/ImageSlider";
import CheckBox from "./views/Sections/CheckBox";
import RadioBox from "./views/Sections/RadioBox";
import SearchFeature from "./views/Sections/SearchFeature";
import { genres, episode } from "./views/Sections/Datas";
//고쳐야할 점: 로그아웃버튼을 navbar로 올리면 라우터로 감싸지지 않아서 그런지 주소만 바뀌고 refresh되지 않음.
//같은 개념으로, link태그도 그럼.
function Main() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit /*setLimit*/] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    genres: [],
    episode: [],
  });
  const [, /*SearchTerm*/ setSearchTerm] = useState("");
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        //console.log(response.data);
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    //console.log("product", product);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`${product.episode}회`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const hadnleEpisode = (value) => {
    const data = episode;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters; ///  genres[1,2,3]
    //console.log("filters", filters);
    if (category === "episode") {
      let episodeValues = hadnleEpisode(filters);
      newFilters[category] = episodeValues; //[1,13]
    }
    //console.log("category", category);
    //console.log("newFilters", newFilters[category]);

    showFilteredResults(newFilters);
    setFilters(newFilters); //!
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Watch Animation <DesktopOutlined type="align-right" />
        </h2>
      </div>

      {/**Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/**CheckBox */}
          <CheckBox
            list={genres}
            handleFilters={(filters) => handleFilters(filters, "genres")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/**RadioBox */}
          <RadioBox
            list={episode}
            handleFilters={(filters) => handleFilters(filters, "episode")}
          />
        </Col>
      </Row>

      <br />

      {/**Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      {/**Cards */}

      <Row gutter={[16, 16]}> {renderCards}</Row>

      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={loadMoreHandler}>더보기</Button>
        </div>
      )}
    </div>
  );
}

export default Main;
