const express = require("express");
const router = express.Router();
const { Blog } = require("../models/Blog");
router.post("/", (req, res) => {
  const blog = Blog(req.body);

  blog.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/countBoards", (req, res) => {
  Blog.find()
    .count()
    .exec((err, counts) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, counts });
    });
});

router.post("/boards", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Blog.find()
    .skip(skip)
    .limit(limit)
    .exec((err, boards) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, boards });
    });
});

module.exports = router;
