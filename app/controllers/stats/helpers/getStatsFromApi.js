const axios = require('axios');
const { buildErrObject } = require('../../../utils')

const requestOptions =  {
  headers: { 'x-rapidapi-key': process.env.RAPID_APIKEY }
};
const requestUrl = `${process.env.RAPID_API_URL}/statistics`;

/**
 * Gets stats data from Rapid Api
 */
const getStatsFromApi = () => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl, requestOptions)
      .then(resp => {
        if (resp.status === 200) {
          resolve(resp.data.response);
        } else {
          return reject(buildErrObject(resp.status, resp.message))
        }
      })   
      .catch((error) => {
        return reject(buildErrObject(422, error))
      })
  })
}

module.exports = { getStatsFromApi }