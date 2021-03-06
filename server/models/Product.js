const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    episode: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    view: {
      //masterpiece
      type: Number,
      default: 0,
    },
    genres: {
      type: Number,
      default: 1,
    },
  },
  { timestamp: true }
);
productSchema.index(
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

const Product = mongoose.model("Product", productSchema); //"User"모델로 스키마를 감싸줌
module.exports = { Product };
