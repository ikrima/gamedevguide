import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';

const products = DEMO.products;

class Products extends React.Component {
  render() {
    return (
      <article className="article">
        <h2 className="article-title">Products (Grid)</h2>
        <QueueAnim type="bottom" className="ui-animate flex-items-container">
          {
            products.map((product, i) => (
              <div key={i.toString()} className="flex-item mb-4">
                <div className="item-card">
                  <a href={DEMO.link} className="card__image">
                    <img alt="product" src={product.img} />
                  </a>
                  <div className="card__body card-white">
                    <div className="card__title">
                      <span>Accessories</span>
                      <a href={product.link}>{product.name}</a>
                    </div>
                    <div className="card__price">
                      <span className="type--strikethrough">$699.99</span>
                      <span>$649.99</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          </QueueAnim>
      </article>
    );
  }
}

export default Products;
