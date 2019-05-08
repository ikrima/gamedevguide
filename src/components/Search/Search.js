import React, { Component } from 'react'
import { AutoComplete as AntdAutoComplete, Input as AntdInput, Button as AntdButton } from 'antd'
import PropTypes from 'prop-types'
import { Index } from 'elasticlunr'
import { Link, navigate } from 'gatsby'
import _ from 'lodash'
import siteCfg from '../../../SiteCfg'

const AntdSearch = AntdInput.Search
const AntdOption = AntdAutoComplete.Option
const AntdOptGroup = AntdAutoComplete.OptGroup

// Search component
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  getOrCreateIndex = () => (this.index ? this.index : Index.load(this.props.searchIndex)) // Create an elastic lunr index and hydrate with graphql query results

  handleInlineSearch = searchQuery => {
    const query = searchQuery
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        .slice(0, siteCfg.inlineSearchResultMax)
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }

  onSelectSearchResult = searchResultPath => {
    navigate(`/${searchResultPath}`)
  }

  handleFullSearch = () => {
    const { results } = this.state

    navigate('/searchresults', {
      state: { search: results },
    })
  }

  renderInlineResultsDataSource = dataSource => {
    const { results } = this.state
    const retValsByGuide = _.sortBy(_.toPairs(_.groupBy(dataSource, 'guideName')), kvp => kvp[0])
    const retVals = _.map(retValsByGuide, kvp => {
      const grpKey = kvp[0]
      const grpValue = kvp[1]
      const optionChildren = grpValue.map(searchResult => (
        <AntdOption key={searchResult.path} value={searchResult.path}>
          {searchResult.title}
        </AntdOption>
      ))
      return (
        <AntdOptGroup key={grpKey} label={grpKey}>
          {optionChildren}
        </AntdOptGroup>
      )
    })

    if (dataSource.length >= siteCfg.inlineSearchResultMax) {
      retVals.push(
        <AntdOption disabled key="inlineSearchResultShowMore">
          <Link to="/searchresults" state={{ search: results }} key="showMoreSearchResults">
            <AntdButton type="primary">Show More Results</AntdButton>
          </Link>
        </AntdOption>
      )
    }
    return retVals
  }

  render() {
    const { results } = this.state
    return (
      <AntdAutoComplete
        dataSource={this.renderInlineResultsDataSource(results)}
        onSearch={this.handleInlineSearch}
        onSelect={this.onSelectSearchResult}
        optionLabelProp="text"
      >
        <AntdSearch
          placeholder="type search text"
          // eslint-disable-next-line react/destructuring-assignment
          value={this.state.query}
          // eslint-disable-next-line react/destructuring-assignment
          onSearch={this.handleFullSearch}
          enterButton
        />
      </AntdAutoComplete>
    )
  }
}

Search.propTypes = {
  searchIndex: PropTypes.object,
}

export default Search
