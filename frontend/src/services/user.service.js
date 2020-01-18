import httpService from './http.service';
import { errorMessage } from '../utils'

const register = (body) => httpService
  .post(`/users/register`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));

const login = (body) => httpService
  .post(`/users/authenticate`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));

const getUserInfo = (id) => httpService
  .get(`/users/getInfo/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(errorMessage(err.response)));
export default {
  register,
  login,
  getUserInfo
};
