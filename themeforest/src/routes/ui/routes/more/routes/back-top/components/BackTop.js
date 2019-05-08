import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { BackTop } from 'antd';

const Callout = () => (
  <div>
    <div className="callout callout-danger">
      <p>Because the BackTop target in the demo is <code>window</code>, to make it work, please open the right cusotmizer and make sure <code>Fix Header</code> and <code>Fix Sidenav</code> has been turned off.</p>
    </div>
    <div className="callout callout-info">
      <p>The default BackTop scrollable area target is <code>window</code>. You can set custom target using <code>target</code> property in your app</p>
    </div>
  </div>
);

const BackTop1 = () => (
  <div className="box box-v1">
    <div className="box-header">Default style</div>
    <p>Scroll down to see the bottom-right <span className="text-secondary">GRAY</span> button.</p>
  </div>
);

const BackTop2 = () => (
  <div className="box box-v1">
    <div className="box-header">Custom style</div>
    <p>Scroll down to see the bottom-right <span className="text-primary">BLUE</span> button.</p>
  </div>
);

class Page extends React.Component {

  render() {

    return(
      <div className="container-fluid no-breadcrumb container-mw-md chapter">
        <BackTop />
        <BackTop className="ant-back-top-v1"> <div className="ant-back-top-inner">UP</div> </BackTop>

        <article className="article">
          <h2 className="article-title">BackTop</h2>
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1" className="mb-4"> <Callout /> </div>
            <div key="2" className="mb-4"> <BackTop1 /> </div>
            <div key="3" className="mb-4"> <BackTop2 /> </div>
          </QueueAnim>
          <div style={{height: '200vh'}}></div>
        </article>
      </div>
    );
  }
}

export default Page;
