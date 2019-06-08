import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import {
  List,
  Icon,
  Popover,
  AutoComplete as AntdAutoComplete,
  Input as AntdInput,
  Button as AntdButton,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import _ from 'lodash';
import { SearchContext } from '../../contexts/SearchContext';
import siteCfg from '../../../SiteCfg';

const AntdSearch = AntdInput.Search;
const AntdOption = AntdAutoComplete.Option;
const AntdOptGroup = AntdAutoComplete.OptGroup;

// eslint-disable-next-line no-unused-vars
const SearchInput = styled.input``;

// Search component
export function SearchUsingAutocomplete() {
  const {
    state: { results, query },
    dispatch,
  } = useContext(SearchContext);
  const filteredResults = results.slice(0, siteCfg.inlineSearchResultMax);

  // Create an elastic lunr index and hydrate with graphql query searchresults
  // const getOrCreateIndex = () => {
  //   const { searchIndex } = this.props
  //   return this.index ? this.index : Index.load(searchIndex)
  // }

  const handleInlineSearch = searchQuery => {
    dispatch({ type: 'update', payload: searchQuery });

    // const query = searchQuery
    // this.index = this.getOrCreateIndex()
    // this.setState({
    //   query,
    //   // Query the index with search string to get an [] of IDs
    //   filteredResults: this.index
    //     .search(query, { expand: true })
    //     .slice(0, siteCfg.inlineSearchResultMax)
    //     // Map over each ID and return the full document
    //     .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    // })
  };

  const onSelectSearchResult = searchResultPath => {
    dispatch({ type: 'update', payload: '' });
    navigate(`/${searchResultPath}`);
  };

  const handleFullSearch = () => {
    navigate('/searchresults');

    // const { filteredResults } = this.state
    // navigate('/searchresults', {
    //   state: { search: filteredResults },
    // })
  };

  const renderInlineResultsDataSource = searchResults => {
    const retValsByGuide = _.sortBy(
      _.toPairs(_.groupBy(searchResults, 'guideName')),
      kvp => kvp[0]
    );
    const retVals = _.map(retValsByGuide, kvp => {
      const grpKey = kvp[0];
      const grpValue = kvp[1];
      const regex = new RegExp(query.split(' ').join('|'), 'gi');

      const optionChildren = grpValue.map(searchResult => {
        const titleHTML = searchResult.title.replace(
          regex,
          match => `<span style="background-color: yellow;">${match}</span>`
        );
        const excerptHTML = searchResult.excerpt.replace(
          regex,
          match => `<span style="background-color: yellow;">${match}</span>`
        );
        return (
          <AntdOption style={{ height: 'auto' }} key={searchResult.slug} value={searchResult.slug}>
            <Link to={searchResult.slug} dangerouslySetInnerHTML={{ __html: titleHTML }} />
            <div dangerouslySetInnerHTML={{ __html: excerptHTML }} />
          </AntdOption>
        );
      });
      return (
        <AntdOptGroup key={grpKey} label={grpKey}>
          {optionChildren}
        </AntdOptGroup>
      );
    });

    if (searchResults.length >= siteCfg.inlineSearchResultMax) {
      retVals.push(
        <AntdOption disabled key="inlineSearchResultShowMore">
          <Link to="/searchresults" key="showMoreSearchResults">
            <AntdButton type="primary">Show More Results</AntdButton>
          </Link>
        </AntdOption>
      );
    }
    return retVals;
  };

  return (
    <AntdAutoComplete
      dataSource={renderInlineResultsDataSource(filteredResults)}
      onSearch={handleInlineSearch}
      onSelect={onSelectSearchResult}
      optionLabelProp="text"
    >
      <AntdSearch
        placeholder="type search text"
        value={query}
        onSearch={handleFullSearch}
        enterButton
      />
    </AntdAutoComplete>
  );
}

export function SearchUsingPopover() {
  const {
    state: { results, query },
    dispatch,
  } = useContext(SearchContext);
  const filteredResults = results.slice(0, siteCfg.inlineSearchResultMax);
  return (
    <>
      <div
        className="list-inline-item search-box seach-box-right d-none  d-sm-inline-block"
        style={{ maxWidth: '300px' }}
      >
        <div className="search-box-inner">
          <div className="search-box-icon">
            <Icon type="search" />
          </div>
          <Popover
            placement="bottomRight"
            // visible={filteredResults.length > 1}
            trigger="focus"
            // style={{ width: '250px' }}
            content={
              <List
                // style={{ width: '250px' }}
                footer={
                  // filteredResults.length > 5 && (
                  <Link to="/searchresults" className="no-link-style">
                    Read All <Icon type="arrow-right" />
                  </Link>
                  // )
                }
                itemLayout="horizontal"
                dataSource={filteredResults}
                renderItem={item => (
                  <List.Item>
                    <div className="list-style-v1" style={{ width: '300px' }}>
                      <div className="list-item">
                        <div className="list-item__body">
                          <div className="list-item__title">
                            <Link
                              onClick={() => {
                                dispatch({
                                  type: 'update',
                                  payload: '',
                                });
                              }}
                              to={`/${item.slug}`}
                            >
                              {item.title}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            }
          >
            <input
              type="text"
              value={query}
              onChange={e => {
                dispatch({
                  type: 'update',
                  payload: e.target.value,
                });
              }}
              placeholder="search..."
            />
          </Popover>
          <span className="input-bar" />
        </div>
      </div>
    </>
  );
}

// export default SearchUsingPopover;
export default SearchUsingAutocomplete;
