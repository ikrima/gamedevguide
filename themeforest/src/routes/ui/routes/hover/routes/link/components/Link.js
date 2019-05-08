import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd';
import DEMO from 'constants/demoData';

const Hover = () => (
  <article className="article">
    <h2 className="article-title">Hover</h2>

    <div className="box box-default mb-4">
      <div className="box-body">
        <div className="d-flex justify-content-around">
          <a href={DEMO.link} className="link-animated-hover link-hover-v1">Link Hover Effect v1</a> <br />
          <a href={DEMO.link} className="link-animated-hover link-hover-v1">Link Hover Effect v1 <Icon type="arrow-right" /></a> <br />
        </div>
      </div>
    </div>
    <div className="box box-default mb-4">
      <div className="box-body">
        <div className="d-flex justify-content-around">
          <a href={DEMO.link} className="link-animated-hover link-hover-v2">Link Hover Effect v2</a> <br />
          <a href={DEMO.link} className="link-animated-hover link-hover-v2">Link Hover Effect v2 <Icon type="arrow-right" /></a> <br />
        </div>
      </div>
    </div>
    <div className="box box-default mb-4">
      <div className="box-body">
        <div className="d-flex justify-content-around">
          <a href={DEMO.link} className="link-animated-hover link-hover-v3">Link Hover Effect v3</a> <br />
          <a href={DEMO.link} className="link-animated-hover link-hover-v3">Link Hover Effect v3 <Icon type="arrow-right" /></a> <br />
        </div>
      </div>
    </div>
    <div className="box box-default mb-4">
      <div className="box-body">
        <div className="d-flex justify-content-around">
          <a href={DEMO.link} className="link-animated-hover link-hover-v4">Link Hover Effect v4</a> <br />
          <a href={DEMO.link} className="link-animated-hover link-hover-v4">Link Hover Effect v4 <Icon type="arrow-right" /></a> <br />
        </div>
      </div>
    </div>
    <div className="box box-default mb-4">
      <div className="box-body">
        <div className="d-flex justify-content-around">
          <a href={DEMO.link} className="link-animated-hover link-hover-v5"><span className="link-hover-span"></span>Link Hover Effect v5</a> <br />
          <a href={DEMO.link} className="link-animated-hover link-hover-v5">Link Hover Effect v5 <Icon type="arrow-right" /></a> <br />
        </div>
      </div>
    </div>
  </article>
);


const Page = () => {
  return (
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><Hover /></div>
      </QueueAnim>
    </div>
  )
}


export default Page;
