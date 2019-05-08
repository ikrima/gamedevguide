import React from 'react';
import { Route } from 'react-router-dom';

import Invoice from './routes/invoice/'
import Products from './routes/products/'
import ProductsV2 from './routes/products-v2/'


const Shop = ({ match }) => (
  <div>
    <Route path={`${match.url}/invoice`} component={Invoice}/>
    <Route path={`${match.url}/products`} component={Products}/>
    <Route path={`${match.url}/products-v2`} component={ProductsV2}/>
  </div>
)

export default Shop;
