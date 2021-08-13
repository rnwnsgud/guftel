const express = require("express");
const router = express.Router();
const { Star } = require("../models/Star");

//=================================
//            Like
//=================================

router.post("/getStars", (req, res) => {
  let variable = { productId: req.body.productId, userId: req.body.userId };

  Star.find(variable).exec((err, stars) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, stars });
  });
});

router.post("/upStar", (req, res) => {
  let variable = {
    productId: req.body.productId,
    userId: req.body.userId,
    star: req.body.star,
  };

  const star = new Star(variable);
  star.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, result });
  });
});

module.exports = router;
