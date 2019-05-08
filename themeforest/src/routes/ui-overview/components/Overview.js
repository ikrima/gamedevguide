import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import COMPONENTS from 'constants/uiComponents';

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}


let sortedComponents = COMPONENTS.sort(compare).filter(el => !el.children);
// console.log(sortedComponents);

const Cover = () => (
  <section className="cover">
    <div className="cover-bg-img d-none d-md-block" style={{backgroundImage: 'url(assets/images-demo/covers/leone-venter-559377-cut.jpg)'}}></div>
    <div className="container-fluid container-mw-xl">
      <div className="row">
        <div className="col-md-6 col-lg-5">
          <h1><span className="bold">100+</span> Components</h1>
          <p className="lead">Ant admin is a multi-purpose template which comes with a huge collection of components out of box.</p>
          <div className="divider divider-short border-primary my-4"></div>
          <p>All components are well designed & easy to use.</p>
        </div>
      </div>
    </div>
  </section>
);

const Overview = () => {
  return(
    <div>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Cover /> </div>
      </QueueAnim>

      <section className="container-fluid container-mw-xl no-breadcrumb">
        <QueueAnim type="bottom" className="ui-animate flex-items-container">
          {
            sortedComponents.map((el, i) => {
              if (i < 6) {
                return (
                  <div key={( i + 1).toString()} className="flex-item box box-v1 mb-4">
                    <div className="box-header">{el.name}</div>
                    <div>{el.desc}</div>
                    <Link to={el.path} className="link-cta link-animated-hover link-hover-v1 text-primary">Explore <Icon type="arrow-right" /></Link>
                  </div>
                )
              } else {
                return (null);
              }
            })
          }
          <div key="7" className="flex-items-container">
          {
            sortedComponents.map((el, i) => {
              if (i >= 6) {
                return (
                  <div key={( i + 1).toString()} className="flex-item box box-v1 mb-4">
                    <div className="box-header">{el.name}</div>
                    <div>{el.desc}</div>
                    <Link to={el.path} className="link-cta link-animated-hover link-hover-v1 text-primary">Explore <Icon type="arrow-right" /></Link>
                  </div>
                )
              } else {
                return (null);
              }
            })
          }
          </div>
        </QueueAnim>
      </section>
    </div>
  )
}

export default Overview;
