import { SET_SIDEBAR_OPEN, SET_SIDEBAR_DOCKED } from './actionTypes';

export const onSetSidebarOpen = (open) => ({
  type: SET_SIDEBAR_OPEN,
  payload: { sidebarOpen: open }
})

export const onSetSidebarDocked = (docked) => ({
  type: SET_SIDEBAR_DOCKED,
  payload: {
    sidebarDocked: docked,
    sidebarOpen: false
  }
})