import { UPDATE_HEADER_HEIGHT } from "./actionTypes";


export const updateHeaderHeight = (height) => ({
  type: UPDATE_HEADER_HEIGHT,
  payload: {
    headerHeight: height
  }
})