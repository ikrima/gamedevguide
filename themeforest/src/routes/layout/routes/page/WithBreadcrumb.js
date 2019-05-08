import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Button, Icon } from 'antd';
import Breadcrumb from 'components/Layout/Breadcrumb';

const Section1 = () => (
  <article className="article">
    <h2 className="article-title">Page with Breadcrumb</h2>
    <div className="callout callout-info">
      <p>Breadcrumb are generated dynamically with <code>React-router</code> and <code>Breadcrumb</code> component</p>
    </div>
    <div className="callout callout-success">
      <p>To see it in action, click <Button><Icon type="setting" /></Button> to open the right Customizer</p>
      <p>Then change layout option to option <Button>2</Button> and you'll see the dynamic Breadcrumb in the top left corner</p>
    </div>
  </article>
)

const Page = () => {
  return(
    <div className="container-fluid container-mw-md no-breadcrumb chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Breadcrumb /> </div>
        <div key="2"> <Section1 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
