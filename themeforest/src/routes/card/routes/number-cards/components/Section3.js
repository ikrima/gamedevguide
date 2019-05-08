import React from 'react';
import { Icon } from 'antd';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Number Cards <div className="badge badge-pill">v3</div></h2>

    <div className="row text-center">
      <div className="col-xl-4">
        <section className="number-card-v3 mb-4">
          <div className="card-top bg-facebook text-white">
            <Icon type="facebook" theme="filled" className="h1" />
          </div>
          <div className="card-bottom">
            <ul className="text-center">
              <li>
                <p className="card-num">575</p>
                <p className="text-muted">Followers</p>
              </li>
              <li>
                <p className="card-num">23</p>
                <p className="text-muted">Following</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="col-xl-4">
        <section className="number-card-v3 mb-4">
          <div className="card-top bg-twitter text-white">
            <Icon type="twitter" className="h1" />
          </div>
          <div className="card-bottom">
            <ul className="text-center">
              <li>
                <p className="card-num">141k</p>
                <p className="text-muted">Followers</p>
              </li>
              <li>
                <p className="card-num">20</p>
                <p className="text-muted">Following</p>
              </li>
              <li>
                <p className="card-num">223</p>
                <p className="text-muted">Tweets</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="col-xl-4">
        <section className="number-card-v3 mb-4">
          <div className="card-top bg-instagram text-white">
            <Icon type="instagram" className="h1" />
          </div>
          <div className="card-bottom">
            <ul className="text-center">
              <li>
                <p className="card-num">309</p>
                <p className="text-muted">Posts</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>

  </article>
)

export default Section;
