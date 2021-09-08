const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //파일저장위치
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); //`${}`템플릿리터럴, 문자열 변환
  },
});

var upload = multer({ storage: storage }).single("file");
//index.js에서 /api/product부분을 타고와서 이 부분이 필요없음
router.post("/image", (req, res) => {
  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  //index.js에서 /api/product부분을 타고와서 이 부분이 필요없음
  //받아온 정보를 DB에 넣어준다.
  const product = Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  //product collection에 들어있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    //key genres or episode

    if (req.body.filters[key].length > 0) {
      //console.log("key", key);
      if (key === "episode") {
        findArgs[key] = {
          $gte: req.body.filters[key][0], //greater than equal in mongoDB
          $lte: req.body.filters[key][1], //less than equl
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  //console.log("findArgs", findArgs);
  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  //쿼리를 이용해서 가져올때 req.query
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    //id=1211313,34354442,34323224 이렇게 온거를
    //productIds = [1211313, 34354442,...]이런식으로 바꿔주기
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  Product.find({ _id: { $in: productIds } }).exec((err, product) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(product);
  });

  //productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.
});

router.post("/getMasterpiece", (req, res) => {
  let id = req.body.masterpieceItems;

  Product.find({ _id: { $in: id } }).exec((err, product) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, product });
  });
});

router.post("/getCart", (req, res) => {
  let id = req.body.cart;

  Product.find({ _id: { $in: id } }).exec((err, product) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, product });
  });
});

router.post("/getStar", (req, res) => {
  let id = req.body.stars;

  Product.find({ _id: { $in: id } }).exec((err, product) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, product });
  });
});

module.exports = router;
