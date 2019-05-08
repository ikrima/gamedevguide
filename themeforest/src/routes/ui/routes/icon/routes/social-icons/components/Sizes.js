import React from 'react';
import DEMO from 'constants/demoData';
import { Icon } from 'antd'; 

const Section = () => (
  <div className="box box-default">
    <div className="box-header">Sizes</div>
    <div className="box-body text-center">
      <p>
        <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-sm btn-twitter"><Icon type="twitter" /></a>
        <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 btn-facebook"><Icon type="facebook" theme="filled" /></a>
        <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-md btn-google-plus"><Icon type="google" /></a>
        <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-lg btn-instagram"><Icon type="instagram" /></a>
        <a href={DEMO.link} className="icon-btn icon-btn-round mx-1 icon-btn-xl btn-youtube"><Icon type="youtube" /></a>
      </p>  
    </div>
  </div> 
)

export default Section;
