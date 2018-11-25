import { combineReducers } from "redux";
import sidebar from "./sidebar";
import layout from "./layout";
import anchor from "./anchor";

export default combineReducers({ 
  sidebar,
  layout,
  anchor,
});