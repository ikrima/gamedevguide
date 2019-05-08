import React from 'react';
import { Icon } from 'antd';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Number Cards <div className="badge badge-pill">v2</div></h2>

    <div className="row text-center">
      <div className="col-xl-3 col-sm-6">
        <div className="number-card-v2 mb-3">
          <span className="icon-btn icon-btn-round icon-btn-lg text-white bg-success">
            <Icon type="line-chart" />
          </span>
          <div className="box-info">
            <p className="box-num">16 <span className="size-h4">%</span></p>
            <p className="text-muted">Growth</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="number-card-v2 mb-3">
          <span className="icon-btn icon-btn-round icon-btn-lg text-white bg-info">
            <Icon type="team" />
          </span>
          <div className="box-info">
            <p className="box-num">22 <span className="size-h4">%</span></p>
            <p className="text-muted">Users</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="number-card-v2 mb-3">
          <span className="icon-btn icon-btn-round icon-btn-lg text-white bg-warning">
            <Icon type="credit-card" />
          </span>
          <div className="box-info">
            <p className="box-num">51 <span className="size-h4">k</span></p>
            <p className="text-muted">Profit</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="number-card-v2 mb-3">
          <span className="icon-btn icon-btn-round icon-btn-lg text-white bg-primary">
            <Icon type="shopping-cart" />
          </span>
          <div className="box-info">
            <p className="box-num">21 <span className="size-h4">k</span></p>
            <p className="text-muted">Sales</p>
          </div>
        </div>
      </div>
    </div>

  </article>
)

export default Section;
