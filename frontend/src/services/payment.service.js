import httpService from './http.service';
import { errorMessage } from '../utils'
const updateInfo = (body) => httpService
  .put('/users/updatePayInfo', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

const chargeStripe = (body) => httpService
  .post('/payment/charge', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));

const getPaymentInfo = (id) => httpService
  .get(`/payment/getInfo/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));

const buyInStacke = (buyInBody) => httpService
  .post('/payment/buyin', buyInBody)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));

const leaderBoardScores = () => httpService
  .post('/payment/leaderBoardList')
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));

export default {
  chargeStripe,
  updateInfo,
  getPaymentInfo,
  buyInStacke,
  leaderBoardScores
};
