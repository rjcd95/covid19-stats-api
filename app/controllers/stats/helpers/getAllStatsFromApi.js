const axios = require('axios');
const { buildErrObject } = require('../../../utils')

const requestOptions =  {
  headers: { 'x-rapidapi-key': process.env.RAPID_APIKEY }
};
const requestUrl = `${process.env.RAPID_API_URL}/statistics`;

/**
 * Gets all stats data from Rapid Api
 */
const getAllStatsFromApi = () => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl, requestOptions)
      .then(response => {
        if (response.status === 200) {
          resolve(processData(response.data));
        } else {
          return reject(buildErrObject(response.statusCode, response.message))
        }
      })   
      .catch((error) => {
        return reject(buildErrObject(422, error))
      })
  })
}

const processData = (data) => {
  return data.response;
}

module.exports = { getAllStatsFromApi }