import React from 'react';
import { Route } from 'react-router-dom';

import Color from './routes/color/';
import Divider from './routes/divider/';
import GradientBackground from './routes/gradient-background/';
import Overlay from './routes/overlay/';
import Spacing from './routes/spacing/';

const UtilityComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/color`} component={Color}/>
    <Route path={`${match.url}/divider`} component={Divider}/>
    <Route path={`${match.url}/gradient-background`} component={GradientBackground}/>
    <Route path={`${match.url}/overlay`} component={Overlay}/>
    <Route path={`${match.url}/spacing`} component={Spacing}/>
  </div>
)

export default UtilityComponents;
