import React from 'react';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { Tabs } from 'antd';
import { UITIMELINE } from 'constants/uiComponents'
const TabPane = Tabs.TabPane;

const EXAMPLEPAGE = UITIMELINE[1].path;

const TabContent1 = () => (
  <div className="container-fluid">
    <div className="callout callout-info">
      <p>Page with Tabs takes advantage of <code>Tabs</code> component API</p>
      <p>For examples You can change tabs animation using Tabs component <code>animated</code> API
      <br/>Or use <code>defaultActiveKey</code> API to change the default active TabPane</p>
    </div>
    <div className="callout callout-success">
      <p>To see it in action, check out <Link to={EXAMPLEPAGE}>Timeline page</Link></p>
    </div>
  </div>
)

const TabContent2 = () => (
  <div className="container-fluid container-mw-md">
    <div className="callout callout-warning">
      <p>You can change container max-width with <code>.container-mw-</code> utility class</p>
    </div>
  </div>
)

const TabContent3 = () => (
  <div className="container-fluid"><div className="article-title-style text-secondary">Blank 3</div></div>
)

const Page = () => {
  return(
    <section className="page-with-tabs">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <div className="page-title">
            <h1>Page Title</h1>
          </div>
        </div>

        <div key="2">
          <Tabs className="page-tabs" defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1"><TabContent1 /></TabPane>
            <TabPane tab="Tab 2" key="2"><TabContent2 /></TabPane>
            <TabPane tab="Tab 3" key="3"><TabContent3 /></TabPane>
          </Tabs>
        </div>
      </QueueAnim>
    </section>
  );
}

export default Page;
