import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;

// customized demo

function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return (new Array(getRandomInt(5))).join('.').split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      {item.query} in
      <a
        href={`https://s.taobao.com/search?q=${item.query}`}
        target="_blank"
        rel="noopener noreferrer"
        className="global-search-item-category"
      >
        {item.category}
      </a>
       category 
      <span className="global-search-item-count"> {item.count} results</span>
    </Option>
  );
}

class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  handleChange = (value) => {
    this.setState({
      dataSource: value ? searchResult(value) : [],
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={dataSource.map(renderOption)}
          onSelect={onSelect}
          onChange={this.handleChange}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}

const Section = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Lookup-Patterns - Uncertain Category</div>
      <div className="box-body">
        <Complete />
      </div>
    </div>
  )
}

export default Section;