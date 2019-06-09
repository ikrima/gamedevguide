/* eslint-disable */

import React, { createContext, useReducer } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Index } from 'elasticlunr';
var GuideRegExp = new RegExp(/^\w+\:/, 'i');
function reducer(state, action) {
  var searchTerm = action.payload.replace(GuideRegExp, '');
  switch (action.type) {
    case 'update':
      return {
        ...state,
        results: state.createdIndex
          .search(searchTerm, { expand: true })
          .map(({ ref }) => state.createdIndex.documentStore.getDoc(ref))
          .filter(item => {
            var guides = action.payload.match(GuideRegExp);

            if (guides) {
              var guide = guides[0];
              console.log(item.guideName);

              if (item.guideName == guide.slice(0, guide.length - 1)) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          }),
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
