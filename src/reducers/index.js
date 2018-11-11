import { combineReducers } from "redux";
import sidebar from "./sidebar";
import layout from "./layout";

export default combineReducers({ 
  sidebar,
  layout,
});