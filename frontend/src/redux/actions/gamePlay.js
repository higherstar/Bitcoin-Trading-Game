import gamePlayService from 'services/gamePlay.service';
import types from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const getActiveRoom = () => (dispatch, getState) => {
  if (getState().gamePlayData.isFetching) {
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

      return room;
    })
    .catch((error) => {
      dispatch({
        type: types.GET_ACTIVE_GAME_ROOM_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const createRoom = () => (dispatch, getState) => {
  if (getState().gamePlayData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.CREATE_ROOM_REQUEST,
  });

  return gamePlayService.createRoom()
    .then((room) => {
      dispatch({
        type: types.CREATE_ROOM_SUCCESS,
        payload: { room },
      });

      return room;
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_ROOM_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const joinRoom = (body) => (dispatch, getState) => {
  if (getState().gamePlayData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.CREATE_ROOM_REQUEST,
  });

  return gamePlayService.joinRoom(body)
    .then((room) => {
      dispatch({
        type: types.CREATE_ROOM_SUCCESS,
        payload: { room },
      });

      return room;
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_ROOM_FAILED,
        payload: { error },
      });

      throw error;
    });
};
