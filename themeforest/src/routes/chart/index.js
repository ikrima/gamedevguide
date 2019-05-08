import React from 'react';
import { Route } from 'react-router-dom';

import Bar from './routes/bar/'
import Candlestick from './routes/candlestick/'
import Funnel from './routes/funnel/'
import Gauge from './routes/gauge/'
import Heatmap from './routes/heatmap/'
import Line from './routes/line/'
import PictorialBar from './routes/pictorial-bar/'
import Pie from './routes/pie/'
import Radar from './routes/radar/'
import Scatter from './routes/scatter/'
import Sunburst from './routes/sunburst/'
import ThemeRiver from './routes/theme-river/'


const Chart = ({ match }) => (
  <div>
    <Route path={`${match.url}/bar`} component={Bar}/>
    <Route path={`${match.url}/candlestick`} component={Candlestick}/>
    <Route path={`${match.url}/funnel`} component={Funnel}/>
    <Route path={`${match.url}/gauge`} component={Gauge}/>
    <Route path={`${match.url}/sunburst`} component={Sunburst}/>
    <Route path={`${match.url}/heatmap`} component={Heatmap}/>
    <Route path={`${match.url}/line`} component={Line}/>
    <Route path={`${match.url}/pictorial-bar`} component={PictorialBar}/>
    <Route path={`${match.url}/pie`} component={Pie}/>
    <Route path={`${match.url}/radar`} component={Radar}/>
    <Route path={`${match.url}/scatter`} component={Scatter}/>
    <Route path={`${match.url}/theme-river`} component={ThemeRiver}/>
  </div>
)

export default Chart;
