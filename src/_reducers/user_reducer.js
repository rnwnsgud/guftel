import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_CART_ITMES,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "../_actions/types";

export default function a(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, regiter: action.payload };

    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITMES:
      return { ...state, cartDetail: action.payload };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.productInfo,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };

    default:
      return state;
  }
}
