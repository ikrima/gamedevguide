import React from 'react';
import { Route } from 'react-router-dom';

import BlogCardsGrid from './routes/blog-cards-grid/';
import BlogCardsList from './routes/blog-cards-list/';
import Cards from './routes/cards/';
import FormCards from './routes/form-cards/';
import IconCards from './routes/icon-cards/';
import ImageCards from './routes/image-cards/';
import NumberCards from './routes/number-cards/';
import PortfolioCards from './routes/portfolio-cards/';
import ProductCardsGrid from './routes/product-cards-grid/';
import ProductCardsList from './routes/product-cards-list/';
import ProfileCards from './routes/profile-cards/';

const CardComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/blog-cards-grid`} component={BlogCardsGrid}/>
    <Route path={`${match.url}/blog-cards-list`} component={BlogCardsList}/>
    <Route path={`${match.url}/cards`} component={Cards}/>
    <Route path={`${match.url}/form-cards`} component={FormCards}/>
    <Route path={`${match.url}/icon-cards`} component={IconCards}/>
    <Route path={`${match.url}/image-cards`} component={ImageCards}/>
    <Route path={`${match.url}/number-cards`} component={NumberCards}/>
    <Route path={`${match.url}/portfolio-cards`} component={PortfolioCards}/>
    <Route path={`${match.url}/product-cards-grid`} component={ProductCardsGrid}/>
    <Route path={`${match.url}/product-cards-list`} component={ProductCardsList}/>
    <Route path={`${match.url}/profile-cards`} component={ProfileCards}/>
  </div>
)

export default CardComponents;
