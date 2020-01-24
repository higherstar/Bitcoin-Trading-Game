import userService from 'services/user.service';
import types from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const registerUser = (body) => (dispatch, getState) => {
  if (getState().userData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.USER_SIGNUP_REQUEST,
  });

  return userService.register(body)
    .then((response) => {
      dispatch({
        type: types.USER_SIGNUP_SUCCESS,
        payload: { response },
      });

      return response;
    })
    .catch((error) => {
      dispatch({
        type: types.USER_SIGNUP_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const logInUser = (body) => (dispatch, getState) => {
  if (getState().userData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.USER_LOGIN_REQUEST,
  });

  return userService.login(body)
    .then((response) => {
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: { response },
      });

      return response;
    })
    .catch((error) => {
      dispatch({
        type: types.USER_SIGNUP_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const getUserInfo = (id) => (dispatch, getState) => {
  if (getState().userData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.USER_GET_INFO_REQUEST,
  });

  return userService.getUserInfo(id)
    .then((response) => {
      dispatch({
        type: types.USER_GET_INFO_SUCCESS,
        payload: { response },
      });

      return response;
    })
    .catch((error) => {
      dispatch({
        type: types.USER_GET_INFO_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const setTradeToken = (token) => (dispatch) => {
  return dispatch({
    type: types.SET_TRADE_TOKEN,
    payload: token
  })
}
