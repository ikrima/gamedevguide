import React from 'react';
import { Icon } from 'antd';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Number Cards <div className="badge badge-pill">v1</div></h2>

    <div className="row">
      <div className="col-xl-3">
        <div className="number-card-v1 mb-4">
          <div className="card-top">
            <span>35<span className="h5">%</span></span>
          </div>
          <div className="card-info">
            <span>Profit</span>
          </div>
          <div className="card-bottom">
            <Icon type="line-chart" className="text-info" />
          </div>
        </div>
      </div>

      <div className="col-xl-3">
        <div className="number-card-v1 mb-4">
          <div className="card-top">
            <Icon type="usergroup-add" className="text-primary" />
          </div>
          <div className="card-info">
            <span>New Users</span>
          </div>
          <div className="card-bottom">
            <span>42<span className="h5">%</span></span>
          </div>
        </div>
      </div>

      <div className="col-xl-3">
        <div className="number-card-v1 mb-4">
          <div className="card-top">
            <span>25<span className="h5">k</span></span>
          </div>
          <div className="card-info">
            <span>Sales</span>
          </div>
          <div className="card-bottom">
            <Icon type="shopping-cart" className="text-success" />
          </div>
        </div>
      </div>

      <div className="col-xl-3">
        <div className="number-card-v1 mb-4">
          <div className="card-top">
            <Icon type="rocket" className="text-warning" />
          </div>
          <div className="card-info">
            <span>Growth</span>
          </div>
          <div className="card-bottom">
            <span>55<span className="h5">%</span></span>
          </div>
        </div>
      </div>
    </div>

  </article>
)

export default Section;
