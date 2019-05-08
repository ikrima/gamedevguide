import React from 'react';
import { Table, Icon } from 'antd';
import DEMO from 'constants/demoData';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href={DEMO.link}>{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href={DEMO.link}>Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href={DEMO.link}>Delete</a>
      <span className="ant-divider" />
      <a href={DEMO.link} className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const Article = () => {
  return(
    <article className="article">
      <h2 className="article-title">Basic Usage</h2>
      <Table columns={columns} dataSource={data} className="ant-table-v1" />
    </article>
  )
}

export default Article;