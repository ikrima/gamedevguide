import { SET_SIDEBAR_OPEN, SET_SIDEBAR_DOCKED } from "../actions/actionTypes";
import { maxWidth } from '../components/ResponsiveSidebar/sidebar-config';

const initialState = {
  sidebarDocked: window.matchMedia(`(min-width: ${maxWidth}px)`).matches,
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