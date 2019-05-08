import React from 'react';
import QueueAnim from 'rc-queue-anim';




const Section1 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Hover v1</div>
    <div className="box-body">
      <div className="row">
        <div className="col-md-6">
          <img src="assets/images-demo/assets/600_400-1.jpg" alt="cover" className="rounded mw-100 hover-v1" />
        </div>
        <div className="col-md-6">
          <img src="assets/images-demo/assets/600_400-2.jpg" alt="cover" className="rounded mw-100 hover-v1" />
        </div>
      </div>
    </div>
  </div>
)

const Section2 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Hover v2</div>
    <div className="box-body">
      <div className="row">
        <div className="col-md-6">
          <img src="assets/images-demo/assets/600_400-3.jpg" alt="cover" className="rounded mw-100 hover-v2" />
        </div>
        <div className="col-md-6">
          <img src="assets/images-demo/assets/600_400-4.jpg" alt="cover" className="rounded mw-100 hover-v2" />
        </div>
      </div>
    </div>
  </div>
)

const Page = () => {
  return (
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Basic Hover</h2>
        <div className="callout callout-info">
          <p>Basic hover style can be used on images, buttons, cards</p>
        </div>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"> <Section1 /> </div>
          <div key="2"> <Section2 /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}


export default Page;
