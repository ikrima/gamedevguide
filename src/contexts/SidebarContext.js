import React, { createContext, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'toggleSidebar':
      return { ...state, sidebar: !state.sidebar };
    case 'toggleDrawer':
      return { ...state, drawer: !state.drawer };
    case 'toggleToc':
      return { ...state, toc: !state.toc };
    case 'openKeys':
      return { ...state, openKeys: action.payload };
    case 'scrollTop':
      return { ...state, scrollTop: action.payload };
    case 'setGuide':
      return { ...state, guide: action.payload };

    case 'closeSD':
      return { ...state, toc: false, drawer: false };

    default:
      return state;
  }
}

export const Context = createContext({});
export default function Wrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    sidebar: true,
    drawer: false,
    scrollTop: 0,
    guide: '',
    toc: false,
    slugStart: '/',
    openKeys: [],
  });
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
