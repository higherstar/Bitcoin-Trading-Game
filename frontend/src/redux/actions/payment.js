import paymentService from 'services/payment.service';
import types from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setPaymentToken = (body) => (dispatch, getState) => {
  if (getState().userData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.PAYMENT_TOKEN_REQUEST,
  });

  return paymentService.updateInfo(body)
    .then((response) => {
      dispatch({
        type: types.PAYMENT_TOKEN_SUCCESS,
        payload: { response },
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.PAYMENT_TOKEN_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const chargeStripe = (body) => (dispatch, getState) => {
  if (getState().paymentData.isFetching) {
    return Promise.reject();
  }

  dispatch({
    type: types.PAYMENT_CHARGE_REQUEST,
  });

  return paymentService.chargeStripe(body)
    .then((response) => {
      dispatch({
        type: types.PAYMENT_CHARGE_SUCCESS,
        payload: { response },
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.PAYMENT_CHARGE_FAILED,
        payload: { error },
      });

      throw error;
    });
};

export const getPaymentInfo = () => (dispatch, getState) => {
  if (getState().paymentData.isFetching) {
    return Promise.reject();
  }

  if (!getState().userData.userInfo._id) {
    console.log('venus---->, no ID')
    return Promise.reject('No user Info');
  }

  dispatch({
    type: types.PAYMENT_GET_INFO_REQUEST,
  });

  return paymentService.getPaymentInfo(getState().userData.userInfo._id)
    .then((response) => {
      dispatch({
        type: types.PAYMENT_GET_INFO_SUCCESS,
        payload: { response },
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.PAYMENT_GET_INFO_FAILED,
        payload: { error },
      });

      throw error;
    });
};
