import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
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
      <h2 className="article-title">Size</h2>
      <div className="box box-default mb-4">
        <div className="box-header">Middle size table</div>
        <div className="box-body">
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </div>
      <div className="box box-default mb-4">
        <div className="box-header">Small size table</div>
        <div className="box-body">
          <Table columns={columns} dataSource={data} size="small" />
        </div>
      </div>
    </article>
  )
}

export default Article;