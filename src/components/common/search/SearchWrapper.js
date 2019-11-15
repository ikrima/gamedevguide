import React from "react"
import PropTypes from 'prop-types'
import {
    InstantSearch,
    Configure,
} from 'react-instantsearch-dom'

const SearchWrapper = ({ children }) => (
    <InstantSearch
        appId="FULTPXSSOM"
        apiKey="8829fd8be7b036933bdbaa400722f56b"
        indexName="opensource"
    >
        <Configure attributesToSnippet="html" />
        {children}
    </InstantSearch>
);

SearchWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SearchWrapper
