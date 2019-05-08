import React from 'react';
import { Icon } from 'antd';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Icon Styles and Colors</h2>
    <ul className="list-inline">
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-primary"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--outlined border-primary"><Icon type="laptop" className="bg-primary"/> </div></li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--bordered border-primary"><Icon type="laptop" className="text-primary" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--rounded bg-primary"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain"><Icon type="laptop" className="text-primary" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain icon--sm"><Icon type="laptop" className="text-primary" /></div> </li>
    </ul>
    
    <ul className="list-inline">
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-dark"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--outlined border-dark"><Icon type="laptop" className="bg-dark"/> </div></li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--bordered border-dark"><Icon type="laptop" className="text-dark" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--rounded bg-dark"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain"><Icon type="laptop" className="text-dark" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain icon--sm"><Icon type="laptop" className="text-dark" /></div> </li>
    </ul>    
    
    <ul className="list-inline">
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-primary"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-info"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-success"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-warning"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-danger"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-dark"><Icon type="laptop" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-secondary"><Icon type="laptop" /></div> </li>
    </ul>      
    
  </article>
);

export default Section;
