import React from 'react';
import { Icon } from 'antd';
import DEMO from 'constants/demoData';

const cards = DEMO.iconCards;

const ImageIconCards = () => (
  <div className="row mb-5">

    <div className="col-xl-4 mb-4">
      <div className="icon-card-v1 icon-card--center">
        <div className="icon-card__icon icon--circle">
          <img src="assets/images-demo/image-icons/imac.png" alt="icon" />
        </div>
        <h4 className="icon-card__header">Responsive Design</h4>
        <div className="icon-card__content"> Responsive design allows your website to fit on any screen and still be readable and usable. </div>
      </div>
    </div>
    <div className="col-xl-4 mb-4">
      <div className="icon-card-v1 icon-card--center">
        <div className="icon-card__icon icon--circle">
          <img src="assets/images-demo/image-icons/settings.png" alt="icon" />
        </div>
        <h4 className="icon-card__header">Easy to Customize</h4>
        <div className="icon-card__content"> Customizer make it easy. Build your own style simply by changing a few settings in the customizer. </div>
      </div>
    </div>
    <div className="col-xl-4 mb-4">
      <div className="icon-card-v1 icon-card--center">
        <div className="icon-card__icon icon--circle">
          <img src="assets/images-demo/image-icons/package.png" alt="icon" />
        </div>
        <h4 className="icon-card__header">Clean code</h4>
        <div className="icon-card__content"> Clean code with popular Style Guide recommend by official team. </div>
      </div>
    </div>

  </div>
)

const Cards1 = () => (
  <div className="row mb-5">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="icon-card-v1 icon-card--center">
            <div className={`icon-card__icon icon--circle bg-${card.color}`}><Icon type={card.icon} /></div>
            <h4 className="icon-card__header">{card.title}</h4>
            <div className="icon-card__content">{card.content}</div>
          </div>
        </div>
      ))
    }
  </div>
)

const Cards2 = () => (
  <div className="row mb-5">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="icon-card-v1 icon-card--center">
            <div className={`icon-card__icon icon--outlined border-${card.color}`}><Icon type={card.icon} className={`bg-${card.color}`}/> </div>
            <h4 className="icon-card__header">{card.title}</h4>
            <div className="icon-card__content">{card.content}</div>
          </div>
        </div>
      ))
    }
  </div>
)

const Cards3 = () => (
  <div className="row mb-5">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="icon-card-v1 icon-card--center">
            <div className={`icon-card__icon icon--bordered border-${card.color}`}><Icon type={card.icon} className={`text-${card.color}`}/> </div>
            <h4 className="icon-card__header">{card.title}</h4>
            <div className="icon-card__content">{card.content}</div>
          </div>
        </div>
      ))
    }
  </div>
)

const Cards4 = () => (
  <div className="row mb-5">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="icon-card-v1 icon-card--center">
            <div className={`icon-card__icon icon--rounded bg-${card.color}`}><Icon type={card.icon} /></div>
            <h4 className="icon-card__header">{card.title}</h4>
            <div className="icon-card__content">{card.content}</div>
          </div>
        </div>
      ))
    }
  </div>
)

const Cards5 = () => (
  <div className="row mb-5">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="icon-card-v1 icon-card--center">
            <div className="icon--plain"><Icon type={card.icon} className={`text-${card.color}`} /></div>
            <h4 className="icon-card__header">{card.title}</h4>
            <div className="icon-card__content">{card.content}</div>
          </div>
        </div>
      ))
    }
  </div>
)


const Section = () => (
  <article className="article">
    <h2 className="article-title">Centered</h2>
    <ImageIconCards />
    <Cards1 />
    <Cards2 />
    <Cards3 />
    <Cards4 />
    <Cards5 />
  </article>
);

export default Section;
