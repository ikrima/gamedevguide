import React from 'react';
import { Route } from 'react-router-dom';

import Hover from './routes/hover/';
import LinkHover from './routes/link/';
import WithOverlay from './routes/with-overlay/';

const HoverComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/hover`} component={Hover}/>
    <Route path={`${match.url}/link-hover`} component={LinkHover}/>
    <Route path={`${match.url}/with-overlay`} component={WithOverlay}/>
  </div>
)

export default HoverComponents;
