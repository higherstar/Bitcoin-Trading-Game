import httpService from './http.service';

const register = (id) => httpService
  .post(`/users/register/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

const login = (id) => httpService
  .post(`/users/authenticate/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));
export default {
  register,
  login
};
