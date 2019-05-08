import React from 'react';
import { Route } from 'react-router-dom';

import Footer from './routes/footer/';
import Grid from './routes/grid/';
import Header from './routes/header/';
import List from './routes/list/';
import Page from './routes/page/Page';
import PageWithTabs from './routes/page/WithTabs';
import PageWithBreadcrumb from './routes/page/WithBreadcrumb';
import PageFullscreen from './routes/page/Fullscreen';
import Sidenav from './routes/sidenav/';

const Layout = ({ match }) => (
  <div>
    <Route path={`${match.url}/footer`} component={Footer}/>
    <Route path={`${match.url}/grid`} component={Grid}/>
    <Route path={`${match.url}/header`} component={Header}/>
    <Route path={`${match.url}/list`} component={List}/>
    <Route path={`${match.url}/page`} component={Page}/>
    <Route path={`${match.url}/page-with-tabs`} component={PageWithTabs}/>
    <Route path={`${match.url}/page-with-breadcrumb`} component={PageWithBreadcrumb}/>
    <Route path={`${match.url}/page-fullscreen`} component={PageFullscreen}/>
    <Route path={`${match.url}/sidenav`} component={Sidenav}/>
  </div>
)

export default Layout;
