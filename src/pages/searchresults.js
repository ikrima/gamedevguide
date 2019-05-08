import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const SearchResults = ({ location }) => {
  if (location.state.search) {
    return (
      <Layout>
        <h1>Search Results</h1>
        <ul>
          {location.state.search.map(page => (
            <li key={page.id}>
              <Link to={`/${page.path}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
  return (
    <Layout>
      <h1>Search Results</h1>
      <p>No search was made</p>
    </Layout>
  )
}

export default SearchResults
