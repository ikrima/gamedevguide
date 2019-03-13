import { 
  UPDATE_HEADER_HEIGHT,
  SET_ANCHOR_OPEN,
  SET_SIDEBAR_OPEN, 
  SET_SIDEBAR_DOCKED, 
  ON_SIDEBAR_CONTENT_EXPAND, 
  // SET_POST_PAGE_ON, 
  // SET_POST_PAGE_OFF
} from "./actionTypes";

// header
export const updateHeaderHeight = (height) => ({
  type: UPDATE_HEADER_HEIGHT,
  payload: {
    headerHeight: height
  }
})

// anchor
export const onSetAnchorOpen = (open) => ({
  type: SET_ANCHOR_OPEN,
  payload: {
    anchorOpen: open
  }
})

// sidebar
export const onSetSidebarOpen = (open) => ({
  type: SET_SIDEBAR_OPEN,
  payload: { sidebarOpen: open }
})

export const onSetSidebarDocked = (docked) => ({
  type: SET_SIDEBAR_DOCKED,
  payload: {
    sidebarDocked: docked,
  }
})

export const onSidebarContentExpand = (expandedKey) => ({
  type: ON_SIDEBAR_CONTENT_EXPAND,
  payload: {
    expandedKey,
    autoExpandParent: false
  }
})

// content
// export const setPostPageOn = () => ({
//   type: SET_POST_PAGE_ON
// })

// export const setPostPageOff = () => ({
//   type: SET_POST_PAGE_OFF
// })