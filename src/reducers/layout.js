import { 
  UPDATE_HEADER_HEIGHT,
  SET_ANCHOR_OPEN,
  SET_SIDEBAR_OPEN, 
  SET_SIDEBAR_DOCKED,
  ON_SIDEBAR_CONTENT_EXPAND,
  // SET_POST_PAGE_ON,
  // SET_POST_PAGE_OFF
} from "../actions/actionTypes";

const initialState = {
  header: { height: 0 },
  anchor: { open: false },
  sidebar: {
    docked: false,
    open: false,
    expandedKey: '',
    searchValue: '',
    autoExpandParent: true,
  },
  content: { onPostPage: false },
}

export default function(state=initialState, action) {
  switch (action.type) {
    // header
    case UPDATE_HEADER_HEIGHT: {
      return {
        ...state,
        header: { 
          ...state.header,
          height: action.payload.headerHeight 
        }
      }
    }
    // anchor
    case SET_ANCHOR_OPEN: {
      return {
        ...state,
        anchor: { 
          ...state.anchor,
          open: action.payload.anchorOpen 
        }
      }
    }
    // sidebar
    case SET_SIDEBAR_OPEN: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          open: action.payload.sidebarOpen
        }
      }
    }
    case SET_SIDEBAR_DOCKED: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          docked: action.payload.sidebarDocked,
          open: action.payload.sidebarOpen
        }
      }
    }
    case ON_SIDEBAR_CONTENT_EXPAND: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          expandedKey: action.payload.expandedKey,
          autoExpandParent: action.payload.autoExpandParent
        }
      }
    }
    // content
    // case SET_POST_PAGE_ON: {
    //   return {
    //     ...state,
    //     sidebar: {
    //       ...state.sidebar,
    //       docked: (typeof window !== 'undefined') ? 
    //         window.matchMedia(`(min-width: 1000px)`).matches: false,
    //     },
    //     content: {
    //       ...state.content,
    //       onPostPage: true
    //     },
    //   }
    // }
    // case SET_POST_PAGE_OFF: {
    //   return {
    //     ...state,
    //     sidebar: {
    //       ...state.sidebar,
    //       docked: false
    //     },
    //     content: {
    //       ...state.content,
    //       onPostPage: false
    //     },
    //   }
    // }
    default: return state
  }
}