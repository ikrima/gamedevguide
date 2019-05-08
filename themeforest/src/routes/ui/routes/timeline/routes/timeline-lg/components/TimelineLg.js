import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Tabs } from 'antd';
import Timeline1 from './Timeline1';
import Timeline2 from './Timeline2';
const TabPane = Tabs.TabPane;


const Page = () => {
  return(
    <section className="page-with-tabs">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <div className="page-title">
            <h1>Timeline</h1>
          </div>
        </div>

        <div key="2">
          <Tabs className="page-tabs" defaultActiveKey="1">
            <TabPane tab="Two Sides" key="1"><Timeline1 /></TabPane>
            <TabPane tab="Left Sides" key="2"><Timeline2 /></TabPane>
          </Tabs>
        </div>
      </QueueAnim>
    </section>
  );
}

export default Page;
