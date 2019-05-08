import React from 'react';
import { Table } from 'antd';
import DEMO from 'constants/demoData';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href={DEMO.link}>{text}</a>,
}, {
  title: 'Cash Assets',
  className: 'column-money',
  dataIndex: 'money',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  money: '￥300,000.00',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  money: '￥1,256,000.00',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  money: '￥120,000.00',
  address: 'Sidney No. 1 Lake Park',
}];


const Article = () => {
  return(
    <article className="article demo-style-table">
      <h2 className="article-title">Border, title and footer</h2>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'Header'}
        footer={() => 'Footer'}
        className="ant-table-v1"
      />
    </article>
  )
}

export default Article;