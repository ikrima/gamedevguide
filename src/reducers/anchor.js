import { SET_ANCHOR_OPEN } from "../actions/actionTypes";

const initialState = {
  anchorOpen: false
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_ANCHOR_OPEN: {
      return {
        ...state,
        anchorOpen: action.payload.anchorOpen
      }
    }
    default: return state
  }
}