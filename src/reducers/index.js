import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const applicationReducer = combineReducers({
  routing: routerReducer,
});

export default function (state, action) {
  return applicationReducer(state, action);
}
