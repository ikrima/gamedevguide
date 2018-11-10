import { SET_SIDEBAR_OPEN, SET_SIDEBAR_DOCKED } from "../actions/actionTypes";

const initialState = {
  sidebarDocked: window.matchMedia(`(min-width: 800px)`).matches,
  sidebarOpen: false
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_OPEN: {
      return {
        ...state,
        sidebarOpen: action.payload.sidebarOpen
      }
    }
    case SET_SIDEBAR_DOCKED: {
      return {
        ...state,
        sidebarDocked: action.payload.sidebarDocked,
        sidebarOpen: action.payload.sidebarOpen
      }
    }
    default: return state
  }
}