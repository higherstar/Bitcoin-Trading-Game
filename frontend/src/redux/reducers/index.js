import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import exampleData from './example';
import userData from './user';
import paymentData from './payment';
import gamePlayData from './gamePlay'

export default (history) => combineReducers({
  router: connectRouter(history),
  exampleData,
  userData,
  paymentData,
  gamePlayData,
});
