const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema(
  {
    user: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    product: {
      type: Array,
      default: [],
    },
  },
  { timestamp: true }
);

const Payment = mongoose.model("Payment", paymentSchema); //"User"모델로 스키마를 감싸줌
module.exports = { Payment };
