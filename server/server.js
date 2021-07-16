//서버 관리하는 express모듈을 require로 가져옴. app으로 제어
//포트는 해당 서버가 가져서 접속하게 해주는 일종의 주소
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Response Complate`);
});
//listen매소드로 서버 읽어옴
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
