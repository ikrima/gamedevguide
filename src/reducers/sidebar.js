import { SET_SIDEBAR_OPEN, SET_SIDEBAR_DOCKED, ON_SIDEBAR_CONTENT_EXPEND, SET_POST_PAGE_ON, SET_POST_PAGE_OFF } from "../actions/actionTypes";
import { maxWidth } from '../components/ResponsiveSidebar/sidebar-config';

const initialState = {
  // sidebarDocked: (typeof window !== 'undefined') ? 
  //   window.matchMedia(`(min-width: ${maxWidth}px)`).matches: false,
  sidebarDocked: true,
  sidebarOpen: false,
  expandedKeys: [],
  searchValue: '',
  autoExpandParent: true,
  onPostPage: false,
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
    case SET_POST_PAGE_ON: {
      return {
        ...state,
        sidebarDocked: (typeof window !== 'undefined') ? 
          window.matchMedia(`(min-width: ${maxWidth}px)`).matches: false,
        onPostPage: true,
      }
    }
    case SET_POST_PAGE_OFF: {
      return {
        ...state,
        sidebarDocked: false,
        onPostPage: false,
      }
    }
    default: return state
  }
}