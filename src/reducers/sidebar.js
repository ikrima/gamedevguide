import { SET_SIDEBAR_OPEN, SET_SIDEBAR_DOCKED, ON_SIDEBAR_CONTENT_EXPEND } from "../actions/actionTypes";
import { maxWidth } from '../components/ResponsiveSidebar/sidebar-config';

const initialState = {
  sidebarDocked: (typeof window !== 'undefined') ? 
    window.matchMedia(`(min-width: ${maxWidth}px)`).matches: false,
  sidebarOpen: false,
  expandedKeys: [],
  searchValue: '',
  autoExpandParent: true
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
    case ON_SIDEBAR_CONTENT_EXPEND: {
      return {
        ...state,
        expandedKeys: action.payload.expandedKeys,
        autoExpandParent: action.payload.autoExpandParent
      }
    }
    default: return state
  }
}