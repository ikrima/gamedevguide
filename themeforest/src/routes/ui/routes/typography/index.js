import React from 'react';
import { Route } from 'react-router-dom';

import Blockquote from './routes/blockquote/';
import Typography from './routes/typography/';

const TypographyComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/blockquote`} component={Blockquote}/>
    <Route path={`${match.url}/typography`} component={Typography}/>
  </div>
)

export default TypographyComponents;
