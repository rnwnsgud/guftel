import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";
const { TextArea } = Input;
const Genres = [
  { key: 1, value: "일상" },
  { key: 2, value: "개그" },
  { key: 3, value: "러브코미디" },
  { key: 4, value: "성인" },
  { key: 5, value: "판타지" },
  { key: 6, value: "서스펜스" },
  { key: 7, value: "감동" },
  { key: 8, value: "아이돌" },
  { key: 9, value: "드라마" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Episode, setEpisode] = useState(0);

  const [Genre, setGenre] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const episodeChangeHandler = (event) => {
    setEpisode(event.currentTarget.value);
  };

  const genreChangeHandler = (event) => {
    setGenre(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    if (!Title || !Description || !Episode || !Genre || !Images) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }

    //서버에 채운 값들을 request로 보낸다.
    const body = {
      //로그인 된 사람의 ID, hoc/auth.js가 user데이터를 props로 저장해서 받아온다

      title: Title,
      description: Description,
      episode: Episode,
      images: Images,
      genres: Genre,
    };

    axios.post(`/api/product`, body).then((response) => {
      if (response.data.success) {
        alert("애니 업로드에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("애니 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>고급 문학 업로드</h2>
      </div>

      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>제목</label>
        <TextArea onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>회차수</label>
        <TextArea onChange={episodeChangeHandler} value={Episode} />
        <br />
        <br />
        <select onChange={genreChangeHandler} value={Genre}>
          {Genres.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  );
}
export default UploadProductPage;
