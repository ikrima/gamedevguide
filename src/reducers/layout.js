import { UPDATE_HEADER_HEIGHT } from "../actions/actionTypes";

const initialState = {
  headerHeight: 0,
}

export default function(state=initialState, action) {
  switch (action.type) {
    case UPDATE_HEADER_HEIGHT: {
      return {
        ...state,
        headerHeight: action.payload.headerHeight
      }
    }
    default: return state
  }
}