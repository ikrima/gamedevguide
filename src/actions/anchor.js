import { SET_ANCHOR_DOCKED, SET_ANCHOR_OPEN } from './actionTypes'

export const onSetAnchorDocked = (docked) => ({
  type: SET_ANCHOR_DOCKED,
  payload: {
    anchorDocked: docked
  }
})

export const onSetAnchorOpen = (open) => ({
  type: SET_ANCHOR_OPEN,
  payload: {
    anchorOpen: open
  }
})