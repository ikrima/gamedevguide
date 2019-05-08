import React from 'react';
import { Layout, Icon } from 'antd';
import DEMO from 'constants/demoData';
import APPCONFIG from 'constants/appConfig';
const { Footer } = Layout;

const Footer1 = () => (
  <Footer className="app-footer bg-white">
    <div className="footer-inner-v1">
      <span className="footer-copyright">
        <span>© 2018 {APPCONFIG.brand}. All Rights Reserved.</span>
        <a className="list-item" href={DEMO.link}>Privacy</a>
        <a className="list-item" href={DEMO.link}>Terms</a>
      </span>
      <ul className="footer-social-list">
        <li><a href={DEMO.link}><Icon type="google" /></a></li>
        <li><a href={DEMO.link}><Icon type="facebook" /></a></li>
        <li><a href={DEMO.link}><Icon type="twitter" /></a></li>
        <li><a href={DEMO.link}><Icon type="instagram" /></a></li>
      </ul>
    </div>
  </Footer>
)

const Footer2 = () => (
  <Footer className="app-footer bg-white">
    <div className="footer-inner-v2">
      <ul className="list-inline list-inline-split">
        <li className="list-inline-item"><a href={DEMO.link}>About</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Careers</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Help & Support</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Privacy</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Terms</a></li>
      </ul>
      <ul className="footer-social-list">
        <li><a href={DEMO.link}><Icon type="google" /></a></li>
        <li><a href={DEMO.link}><Icon type="facebook" /></a></li>
        <li><a href={DEMO.link}><Icon type="twitter" /></a></li>
        <li><a href={DEMO.link}><Icon type="instagram" /></a></li>
      </ul>
      <div className="footer-copyright">
        <span>© 2018 {APPCONFIG.brand}. All Rights Reserved.</span>
      </div>
    </div>
  </Footer>
)

const Footer3 = () => (
  <Footer className="app-footer bg-white">
    <div className="row footer-megamenu mb-5">
      <div className="col-6 col-lg-3">
        <h6 className="text-uppercase">Company</h6>
        <ul className="list-unstyled">
          <li><a href={DEMO.link}>About</a></li>
          <li><a href={DEMO.link}>Blog</a></li>
          <li><a href={DEMO.link}>Careers</a></li>
          <li><a href={DEMO.link}>Team</a></li>
          <li><a href={DEMO.link}>Press</a></li>
        </ul>
      </div>
      <div className="col-6 col-lg-3">
        <h6 className="text-uppercase">Product</h6>
        <ul className="list-unstyled">
          <li><a href={DEMO.link}>Case Studies</a></li>
          <li><a href={DEMO.link}>Product API</a></li>
          <li><a href={DEMO.link}>Warehouses</a></li>
          <li><a href={DEMO.link}>Pricing</a></li>
          <li><a href={DEMO.link}>Cloud App</a></li>
        </ul>
      </div>
      <div className="col-6 col-lg-3">
        <h6 className="text-uppercase">Developers</h6>
        <ul className="list-unstyled">
          <li><a href={DEMO.link}>API Reference</a></li>
          <li><a href={DEMO.link}>Developer Blog</a></li>
          <li><a href={DEMO.link}>Open Source</a></li>
          <li><a href={DEMO.link}>History</a></li>
          <li><a href={DEMO.link}>Engineering</a></li>
        </ul>
      </div>
      <div className="col-6 col-lg-3">
        <h6 className="text-uppercase">Support</h6>
        <ul className="list-unstyled">
          <li><a href={DEMO.link}>Help Centers</a></li>
          <li><a href={DEMO.link}>Contact</a></li>
          <li><a href={DEMO.link}>Documentation</a></li>
          <li><a href={DEMO.link}>Partner Portal</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-inner-v1">
      <span className="footer-copyright">
        <span>© 2018 {APPCONFIG.brand}. All Rights Reserved.</span>
        <a className="list-item" href={DEMO.link}>Privacy</a>
        <a className="list-item" href={DEMO.link}>Terms</a>
      </span>
      <ul className="footer-social-list">
        <li><a href={DEMO.link}><Icon type="google" /></a></li>
        <li><a href={DEMO.link}><Icon type="facebook" /></a></li>
        <li><a href={DEMO.link}><Icon type="twitter" /></a></li>
        <li><a href={DEMO.link}><Icon type="instagram" /></a></li>
      </ul>
    </div>
  </Footer>
)

const Footer4 = () => (
  <Footer className="app-footer bg-white">
    <div className="footer-row footer-inner-v1">
      <ul className="list-inline list-inline-split">
        <li className="list-inline-item"><a href={DEMO.link}>About</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Careers</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Help & Support</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>API Docs</a></li>
        <li className="list-inline-item"><a href={DEMO.link}>Blog</a></li>
      </ul>
      <span className="footer-copyright">
        <a className="list-item" href={DEMO.link}>Privacy</a>
        <a className="list-item" href={DEMO.link}>Terms</a>
      </span>
    </div>
    <div className="footer-row footer-inner-v1">
      <span className="footer-copyright">
        <span>© 2018 {APPCONFIG.brand}. All Rights Reserved.</span>
      </span>
      <ul className="footer-social-list">
        <li><a href={DEMO.link}><Icon type="google" /></a></li>
        <li><a href={DEMO.link}><Icon type="facebook" /></a></li>
        <li><a href={DEMO.link}><Icon type="twitter" /></a></li>
        <li><a href={DEMO.link}><Icon type="instagram" /></a></li>
      </ul>
    </div>
  </Footer>
)


const Section = () => (
  <article className="article">
    <h2 className="article-title">App Footer</h2>
    <Footer1 />
    <div className="divider my-4"></div>
    <Footer2 />
    <div className="divider my-4"></div>
    <Footer3 />
    <div className="divider my-4"></div>
    <Footer4 />
  </article>
)

export default Section;
