import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

// customized demo

const dataSource = [{
  title: 'Topics',
  children: [{
    title: 'AntDesign',
    count: 10000,
  }, {
    title: 'AntDesign UI',
    count: 10600,
  }],
}, {
  title: 'Questions',
  children: [{
    title: 'AntDesign UI is good',
    count: 60100,
  }, {
    title: 'What is AntDesign',
    count: 30010,
  }],
}, {
  title: 'Posts',
  children: [{
    title: 'AntDesign is cool',
    count: 100000,
  }],
}];

function renderTitle(title) {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >More
      </a>
    </span>
  );
}

const options = dataSource.map(group =>
  <OptGroup
    key={group.title}
    label={renderTitle(group.title)}
    className="page-demo-autocomplete"
  >
    {group.children.map(opt =>
      <Option key={opt.title} value={opt.title}>
        {opt.title}
        <span className="certain-search-item-count">{opt.count} followers</span>
      </Option>)
    }
  </OptGroup>).concat([
    <Option disabled key="all" className="show-all">
      <a
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >Show all results</a>
    </Option>,
  ]);

function Complete() {
  return (
    <div className="certain-category-search-wrapper" style={{ width: 250 }}>
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={options}
        placeholder="input here"
        optionLabelProp="value"
      >
        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
      </AutoComplete>
    </div>
  );
}

const Section = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Lookup-Patterns - Certain Category</div>
      <div className="box-body">
        <Complete />
      </div>
    </div>
  )
}

export default Section;