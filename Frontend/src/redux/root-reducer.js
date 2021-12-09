import { combineReducers } from "redux";
import booksReducer from "./reducer";

const rootReducer = combineReducers({
  data: booksReducer,
});

export default rootReducer;
