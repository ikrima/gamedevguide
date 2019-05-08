import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;

let AsyncCalendar = loadable({
  loader: () => import('routes/calendar/'),
  loading: LoadingComponent
})
let AsyncCard = loadable({
  loader: () => import('routes/card/'),
  loading: LoadingComponent
})
let AsyncChart = loadable({
  loader: () => import('routes/chart/'),
  loading: LoadingComponent
})
let AsyncDashboard = loadable({
  loader: () => import('routes/dashboard/'),
  loading: LoadingComponent
})
let AsyncECommerce = loadable({
  loader: () => import('routes/ecommerce/'),
  loading: LoadingComponent
})
let AsyncFeedback = loadable({
  loader: () => import('routes/feedback/'),
  loading: LoadingComponent
})
let AsyncForm = loadable({
  loader: () => import('routes/form/'),
  loading: LoadingComponent
})
let AsyncLayout = loadable({
  loader: () => import('routes/layout/'),
  loading: LoadingComponent
})
let AsyncPage = loadable({
  loader: () => import('routes/page/'),
  loading: LoadingComponent
})
let AsyncTable = loadable({
  loader: () => import('routes/table/'),
  loading: LoadingComponent
})
let AsyncUI = loadable({
  loader: () => import('routes/ui/'),
  loading: LoadingComponent
})
let AsyncUIOverview = loadable({
  loader: () => import('routes/ui-overview/'),
  loading: LoadingComponent
})
let AsyncException = loadable({
  loader: () => import('routes/exception/'),
  loading: LoadingComponent
})



class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Content id='app-content'>
        <Route path={`${match.url}/dashboard`} component={AsyncDashboard} />
        <Route path={`${match.url}/calendar`} component={AsyncCalendar} />
        <Route path={`${match.url}/card`} component={AsyncCard}/>
        <Route path={`${match.url}/chart`} component={AsyncChart} />
        <Route path={`${match.url}/ecommerce`} component={AsyncECommerce} />
        <Route path={`${match.url}/feedback`} component={AsyncFeedback}/>
        <Route path={`${match.url}/form`} component={AsyncForm} />
        <Route path={`${match.url}/layout`} component={AsyncLayout} />
        <Route path={`${match.url}/page`} component={AsyncPage} />
        <Route path={`${match.url}/table`} component={AsyncTable} />
        <Route path={`${match.url}/ui`} component={AsyncUI} />
        <Route path={`${match.url}/ui-overview`} component={AsyncUIOverview} />
        <Route path={`${match.url}/exception`} component={AsyncException} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
