import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  chargeResult: {},
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
        chargeResult: action.payload,
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
