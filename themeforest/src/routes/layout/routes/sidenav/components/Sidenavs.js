import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TopNavigation from './TopNavigation';
import InlineMenu from './InlineMenu';
import SwitchTheMenuType from './SwitchTheMenuType';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <article className="article">
        <h2 className="article-title">Sidenav Menu</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-4"> <TopNavigation /> </div>
          <div key="2" className="mb-4"> <InlineMenu /> </div>
          <div key="3" className="mb-4"> <SwitchTheMenuType /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;
