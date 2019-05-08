import React from 'react';
import QueueAnim from 'rc-queue-anim';
import BeforeLogin from './BeforeLogin';
import Simple from './Simple';
import WithDropwdown from './WithDropwdown';
import WithTooltip from './WithTooltip';

const HeaderExample1 = () => (
  <div className="mb-6">
    <h4 className="article-title-v2">Before Login <span className="triangle triangle-down"></span></h4>
    <BeforeLogin />
  </div>
)

const HeaderExample2 = () => (
  <div className="mb-6">
    <h4 className="article-title-v2">Simple <span className="triangle triangle-down"></span></h4>
    <Simple />
  </div>
)

const HeaderExample3 = () => (
  <div className="mb-6">
    <h4 className="article-title-v2">With Dropdown Menu <span className="triangle triangle-down"></span></h4>
    <WithDropwdown />
  </div>
)

const HeaderExample4 = () => (
  <div className="mb-6">
    <h4 className="article-title-v2">With Tooltip or Popover <span className="triangle triangle-down"></span></h4>
    <WithTooltip />
  </div>
)

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xxl chapter">
      <article className="article">
        <h2 className="article-title">App Header</h2>

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"> <HeaderExample1 /> </div>
          <div key="2"> <HeaderExample2 /> </div>
          <div key="3"> <HeaderExample3 /> </div>
          <div key="4"> <HeaderExample4 /> </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
