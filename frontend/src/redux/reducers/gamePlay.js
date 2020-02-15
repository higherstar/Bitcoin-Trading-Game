import types from '../actionTypes';

const INITIAL_STATE = {
  isFetching: false,

  gameActiveRoom: {},

  errors: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_ACTIVE_GAME_ROOM_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ACTIVE_GAME_ROOM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        gameActiveRoom: action.payload.data.room,
      };
    case types.GET_ACTIVE_GAME_ROOM_FAILDED:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};