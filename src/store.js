import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const isProd = process.env.NODE_ENV === 'production';

export default function configureStore(history, initialState = {}) {
  let middlewares = compose(
    applyMiddleware(reduxThunk, routerMiddleware(history)),
  );

  if (!isProd) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middlewares = compose(middlewares, devToolsExtension());
    }
  }

  const store = createStore(rootReducer, initialState, middlewares);

  if (!isProd) {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}
