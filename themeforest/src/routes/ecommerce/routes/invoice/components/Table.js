import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: '#',
  dataIndex: 'number',
  key: 'number',
}, {
  title: 'Product',
  dataIndex: 'product',
  key: 'product',
}, {
  title: 'Unit Cost',
  dataIndex: 'unitCost',
  key: 'unitCost',
}, {
  title: 'Quantity',
  dataIndex: 'quantity',
  key: 'quantity',
}, {
  title: 'Total',
  dataIndex: 'total',
  key: 'total',
}];

const data = [{
  key: '1',
  number: '1',
  product: 'Product One',
  unitCost: 100,
  quantity: 1,
  total: 100
}, {
  key: '2',
  number: '2',
  product: 'Product Two',
  unitCost: 550,
  quantity: 2,
  total: 1100
}, {
  key: '3',
  number: '3',
  product: 'Product Three',
  unitCost: 320,
  quantity: 2,
  total: 640
}, {
  key: '4',
  number: '4',
  product: 'Product Four',
  unitCost: 80,
  quantity: 5,
  total: 400
}, {
  key: '5',
  number: '5',
  product: 'Product Five',
  unitCost: 90,
  quantity: 4,
  total: 360
}, {
  key: '6',
  number: '6',
  product: 'Product Six',
  unitCost: 35,
  quantity: 4,
  total: 140
},];

const Section = () => (
  <Table
    className="invoice-table"
    columns={columns}
    dataSource={data}
    pagination={false}
  />
)

export default Section;

