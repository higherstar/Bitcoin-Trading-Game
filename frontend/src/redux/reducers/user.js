import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  userToken: '',
  errors: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userToken: action.payload.data.token,
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
      return {
        ...state,
        isFetching: false,
        userToken: action.payload.data.token,
      };
    case types.USER_SIGNUP_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};
