import axios from "axios";
import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_CART_ITMES,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "./types";

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/users/login", dataTosubmit)
    .then((response) => response.data);

  //dispatch로 action이 들어오고나서 request리듀서로 보내주는 작업
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataTosubmit) {
  const request = axios
    .post("/api/users/register", dataTosubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth") //get이라 body부분, dataTosubmit 필요없음
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    productId: id,
  };

  const request = axios
    .post("/api/users/addToCart", body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      //cartItem들에 해당하는 정보들을
      //Product Collection에서 가져온 후에
      //Quantity 정보를 넣어준다.
      console.log("userCart", userCart);

      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_CART_ITMES,
    payload: request,
  };
}

export function removeCartItem(productId) {
  const request = axios
    .get(`/api/users/removeFromCart?id=${productId}`)
    .then((response) => {
      //productInfo, cart 정보를 조합해서 CartDetail을 만든다.
      console.log("response.data", response.data);
      response.data.cart.forEach((item) => {
        response.data.productInfo.forEach((product, index) => {
          if (item.id === product._id) {
            response.data.productInfo[index].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}

export function onSuccessBuy(data) {
  const request = axios
    .post(`/api/users/successBuy`, data)
    .then((response) => response.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
}
