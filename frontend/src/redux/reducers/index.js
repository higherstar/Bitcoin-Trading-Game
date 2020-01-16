import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import exampleData from './example';
import userData from './user';

export default (history) => combineReducers({
  router: connectRouter(history),
  exampleData,
  userData
});
