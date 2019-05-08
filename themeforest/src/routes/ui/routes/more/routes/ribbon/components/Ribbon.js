import React from 'react';
import DEMO from 'constants/demoData';
import QueueAnim from 'rc-queue-anim';

const ribbons = [
  {
    type: ''
  }, {
    type: 'ribbon-primary'
  }, {
    type: 'ribbon-success'
  }, {
    type: 'ribbon-info'
  }, {
    type: 'ribbon-warning'
  }, {
    type: 'ribbon-danger'
  }
]


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xxl chapter">
      <article className="article">
        <h2 className="article-title">Ribbon</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="flex-items-container">
            {
              ribbons.map((ribbon, i) =>
                <div key={( i + 1).toString()} className={`flex-item box box-default mb-3 ribbon-container ${ribbon.type}`}>
                  <div className="ribbon-wrapper">
                    <div className="ribbon"> 30% Off </div>
                  </div>
                  <div className="box-header">Ribbon</div>
                  <div className="box-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti rerum reprehenderit ipsam natus saepe. Recusandae, itaque nulla in illum dolorum ea eveniet quaerat ipsa placeat magni commodi obcaecati mollitia necessitatibus?</p>
                  </div>
                </div>
              )
            }
          </div>
          <div key="2" className="flex-items-container">
            {
              ribbons.map((ribbon, i) =>
                <div key={( i + 7).toString()} href={DEMO.link} className={`flex-item item-card mb-3 ribbon-container ${ribbon.type}`}>
                  <div className="ribbon-wrapper">
                    <div className="ribbon"> 30% Off </div>
                  </div>
                  <a href={DEMO.link} className="card__image">
                    <img alt="product" src="assets/images-demo/products/watch-black.png" />
                  </a>
                  <div className="card__body card-white">
                    <div className="card__title">
                      <span>Accessories</span>
                      <a href={DEMO.link}>Black Watch</a>
                    </div>
                    <div className="card__price">
                      <span className="type--strikethrough">$699.99</span>
                      <span>$649.99</span>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
