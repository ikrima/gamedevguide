import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import CustomizedContent from './CustomizedContent';
import LoadingCard from './LoadingCard';
import NoBorder from './NoBorder';
import SimpleCard from './SimpleCard';


const Page = () => {
  return(
    <section className="container-fluid container-mw-xxl chapter page-icons">

      <article className="article">
        <h2 className="article-title">Card</h2>

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <div className="box box-default">
              <div className="box-body">
                <div className="row">
                  <div className="col-xl-4"><Basic /></div>
                  <div className="col-xl-4"><NoBorder /></div>
                  <div className="col-xl-4"><SimpleCard /></div>
                </div>
              </div>
            </div>
          </div>
          <div key="2" className="mb-3">
            <div className="box box-default">
              <div className="box-body">
                <div className="row">
                  <div className="col-xl-6"><CustomizedContent /></div>
                  <div className="col-xl-6"><LoadingCard /></div>
                </div>
              </div>
            </div>
          </div>
        </QueueAnim>

      </article>

    </section>
  )
}

export default Page;
