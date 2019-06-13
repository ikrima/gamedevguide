import React, { useContext } from 'react';
import { Input, List } from 'antd';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import MainLayout from '../components/main-layout';
import { SearchContext } from '../contexts/SearchContext';

const Excerpt = styled.div`
  overflow-x: hidden;
  .highlight {
    background-color: yellow;
    /* display: inline-block; */
    /* padding: 0 0.25em; */
  }
`;
const SearchPage = ({ location }) => {
  const {
    state: { results, query },
    dispatch,
  } = useContext(SearchContext);

  return (
    <MainLayout hideSidebar>
      <Input
        size="large"
        value={query}
        onChange={e => {
          dispatch({
            type: 'update',
            payload: e.target.value,
          });
        }}
        placeholder="search..."
      />

      <List
        size="large"
        bordered
        className="bg-white mt-3"
        dataSource={results}
        renderItem={item => {
          const regex = new RegExp(query.split(' ').join('|'), 'gi');
          const titleHTML = item.title
            ? item.title.replace(regex, match => `<span class="highlight">${match}</span>`)
            : '';
          const excerptHTML = item.excerpt
            ? item.excerpt.replace(regex, match => `<span class="highlight">${match}</span>`)
            : '';
          return (
            <List.Item>
              <Excerpt>
                {/* {console.log(item.excerpt)} */}
                <Link to={item.slug} dangerouslySetInnerHTML={{ __html: titleHTML }} />{' '}
                <div
                  style={{ whiteSpace: 'normal' }}
                  dangerouslySetInnerHTML={{ __html: excerptHTML }}
                />
              </Excerpt>
            </List.Item>
          );
        }}
      />
    </MainLayout>
  );
};

export default SearchPage;
