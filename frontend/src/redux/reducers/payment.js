import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  paymentInfo: {},
  paymentToken: '',
  errors: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /* Charge Amount API */
    case types.PAYMENT_CHARGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.PAYMENT_CHARGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentInfo: action.payload.response,
      };
    case types.PAYMENT_CHARGE_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    /* Get Payment Info API */
    case types.PAYMENT_GET_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.PAYMENT_GET_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentInfo: action.payload.response,
      };
    case types.PAYMENT_GET_INFO_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    /* buyIn API */
    case types.BUYIN_STACKE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.BUYIN_STACKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentInfo: action.payload.response,
      };
    case types.BUYIN_STACKE_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};
