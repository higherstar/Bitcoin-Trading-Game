import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  userInfo: {},
  errors: '',
  userTradeToken: 5
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem('kc_token', action.payload.response.token);
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload.response,
      };
    case types.USER_LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };

    case types.USER_SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.USER_SIGNUP_SUCCESS:
      localStorage.setItem('kc_token', action.payload.response.token);
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload.response,
      };
    case types.USER_SIGNUP_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    case types.PAYMENT_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.PAYMENT_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload.response,
      };
    case types.PAYMENT_TOKEN_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };

    case types.USER_GET_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.USER_GET_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload.response,
      };
    case types.USER_GET_INFO_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    case types.SET_TRADE_TOKEN:
      return {
        ...state,
        userTradeToken: state.userTradeToken + action.payload
      }
    default:
      return state;
  }
};
