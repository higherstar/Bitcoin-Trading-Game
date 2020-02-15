import httpService from './http.service';

const getActiveRoom = () => httpService
  .get('/room/getActiveRoom')
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

export default {
    getActiveRoom,
};