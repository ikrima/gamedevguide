import { createStore as reduxCreateStore } from 'redux'
import rootReducer from '../reducers'

const reduxDevtoolExtention = () => {
  if (typeof window !== 'undefined') {
    return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  }
}

const createStore = () => reduxCreateStore(rootReducer, reduxDevtoolExtention())
export default createStore
