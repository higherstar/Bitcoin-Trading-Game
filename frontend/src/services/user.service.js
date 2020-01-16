import httpService from './http.service';

const register = (body) => httpService
  .post(`/users/register`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

const login = (body) => httpService
  .post(`/users/authenticate`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));
export default {
  register,
  login
};
