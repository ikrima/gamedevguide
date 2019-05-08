import React from 'react';
import { Icon } from 'antd';
import DEMO from 'constants/demoData';

const positions = [
  {
    title: 'Product Manager',
    location: 'San Francisco, USA',
    category: 'Product',
    color: 'info'
  }, {
    title: 'Product Designer',
    location: 'San Francisco, USA',
    category: 'Product',
    color: 'info'
  }, {
    title: 'UX Designer',
    location: 'San Francisco, USA',
    category: 'Product',
    color: 'success'
  }, {
    title: 'Front End Engineer',
    location: 'San Francisco, USA',
    category: 'Engineering',
    color: 'primary'
  }, {
    title: 'Back End Engineer',
    location: 'London, UK',
    category: 'Engineering',
    color: 'primary'
  }, {
    title: 'Mobile Engineer',
    location: 'Toronto, CA',
    category: 'Engineering',
    color: 'primary'
  }, {
    title: 'Customer Support',
    location: 'Melbourne, AU',
    category: 'Support',
    color: 'warning'
  }, {
    title: 'Interns',
    location: 'Melbourne, AU',
    category: 'Internship',
    color: 'danger'
  }
]

const Section = () => (
  <div className="container-fluid container-mw-xl">
    <article className="article article-bordered">
      <h2 className="article-title article-title--loose text-center">Open Positions</h2>
      <div className="row">
        {
          positions.map((position, i) => (
            <div key={i.toString()} className="col-xl-4 mb-4">

              <div className="box box-v1 h-100">
                <div className="box-badge"><span className={`badge badge-pill badge-${position.color}`}>{position.category}</span></div>
                <div className="box-header">{position.title}</div>
                <div className="box-body">{position.location}</div>
                <a href={DEMO.link} className="link-cta link-animated-hover link-hover-v1 text-primary">View Position <Icon type="arrow-right" /></a>
              </div>

            </div>
          ))
        }
      </div>
    </article>
  </div>
)

export default Section;
