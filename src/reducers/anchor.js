import { SET_ANCHOR_DOCKED, SET_ANCHOR_OPEN } from "../actions/actionTypes";
import { maxWidth } from '../components/ResponsiveAnchor/anchor-config';

const initialState = {
  anchorDocked: (typeof window !== 'undefined') ? 
    window.matchMedia(`(min-width: ${maxWidth}px)`).matches: false,
  anchorOpen: false
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_ANCHOR_DOCKED: {
      return {
        ...state,
        anchorDocked: action.payload.anchorDocked,
      }
    }
    case SET_ANCHOR_OPEN: {
      return {
        ...state,
        anchorOpen: action.payload.anchorOpen
      }
    }
    default: return state
  }
}