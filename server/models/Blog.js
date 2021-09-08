const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    createdAt: {
      // 기본값을 설정할땐 이렇게 객체로 설정해줍니다
      type: Date,
      default: Date.now, // 기본값은 현재 날짜로 지정합니다.
    },
  },
  { timestamp: true }
);
blogSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Blog = mongoose.model("Blog", blogSchema); //"User"모델로 스키마를 감싸줌
module.exports = { Blog };
