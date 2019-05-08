import React from 'react';
import { Button } from 'antd';

const Section = () => (
  <article className="article">
    <div className="container-fluid container-mw-xxl">
      <h2 className="article-title">Boxed</h2>
    </div>

    <div className="container">
      <div className="box box-default bg-transparent">
        <div className="box-body py-4">

          <div className="row">
            <div className="col-lg-8 mx-auto">

              <div className="cta cta-inline">
                <div className="cta-lead">Download it now and get up and running in minutes</div>
                <div className="cta-btn">
                  <Button type="primary" className="btn-cta">Let's start</Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="divider my-4"></div>

    <div className="container">
      <div className="box box-default">
        <div className="box-body py-4">

          <div className="row">
            <div className="col-lg-8 mx-auto">

              <div className="cta cta-inline">
                <div className="cta-lead">Download it now and get up and running in minutes</div>
                <div className="cta-btn">
                  <Button type="primary" className="btn-cta">Let's start</Button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

  </article>
)

export default Section;
