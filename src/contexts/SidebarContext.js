/* eslint-disable no-param-reassign */
import React, { createContext, useReducer, useEffect, useRef } from 'react';

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
    case 'openKeysFromLocation':
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

function getKeysFromLocation() {
  const getInitialKeys = (all, item, index, arr) => [...all, `/${arr.slice(0, index).join('/')}`];
  if (typeof window !== 'undefined') {
    return window.location.pathname
      .split('/')
      .reduce(getInitialKeys, Array.from({ length: 0 }))
      .slice(3);
  }
  return [];
}

export const Context = createContext({});
export default function Wrapper({ children }) {
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const initialKeys = getKeysFromLocation();

  const [state, dispatch] = useReducer(reducer, {
    sidebar: true,
    drawer: false,
    scrollTop: 0,
    guide: '',
    toc: false,
    slugStart: '/',
    openKeys: [...initialKeys],
  });
  const el = document.querySelector('.ant-menu-item-selected');

  const prev = usePrevious(el);
  useEffect(() => {
    if (!prev && el) {
      el.scrollIntoView({ block: 'center' });
    }
  }, [el]);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
