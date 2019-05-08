import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Styles from './Styles';
import Sizes from './Sizes';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Social Icons</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3"> <Styles /> </div>
          <div key="2" className="mb-3"> <Sizes /> </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
