import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import exampleData from './example';

export default (history) => combineReducers({
  router: connectRouter(history),
  exampleData,
});
