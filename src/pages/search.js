import React, { useContext } from 'react';
import { Input, List } from 'antd';
import { Link } from 'gatsby';
import MainLayout from '../components/main-layout';
import { SearchContext } from '../contexts/SearchContext';

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
        renderItem={item => (
          <List.Item>
            <Link to={item.slug}>{item.title}</Link>
          </List.Item>
        )}
      />
    </MainLayout>
  );
};

export default SearchPage;
