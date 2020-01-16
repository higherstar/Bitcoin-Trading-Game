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
    .then((token) => {
      dispatch({
        type: types.USER_SIGNUP_SUCCESS,
        payload: { token },
      });

      return true;
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
    .then((token) => {
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: { token },
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.USER_SIGNUP_FAILED,
        payload: { error },
      });

      throw error;
    });
};