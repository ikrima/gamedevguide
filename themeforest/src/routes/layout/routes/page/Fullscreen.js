import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Button, Icon } from 'antd';

const Section1 = () => (
  <div className="callout callout-info">
    <p>First of all, <strong>ALL</strong> in-app pages can become fullscreen pages, vice versa.</p>
    <p>In React, a page is a component, it can be in-app, fullscreen, inside a modal, or nested in another page.</p>
  </div>
)

const Section2 = () => (
  <div className="callout callout-success">
    <p>To see it in action, click <Button><Icon type="setting" /></Button> to open the right Customizer</p>
    <p>Then change layout option to option <Button>4</Button></p>
  </div>
)


const Page = () => {
  return(
    <div className="container-fluid container-mw-md no-breadcrumb chapter">
      <article className="article">
        <h2 className="article-title">Fullscreen Page</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"> <Section1 /> </div>
          <div key="2"> <Section2 /> </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
