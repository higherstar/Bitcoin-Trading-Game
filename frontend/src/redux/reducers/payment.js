import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  paymentStatus: {},
  paymentToken: '',
  errors: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PAYMENT_CHARGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.PAYMENT_CHARGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentStatus: action.payload.response,
      };
    case types.PAYMENT_CHARGE_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};
