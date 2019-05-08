import React from 'react';
import { Route } from 'react-router-dom';

import Avatar from './routes/avatar/';
import BackTop from './routes/back-top/';
import Badge from './routes/badge/';
import CallToAction from './routes/call-to-action/';
import Callout from './routes/callout/';
import Carousel from './routes/carousel/';
import Popover from './routes/popover/';
import Ribbon from './routes/ribbon/';
import Tag from './routes/tag/';
import Tooltip from './routes/tooltip/';
import Tree from './routes/tree/';

const MoreComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/avatar`} component={Avatar}/>
    <Route path={`${match.url}/back-top`} component={BackTop}/>
    <Route path={`${match.url}/badge`} component={Badge}/>
    <Route path={`${match.url}/call-to-action`} component={CallToAction}/>
    <Route path={`${match.url}/callout`} component={Callout}/>
    <Route path={`${match.url}/carousel`} component={Carousel}/>
    <Route path={`${match.url}/popover`} component={Popover}/>
    <Route path={`${match.url}/ribbon`} component={Ribbon}/>
    <Route path={`${match.url}/tag`} component={Tag}/>
    <Route path={`${match.url}/tooltip`} component={Tooltip}/>
    <Route path={`${match.url}/tree`} component={Tree}/>
  </div>
)

export default MoreComponents;
