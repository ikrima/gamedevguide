import React from 'react';
import { List } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const ListDefault = () => (
  <div className="box box-default">
    <div className="box-header">Default Size</div>
    <div className="box-body">
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
    </div>
  </div>
)
const ListSm = () => (
  <div className="box box-default">
    <div className="box-header">Small Size</div>
    <div className="box-body">
      <List
        size="small"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
    </div>
  </div>
)
const ListLg = () => (
  <div className="box box-default">
    <div className="box-header">Large Size</div>
    <div className="box-body">
      <List
        size="large"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
    </div>
  </div>
)


const Section = () => (
  <article className="article">
    <h2 className="article-title">Sizes</h2>

    <div className="row">
      <div className="col-md-4"> <ListDefault /> </div>
      <div className="col-md-4"> <ListSm /> </div>
      <div className="col-md-4"> <ListLg /> </div>
    </div>
  </article>
)

export default Section;