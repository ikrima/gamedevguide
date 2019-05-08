import React from 'react';
import { Icon } from 'antd';
import DEMO from 'constants/demoData';
import APPCONFIG from 'constants/appConfig';

const SocialList = () => (
  <ul className="footer-social-list">
    <li><a href={DEMO.link}><Icon type="google" /></a></li>
    <li><a href={DEMO.link}><Icon type="facebook" theme="filled" /></a></li>
    <li><a href={DEMO.link}><Icon type="twitter" /></a></li>
    <li><a href={DEMO.link}><Icon type="instagram" /></a></li>
  </ul>
)

const InlineList = () => (
  <ul className="list-inline footer-link-container list-inline-split">
    <li className="list-inline-item"><a href={DEMO.link}>About</a></li>
    <li className="list-inline-item"><a href={DEMO.link}>Careers</a></li>
    <li className="list-inline-item"><a href={DEMO.link}>Help & Support</a></li>
    <li className="list-inline-item"><a href={DEMO.link}>Privacy</a></li>
    <li className="list-inline-item"><a href={DEMO.link}>Terms</a></li>
  </ul>
)

const Copyright = () => (
  <span className="footer-copyright">
    <span>© 2018 {APPCONFIG.brand}. All Rights Reserved.</span>
    <a className="list-item" href={DEMO.link}>Privacy</a>
    <a className="list-item" href={DEMO.link}>Terms</a>
  </span>
)

const MegaMenu = () => (
  <div className="row footer-megamenu">
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
)



const Section = () => (
  <article className="article">
    <h2 className="article-title">Footer Elements</h2>
    <div className="box box-default">
      <div className="box-body">
        <Copyright />
        <div className="mb-5"></div>
        <SocialList />
        <div className="mb-5"></div>
        <InlineList />
        <div className="mb-5"></div>
        <MegaMenu />
      </div>
    </div>
  </article>
)

export default Section;
