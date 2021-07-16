import "./App.css";
import NavBar from "./views/NavBar/NavBar";
import logo from "./logo.png";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Novel from "./component/Novel";
import Main from "./component/Main";
import Ani from "./component/Ani";
import Footer from "./views/Footer";

//return 안에 식을 하나의 div태그로 감싸야 jsx오류 안남
//switch를 쓰는 이유는 path가 없는 페이지 주소로 갈 때, path를 안준 컴포넌트로 보내기 위해서
function App() {
  return (
    <div>
      <NavBar />
      <br />
      <br />
      <div>
        <img src={logo} alt="" className="center" />
      </div>
      <hr />

      <div style={{ paddingTop: "20px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Router>
            <Route exact path="/" component={Main} />
            <Route path="/novel" component={Novel} />
            <Route path="/ani" component={Ani} />
          </Router>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
