import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
