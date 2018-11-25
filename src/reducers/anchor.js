import { SET_ANCHOR_DOCKED } from "../actions/actionTypes";
import { maxWidth } from '../components/ResponsiveAnchor/anchor-config';

const initialState = {
  anchorDocked: (typeof window !== 'undefined') ? 
    window.matchMedia(`(min-width: ${maxWidth}px)`).matches: false,
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_ANCHOR_DOCKED: {
      return {
        ...state,
        anchorDocked: action.payload.anchorDocked,
      }
    }
    default: return state
  }
}