import { SET_ANCHOR_DOCKED } from './actionTypes'

export const onSetAnchorDocked = (docked) => ({
  type: SET_ANCHOR_DOCKED,
  payload: {
    anchorDocked: docked
  }
})