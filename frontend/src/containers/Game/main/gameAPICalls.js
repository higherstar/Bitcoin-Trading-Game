import httpService from '../../../services/http.service';

export const setGameScore = async (body) => {
    const res = httpService
    .post('/crypto/setPlayerScore', body)
      .then(() => {return true})
      .catch(() => {
        return false;
      }
    );
    return res
}

export const setGameInfo = async (body) => {
    /* body = {
        roomId: "123",
        playerName: "aaa",
        betCoin: 30,
        score1: 0,
        score2: 0
    } */
    const res = httpService
    .post('/crypto/recordGameInfo', body)
      .then(() => {return true})
      .catch(() => {
        return false;
      }
    );
    return res
} 

export const getWinnerState = async (body) => {
  const res = httpService
  .post('/crypto/gameResult', body)
    .then((result) => {return result})
    .catch(() => {return false});
  return res
}