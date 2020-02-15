import gamePlayService from 'services/gamePlay.service';
import types from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const getActiveRoomId = () => (dispatch, getState) => {
  if (getState().exampleData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.GET_ACTIVE_GAME_ROOM_REQUEST,
  });

  return gamePlayService.getActiveRoom()
    .then((room) => {
      dispatch({
        type: types.GET_ACTIVE_GAME_ROOM_SUCCESS,
        payload: { room },
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.GET_ACTIVE_GAME_ROOM_FAILDED,
        payload: { error },
      });

      throw error;
    });
};
