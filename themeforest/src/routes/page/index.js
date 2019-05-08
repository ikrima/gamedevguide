import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import About from './routes/about/';
import AboutHistory from './routes/about-history/';
import Blog from './routes/blog/';
import Careers from './routes/careers/';
import Contact from './routes/contact/';
import Faqs from './routes/faqs/';
import Services from './routes/services/';
import ServicesV2 from './routes/services-v2/';
import Terms from './routes/terms/';

let Loading = loadable({
  loader: () => import('./routes/loading/'),
  loading: LoadingComponent
})

const Page = ({ match }) => (
  <div>
    <Route path={`${match.url}/about`} component={About}/>
    <Route path={`${match.url}/about-history`} component={AboutHistory}/>
    <Route path={`${match.url}/blog`} component={Blog}/>
    <Route path={`${match.url}/careers`} component={Careers}/>
    <Route path={`${match.url}/contact`} component={Contact}/>
    <Route path={`${match.url}/faqs`} component={Faqs}/>
    <Route path={`${match.url}/services`} component={Services}/>
    <Route path={`${match.url}/services-v2`} component={ServicesV2}/>
    <Route path={`${match.url}/terms`} component={Terms}/>
    <Route path={`${match.url}/loading`} component={Loading}/>
  </div>
)

export default Page;
