import httpService from './http.service';

const getActiveRoom = () => httpService
  .get('/room/getActiveRoom')
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

const createRoom = () => httpService
  .post('/room/createRoom')
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));

const joinRoom = (body) => httpService
  .post('/room/joinRoom', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response));
  
export default {
    getActiveRoom,
    createRoom,
    joinRoom,
};