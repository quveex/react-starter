import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store';
import ReactHotLoader from './utilities/ReactHotLoader';
import App from './containers/App';

import 'normalize.css';
import './assets/styles/index.css';

const history = createHistory();
const store = configureStore(history);

const render = Component => {
  ReactDOM.render(
    <ReactHotLoader>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </ReactHotLoader>,
    document.getElementById('app')
  )
};

render(App);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./containers/App', () => { render(App); });
  }
}
