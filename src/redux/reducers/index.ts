import { combineReducers } from "redux";
import approveReducer from "./approveReducer";
import fetchNftReducer from "./fetchNftReducer";
import changeBirdColorReducer from "./changeBirdColorReducer";
import { changeBirdColor } from "../action-creators";


const reducers = combineReducers({
  approve: approveReducer,
  fetch: fetchNftReducer,
  changeBirdColor:changeBirdColorReducer
});

export default reducers;
export type State = ReturnType<typeof reducers>;
