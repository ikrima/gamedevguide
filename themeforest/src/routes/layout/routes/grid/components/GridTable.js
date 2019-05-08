import React from 'react';
import { Table } from 'antd';

const renderContent = (text, row, index) => {
  const obj = {
    children:text,
    props: {},
  };
  if (index === 0) {
    obj.props.colSpan = 0;
  }
  if (index === 2) {
    obj.children = <code>{text}</code>;
  }
  if ( [3, 4, 5, 6, 7].indexOf(index) >=0 ) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [{
  title: '#',
  dataIndex: 'name',
}, {
  title: 'Extra Small',
  dataIndex: 'xs',
  render: (text, row, index) => {
    const obj = {
      children:text,
      props: {},
    };
    if (index === 2) {
      obj.children = <code>{text}</code>;
    }
    if ( [3, 4, 5, 6, 7].indexOf(index) >=0 ) {
      obj.props.colSpan = 5;
    }
    return obj;
  }
}, {
  title: 'Small',
  dataIndex: 'sm',
  render: (text, row, index) => {
    const obj = {
      children:text,
      props: {},
    };
    if (index === 0) {
      obj.props.colSpan = 4;
    }
    if (index === 2) {
      obj.children = <code>{text}</code>;
    }
    if ( [3, 4, 5, 6, 7].indexOf(index) >=0 ) {
      obj.props.colSpan = 0;
    }
    return obj;
  }
}, {
  title: 'Medium',
  dataIndex: 'md',
  render: renderContent,
}, {
  title: 'Large',
  dataIndex: 'lg',
  render: renderContent,
}, {
  title: 'Extra Large',
  dataIndex: 'xl',
  render: renderContent,
}];

const data = [{
  key: '1',
  name: 'Grid behavior',
  xs: 'Horizontal at all times',
  sm: 'Collapsed to start, horizontal above breakpoints',
}, {
  key: '2',
  name: 'Max container width',
  xs: 'None (auto)',
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px'
}, {
  key: '3',
  name: 'Class prefix',
  xs: '.col-',
  sm: '.col-sm-',
  md: '.col-md-',
  lg: '.col-lg-',
  xl: '.col-xl-'
}, {
  key: '4',
  name: '# of columns',
  xs: '12'
}, {
  key: '5',
  name: 'Gutter width',
  xs: '30px (15px on each side of a column)'
}, {
  key: '6',
  name: 'Nestable',
  xs: 'Yes'
}, {
  key: '7',
  name: 'Offsets',
  xs: 'Yes'
}, {
  key: '8',
  name: 'Column ordering',
  xs: 'Yes'
}];


const Article = () => {
  return(
    <article className="article">
      <h2 className="article-title mb-3">Bootstrap Grid System</h2>
      <p className="mb-5">Bootstrap's <em>powerful</em> mobile-first flexbox grid system</p>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="ant-table-v1"
      />
    </article>
  )
}

export default Article;