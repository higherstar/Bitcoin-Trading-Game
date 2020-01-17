import httpService from './http.service';

const updateInfo = (body) => httpService
  .put('/users/update', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

const chargeStripe = (body) => httpService
  .post('/payment/charge', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

export default {
  chargeStripe,
  updateInfo,
};
