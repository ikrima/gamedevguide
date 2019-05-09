/* eslint-disable */
import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { List, Icon, Popover } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { SearchContext } from '../../contexts/SearchContext';
import styled from 'styled-components';

const SearchInput = styled.input``;

export default function Search() {
  const {
    state: { results, query },
    dispatch,
  } = useContext(SearchContext);
  return (
    <>
      <div
        className="list-inline-item search-box seach-box-right d-none  d-sm-inline-block"
        style={{ maxWidth: '100px' }}
      >
        <div className="search-box-inner">
          <div className="search-box-icon">
            <Icon type="search" />
          </div>
          <Popover
            placement="bottomRight"
            // visible={results.length > 1}
            trigger="focus"
            // style={{ width: '250px' }}
            content={
              <List
                style={{ width: '250px' }}
                footer={
                  // results.filter(page => !isEmpty(page.title)).length > 5 && (
                  <Link to="/search" className="no-link-style">
                    Read All <Icon type="arrow-right" />
                  </Link>
                  // )
                }
                itemLayout="horizontal"
                // .filter(page => !isEmpty(page.title)).slice(0, 5)
                dataSource={results.slice(0, 5)}
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
