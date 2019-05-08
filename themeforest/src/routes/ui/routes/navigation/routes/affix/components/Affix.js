import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Affix } from 'antd';

const Affix1 = () => (
  <Affix offsetTop={120}>
    <div className="box box-v1">
      <div className="box-header">Affix Top</div>
      <p>{`offsetTop={120}`}</p>
    </div>
  </Affix>
);

const Affix2 = () => (
  <Affix offsetBottom={80}>
    <div className="box box-v1">
      <div className="box-header">Affix Bottom</div>
      <p>{`offsetBottom={80}`}</p>
    </div>
  </Affix>
);

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title mb-3">Affix</h2>
        <p className="mb-5">Make an element stick to viewport.</p>

        <Affix1 />
        <div style={{height: '150vh'}}></div>
        <Affix2 />
        <div style={{height: '150vh'}}></div>

        <QueueAnim type="bottom" className="ui-animate">
          <div className="mb-3" key="1">  </div>

          <div className="mb-3" key="2">  </div>
        </QueueAnim>

      </article>

    </div>
  );
}

export default Page;
