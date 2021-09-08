const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { Payment } = require("./models/Payment");

const { auth } = require("../middleware/auth");
const async = require("async");

//bodyParser기능이 이제 express에 내장됨.
//express가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌

//application/x-www-form-urlencoded => 이런 데이터를 분석해서 가져올 수 있게 해주는거
app.use(express.urlencoded({ urlencoded: true }));
//application/json 이런 타입으로 된 것을 분석해서 가져올 수 있게 해주는거
app.use(express.json());
app.use(cookieParser());

app.use("/api/product", require("./routes/product"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/star", require("./routes/star"));
app.use("/api/blog", require("./routes/blog"));

app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const mongoose = require("mongoose");
const { Product } = require("./models/Product");
mongoose
  .connect(
    "mongodb+srv://junhyeong:kyjgshs9076@cluster0.ebxwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

app.post("/api/users/register", (req, res) => {
  //회원 가입 시 필요한 정보들을 client에서 가져오면, 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      } else if (user) {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      }

      //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
      //modelsdml user.js에 함수를 만들어준다

      //비밀번호까지 맞다면 토큰을 생성하기.
    }
  );
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과했다는 얘기는, Authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //role 0이 아니면 관리자
    isAuth: true,
    email: req.user.email,
    role: req.user.role,
    cart: req.user.cart,

    masterpiece: req.user.masterpiece,
    history: req.user.history,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/users/addTocart", auth, (req, res) => {
  //먼저 User collection에 해당 유저의 정보 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    //가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      //상품이 이미 있을 때
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    } else {
      //상품이 없을 때
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  //먼저 cart안에 내가 지우려고 한 상품을 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query.id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      //product collection에서 현재 남아있는 상품들의 정보를 가져오기

      //productIds = ['5rfff2ewd', 'eerefefeere]이런식으로 바꿔주기

      Product.find({ _id: { $in: array } }).exec((err, productInfo) => {
        return res.status(200).json({ productInfo, cart });
      });
    }
  );
});

app.post("/api/users/successBuy", auth, (req, res) => {
  //1. User collection 안에 history 필드에 간단한 결제 정보 넣어주기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      episode: item.episode,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });
  //2. Payment Collection안에 자세한 결제 정보를 넣어주기
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  //history 정보 저장
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      //payment에다가 transcationData 저장
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Product Collection안에 있는 sold 필드 정보 업데이트 시켜주기
        //상품 당 몇개의 quantity를 샀는지
        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res
              .status(200)
              .json({ success: true, cart: user.cart, carDetail: [] });
          }
        );
      });
    }
  );
});

app.post("/api/users/addToMasterpiece", auth, (req, res) => {
  //User collection에 해당 유저의 정보를 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    //가져온 정보에서 명작에다 넣으려 하는 상품이 이미 들어있는지 확인

    let duplicate = false;
    userInfo.masterpiece.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });
    //상품있을때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "masterpiece.id": req.body.productId },

        { $set: { "masterpiece.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.masterpiece);
        }
      );
    }
    //상품없을때
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            masterpiece: {
              id: req.body.productId,
              quantity: 0,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.masterpiece);
        }
      );
    }
  });
});

app.get("/api/users/removeMasterpiece", auth, (req, res) => {
  //masterpiece안에 지우려고 한 상품 지우기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { masterpiece: { id: req.query.id } },
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).send(userInfo.masterpiece);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
