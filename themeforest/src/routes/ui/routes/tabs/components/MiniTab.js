import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Mini tab</div>
      <div className="box-body">
        <Tabs
          defaultActiveKey="2"
          size="small"
          style={{ height: 200 }}
        >
          <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Box;