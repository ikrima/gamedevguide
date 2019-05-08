import React from 'react';
import { Icon } from 'antd';
import DEMO from 'constants/demoData';

const cards = DEMO.iconCards;

const ImageIconCards1 = () => (
  <div className="row mb-4">

    <div className="col-xl-4 mb-4">
      <div className="box box-default h-100">
        <div className="box-body">
          <div className="media icon-card-v1">
            <div className="icon-card__icon icon--circle mr-3">
              <img src="assets/images-demo/image-icons/imac.png" alt="icon" />
            </div>
            <div className="media-body">
              <h4 className="icon-card__header">Responsive Design</h4>
              <div className="icon-card__content"> Responsive design allows your website to fit on any screen and still be readable and usable. </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4 mb-4">
      <div className="box box-default h-100">
        <div className="box-body">
          <div className="media icon-card-v1">
            <div className="icon-card__icon icon--circle mr-3">
              <img src="assets/images-demo/image-icons/settings.png" alt="icon" />
            </div>
            <div className="media-body">
              <h4 className="icon-card__header">Easy to Customize</h4>
              <div className="icon-card__content"> Customizer make it easy. Build your own style simply by changing a few settings in the customizer. </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4 mb-4">
      <div className="box box-default h-100">
        <div className="box-body">
          <div className="media icon-card-v1">
            <div className="icon-card__icon icon--circle mr-3">
              <img src="assets/images-demo/image-icons/package.png" alt="icon" />
            </div>
            <div className="media-body">
              <h4 className="icon-card__header">Clean code</h4>
              <div className="icon-card__content"> Clean code with popular Style Guide recommend by official team. </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
)

const ImageIconCards2 = () => (
  <div className="row mb-4">

    <div className="col-xl-4 mb-4">
      <div className="box box-default h-100 bg-transparent">
        <div className="box-body">
          <div className="media icon-card-v1">
            <div className="icon-card__icon icon--circle mr-3">
              <img src="assets/images-demo/image-icons/imac.png" alt="icon" />
            </div>
            <div className="media-body">
              <h4 className="icon-card__header">Responsive Design</h4>
              <div className="icon-card__content"> Responsive design allows your website to fit on any screen and still be readable and usable. </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4 mb-4">
      <div className="box box-default h-100 bg-transparent">
        <div className="box-body">
          <div className="media icon-card-v1">
            <div className="icon-card__icon icon--circle mr-3">
              <img src="assets/images-demo/image-icons/settings.png" alt="icon" />
            </div>
            <div className="media-body">
              <h4 className="icon-card__header">Easy to Customize</h4>
              <div className="icon-card__content"> Customizer make it easy. Build your own style simply by changing a few settings in the customizer. </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4 mb-4">
      <div className="box box-default h-100 bg-transparent">
        <div className="box-body">
          <div className="media icon-card-v1">
            <div className="icon-card__icon icon--circle mr-3">
              <img src="assets/images-demo/image-icons/package.png" alt="icon" />
            </div>
            <div className="media-body">
              <h4 className="icon-card__header">Clean code</h4>
              <div className="icon-card__content"> Clean code with popular Style Guide recommend by official team. </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
)

const Cards11 = () => (
  <div className="row mb-4">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="box box-default h-100">
            <div className="box-body">
              <div className="media icon-card-v1">
                <div className={`icon-card__icon icon--circle mr-3 bg-${card.color}`}><Icon type={card.icon} /></div>
                <div className="media-body">
                  <h4 className="icon-card__header">{card.title}</h4>
                  <div className="icon-card__content">{card.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
)

const Cards12 = () => (
  <div className="row mb-4">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="box box-default h-100 bg-transparent">
            <div className="box-body">
              <div className="media icon-card-v1">
                <div className={`icon-card__icon icon--circle mr-3 bg-${card.color}`}><Icon type={card.icon} /></div>
                <div className="media-body">
                  <h4 className="icon-card__header">{card.title}</h4>
                  <div className="icon-card__content">{card.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
)

const CardsCentered11 = () => (
  <div className="row mb-5">
    {
      cards.map((card, i) => (
        <div className="col-xl-4 mb-4" key={i.toString()}>
          <div className="box box-default h-100">
            <div className="box-body">
              <div className="icon-card-v1 icon-card--center">
                <div className={`icon-card__icon icon--circle bg-${card.color}`}><Icon type={card.icon} /></div>
                <h4 className="icon-card__header">{card.title}</h4>
                <div className="icon-card__content">{card.content}</div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
)

const Section = () => (
  <article className="article">
    <h2 className="article-title">Boxed</h2>

    <ImageIconCards1 />
    <ImageIconCards2 />
    <Cards11 />
    <Cards12 />
    <CardsCentered11 />
  </article>
);

export default Section;
