import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,

  example: {},

  errors: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EXAMPLE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.EXAMPLE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        example: action.payload.data.example,
      };
    case types.EXAMPLE_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};
