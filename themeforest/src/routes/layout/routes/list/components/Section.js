import React from 'react';
import { List, Avatar, Icon, Tag } from 'antd';
import DEMO from 'constants/demoData';

const list = DEMO.list;

const List1 = () => (
  <div className="box box-default">
    <div className="box-body">
      <List
        itemLayout="horizontal"
        dataSource={list.notifications}
        renderItem={item => (
          <List.Item>
            <div className="list-style-v1">
              <div className="list-item">
                <div className={`icon-btn icon-btn-round mr-3 ${item.iconColor}`}><Icon type={item.icon} /></div>
                <div className="list-item__body">
                  <div className="list-item__title">{item.title}</div>
                  <div className="list-item__datetime">{item.datetime}</div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  </div>
)

const List2 = () => (
  <div className="box box-default">
    <div className="box-body">
      <List
        itemLayout="horizontal"
        dataSource={list.messages}
        renderItem={item => (
          <List.Item>
            <div className="list-style-v1">
              <div className="list-item">
                <Avatar src={item.avatar} className="mr-3"/>
                <div className="list-item__body">
                  <div className="list-item__title">{item.title}</div>
                  <div className="list-item__desc">{item.desc}</div>
                  <div className="list-item__datetime">{item.datetime}</div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  </div>
)

const List3 = () => (
  <div className="box box-default">
    <div className="box-body">
      <List
        itemLayout="horizontal"
        dataSource={list.tasks}
        renderItem={item => (
          <List.Item>
            <div className="list-style-v1">
              <div className="list-item">
                <div className="list-item__body">
                  <div className="list-item__title">{item.title} <Tag color={item.tagColor}>{item.tag}</Tag></div>
                  <div className="list-item__datetime">{item.desc}</div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  </div>
)


const Section = () => (
  <article className="article">
    <h2 className="article-title">List / List Group</h2>

    <div className="row">
      <div className="col-md-4"> <List1 /> </div>
      <div className="col-md-4"> <List2 /> </div>
      <div className="col-md-4"> <List3 /> </div>
    </div>
  </article>
)

export default Section;
