import { SET_ANCHOR_OPEN } from './actionTypes'

export const onSetAnchorOpen = (open) => ({
  type: SET_ANCHOR_OPEN,
  payload: {
    anchorOpen: open
  }
})