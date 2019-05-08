import APPCONFIG from 'constants/appConfig';
import * as types from '../constants/actionTypes';

const initialSettings = APPCONFIG.settings;

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case types.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.layoutOption
      };
    case types.TOGGLE_BOXED_LAYOUT:
      return {
        ...state,
        boxedLayout: action.isBoxedLayout
      };
    case types.TOGGLE_FIXED_SIDENAV:
      return {
        ...state,
        fixedSidenav: action.isFixedSidenav
      };
    case types.TOGGLE_FIXED_HEADER:
      return {
        ...state,
        fixedHeader: action.isFixedHeader
      };
    case types.TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        collapsedNav: action.isCollapsedNav
      };
    case types.TOGGLE_OFFCANVAS_NAV:
      return {
        ...state,
        offCanvasNav: action.isOffCanvasNav
      };
    case types.CHANGE_SIDENAV_WIDTH:
      return {
        ...state,
        sidenavWidth: action.sidenavWidth
      };
    case types.TOGGLE_OFFCANVAS_MOBILE_NAV:
      return {
        ...state,
        offCanvasMobileNav: action.isOffCanvasMobileNav
      };
    case types.CHANGE_COLOR_OPTION:
      return {
        ...state,
        colorOption: action.colorOption
      };
    default:
      return state;
  }
}

export default settings;
