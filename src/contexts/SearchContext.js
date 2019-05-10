/* eslint-disable */

import React, { createContext, useReducer } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Index } from 'elasticlunr';

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        results: state.createdIndex
          .search(action.payload, { expand: true })
          .map(({ ref }) => state.createdIndex.documentStore.getDoc(ref)),
        query: action.payload,
      };
    case 'reset':
      return { ...state, results: [], query: '' };
    default:
      return state;
  }
}

export const SearchContext = createContext({});
export default function Wrapper({ children }) {
  const {
    siteSearchIndex: { index },
  } = useStaticQuery(graphql`
    {
      siteSearchIndex {
        index
      }
    }
  `);
  const [state, dispatch] = useReducer(reducer, {
    results: [],
    createdIndex: Index.load(index),
    query: '',
  });

  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>;
}
