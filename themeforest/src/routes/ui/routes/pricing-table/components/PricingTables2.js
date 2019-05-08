import React from 'react';
import { Icon, Button } from 'antd'; 

const PricingTable1 = () => (
  <article className="pricing-table-v1">
      <header> <h2>Free</h2> </header>
      <p className="pricing-price"> $0.00<span>/month</span> </p>
      <p className="pricing-price-detail">Aspernatur omnis nemo <br /> omnis porro cupiditate quaera!</p>
      <div className="pricing-plan-details">
          <ul>
              <li><Icon type="check" /> No Support</li>
              <li><Icon type="check" /> 1 Website</li>
              <li><Icon type="check" /> 10GB Disk Space</li>
              <li><Icon type="check" /> 3 Database</li>
              <li><Icon type="check" /> 1 Email Address</li>
          </ul>                            
      </div>
      <footer><Button className="btn-cta w-100">Get it now</Button></footer>
  </article>
)

const PricingTable2 = () => (
  <article className="pricing-table-v1 pricing-table-highlight">
      <header> <h2>Basic <span>Most Popular</span></h2> </header>
      <p className="pricing-price"> $29.00<span>/month</span> </p>
      <p className="pricing-price-detail">Aspernatur omnis nemo <br /> omnis porro cupiditate quaera!</p>
      <div className="pricing-plan-details">
          <ul>
              <li><Icon type="check" /> 24/7 Support</li>
              <li><Icon type="check" /> 1 Website</li>
              <li><Icon type="check" /> 100GB Disk Space</li>
              <li><Icon type="check" /> 10 Database</li>
              <li><Icon type="check" /> 10 Email Address</li>
          </ul>                            
      </div>
      <footer><Button className="btn-cta w-100">Get it now</Button></footer>
  </article>
)

const PricingTable3 = () => (
  <article className="pricing-table-v1">
      <header> <h2>Standard</h2> </header>
      <p className="pricing-price"> $39.00<span>/month</span> </p>
      <p className="pricing-price-detail">Aspernatur omnis nemo <br /> omnis porro cupiditate quaera!</p>
      <div className="pricing-plan-details">
          <ul>
              <li><Icon type="check" /> 24/7 Support</li>
              <li><Icon type="check" /> Unlimited Website</li>
              <li><Icon type="check" /> 500GB Disk Space</li>
              <li><Icon type="check" /> 25 Database</li>
              <li><Icon type="check" /> 50 Email Address</li>
          </ul>                            
      </div>
      <footer><Button className="btn-cta w-100">Get it now</Button></footer>
  </article>
)


const PricingTable4 = () => (
  <article className="pricing-table-v1">
      <header> <h2>Ultimate</h2> </header>
      <p className="pricing-price"> $99.00<span>/month</span> </p>
      <p className="pricing-price-detail">Aspernatur omnis nemo <br /> omnis porro cupiditate quaera!</p>
      <div className="pricing-plan-details">
          <ul>
              <li><Icon type="check" /> 24/7 Support</li>
              <li><Icon type="check" /> Unlimited Website</li>
              <li><Icon type="check" /> Unlimited Disk Space</li>
              <li><Icon type="check" /> Unlimited Database</li>
              <li><Icon type="check" /> 100 Email Address</li>
          </ul>                            
      </div>
      <footer><Button className="btn-cta w-100">Get it now</Button></footer>
  </article>
)

const Section = () => {
  return (
  <article className="article">
    <h2 className="article-title">Clean</h2>
    <div className="row">
      <div className="col-md-3 col-xsm-6"> <PricingTable1 /> </div>
      <div className="col-md-3 col-xsm-6"> <PricingTable2 /> </div>
      <div className="col-md-3 col-xsm-6"> <PricingTable3 /> </div>
      <div className="col-md-3 col-xsm-6"> <PricingTable4 /> </div>
    </div>
  </article>
  )
}

export default Section;
