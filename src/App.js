import "./App.css";
import NavBar from "./component/views/NavBar/NavBar";
import logo from "./logo.png";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./component/Main";
import Masterpiece from "./component/views/MasterpiecePage/Masterpiece";
import Footer from "./component/views/Footer";
import RegisterPage from "./component/views/RegisterPage/RegisterPage";
import LoginPage from "./component/views/LoginPage/LoginPage";
import Auth from "./hoc/auth";
import UploadProductPage from "./component/views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./component/views/DetailProductPage/DetailProductPage";
import CartPage from "./component/views/CartPage/CartPage";
import HistoryPage from "./component/views/HistoryPage/HistoryPage";
import Storage from "./component/views/StoragePage/Storage";
import Blog from "./component/views/ETCPage/BlogPage/Blog";
import Write from "./component/views/ETCPage/BlogPage/Write";
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
            <Route exact path="/" component={Auth(Main, null)} />

            <Route
              exact
              path="/user/masterpiece"
              component={Auth(Masterpiece, true)}
            />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/products/upload"
              component={Auth(UploadProductPage, true)}
            />
            <Route
              exact
              path="/product/:productId"
              component={Auth(DetailProductPage, null)}
            />
            <Route exact path="/user/cart" component={Auth(CartPage, true)} />
            <Route exact path="/user/storage" component={Auth(Storage, true)} />
            <Route exact path="/history" component={Auth(HistoryPage, true)} />
            <Route exact path="/user/storage" component={Auth(Storage, true)} />
            <Route exact path="/blog" component={Auth(Blog, null)} />

            <Route
              exact
              path="/blog/write"
              component={Auth(Write, true)}
            ></Route>
          </Router>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
