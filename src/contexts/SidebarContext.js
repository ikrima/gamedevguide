import React, { createContext, useReducer } from 'react'

function reducer(state, action) {
  // const start = (typeof window !== 'undefined' && window.location.pathname.slice('/')[1]) || '/'
  switch (action.type) {
    case 'toggleSidebar':
      return { ...state, sidebar: !state.sidebar }
    case 'toggleDrawer':
      return { ...state, drawer: !state.drawer }
    case 'toggleToc':
      return { ...state, toc: !state.toc }
    case 'openKeys':
      return { ...state, openKeys: action.payload }

    case 'closeSD':
      return { ...state, toc: false, drawer: false }

    default:
      return state
  }
}

export const Context = createContext()
export default function Wrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    sidebar: true,
    drawer: false,
    toc: false,
    slugStart: '/',
    openKeys: [],
  })
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}
