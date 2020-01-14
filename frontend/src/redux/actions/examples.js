import examplesService from 'services/examples.service';
import types from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const fetchExample = (id) => (dispatch, getState) => {
  if (getState().exampleData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.EXAMPLE_FETCH_REQUEST,
  });

  return examplesService.getExample(id)
    .then((example) => {
      dispatch({
        type: types.EXAMPLE_FETCH_SUCCESS,
        payload: { example },
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.EXAMPLE_FETCH_FAIL,
        payload: { error },
      });

      throw error;
    });
};
