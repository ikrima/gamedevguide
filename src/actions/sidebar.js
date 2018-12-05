import { SET_SIDEBAR_OPEN, SET_SIDEBAR_DOCKED, ON_SIDEBAR_CONTENT_EXPEND, SET_POST_PAGE_ON, SET_POST_PAGE_OFF } from './actionTypes';

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

export const onSidebarContentExpand = (expandedKeys) => ({
  type: ON_SIDEBAR_CONTENT_EXPEND,
  payload: {
    expandedKeys,
    autoExpandParent: false
  }
})

export const setPostPageOn = () => ({
  type: SET_POST_PAGE_ON
})

export const setPostPageOff = () => ({
  type: SET_POST_PAGE_OFF
})