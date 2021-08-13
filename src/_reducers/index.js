import { combineReducers } from "redux";
import user from "./user_reducer";

//다양한 리듀서가 추가될 때 마다, combinereducers로 하나로 합쳐줌
//user는 어디에 있는것일까?
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
