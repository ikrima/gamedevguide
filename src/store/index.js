import { createStore as reduxCreateStore } from "redux"
import rootReducer from "../reducers";
// import thunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default createStore(
  // rootReducer,
  // composeEnhancers(applyMiddleware(thunk))
// );
const createStore = () => reduxCreateStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default createStore