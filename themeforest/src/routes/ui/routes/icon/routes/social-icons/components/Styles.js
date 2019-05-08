import React from 'react';
import DEMO from 'constants/demoData';
import { Icon } from 'antd'; 

const Section = () => (
  <div className="box box-default">
    <div className="box-header">Styles</div>
    <div className="box-body text-center">
      <p>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-twitter"><Icon type="twitter" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-facebook"><Icon type="facebook" theme="filled" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-google-plus"><Icon type="google" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-instagram"><Icon type="instagram" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-rss"><Icon type="medium" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-wechat"><Icon type="wechat" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-linkedin"><Icon type="linkedin" /></a>
      </p>
      <p>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-youtube"><Icon type="youtube" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-skype"><Icon type="skype" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-dribbble"><Icon type="dribbble" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-behance"><Icon type="behance" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-social"><Icon type="slack" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-sm btn-github"><Icon type="github" /></a>
      </p> 
      <div className="divider my-4"></div>
      <p>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-twitter"><Icon type="twitter" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-facebook"><Icon type="facebook" theme="filled" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-google-plus"><Icon type="google" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-instagram"><Icon type="instagram" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-rss"><Icon type="medium" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-wechat"><Icon type="wechat" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-linkedin"><Icon type="linkedin" /></a>
      </p>
      <p>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-youtube"><Icon type="youtube" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-skype"><Icon type="skype" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-dribbble"><Icon type="dribbble" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-behance"><Icon type="behance" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-social"><Icon type="slack" /></a>
        <a href={DEMO.link} className="icon-btn mx-1 icon-btn-round icon-btn-sm btn-github"><Icon type="github" /></a>
      </p>     
    </div>
  </div> 
)

export default Section;
