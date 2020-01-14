import httpService from './http.service';

const getExample = (id) => httpService
  .get(`/examples/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

export default {
  getExample,
};
