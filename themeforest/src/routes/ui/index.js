import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Box from './routes/box/';
import Button from './routes/button/';
import Collapse from './routes/collapse/';
import ColorPalette from './routes/color-palette/';
import Cover from './routes/cover/';
import FeatureCallout from './routes/feature-callout/';
import Jumbotron from './routes/jumbotron/';
import PricingTable from './routes/pricing-table/';
import Sash from './routes/sash/';
import Tabs from './routes/tabs/';
import Testimonials from './routes/testimonials/';


let Hover = loadable({
  loader: () => import('./routes/hover/'),
  loading: LoadingComponent
})

let Icon = loadable({
  loader: () => import('./routes/icon/'),
  loading: LoadingComponent
})

let More = loadable({
  loader: () => import('./routes/more/'),
  loading: LoadingComponent
})

let Navigation = loadable({
  loader: () => import('./routes/navigation/'),
  loading: LoadingComponent
})

let Typography = loadable({
  loader: () => import('./routes/typography/'),
  loading: LoadingComponent
})

let Timeline = loadable({
  loader: () => import('./routes/timeline/'),
  loading: LoadingComponent
})

let Utility = loadable({
  loader: () => import('./routes/utility/'),
  loading: LoadingComponent
})


const UI = ({ match }) => (
  <div>
    <Route path={`${match.url}/box`} component={Box}/>
    <Route path={`${match.url}/button`} component={Button}/>
    <Route path={`${match.url}/collapse`} component={Collapse}/>
    <Route path={`${match.url}/color-palette`} component={ColorPalette}/>
    <Route path={`${match.url}/cover`} component={Cover}/>
    <Route path={`${match.url}/feature-callout`} component={FeatureCallout}/>
    <Route path={`${match.url}/hover`} component={Hover}/>
    <Route path={`${match.url}/icon`} component={Icon}/>
    <Route path={`${match.url}/jumbotron`} component={Jumbotron}/>
    <Route path={`${match.url}/more`} component={More}/>
    <Route path={`${match.url}/navigation`} component={Navigation}/>
    <Route path={`${match.url}/pricing-table`} component={PricingTable}/>
    <Route path={`${match.url}/sash`} component={Sash}/>
    <Route path={`${match.url}/tabs`} component={Tabs}/>
    <Route path={`${match.url}/testimonials`} component={Testimonials}/>
    <Route path={`${match.url}/timeline`} component={Timeline}/>
    <Route path={`${match.url}/typography`} component={Typography}/>
    <Route path={`${match.url}/utility`} component={Utility}/>
  </div>
)

export default UI;
