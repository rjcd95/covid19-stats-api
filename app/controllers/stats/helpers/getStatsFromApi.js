const axios = require('axios');
const { buildErrObject } = require('../../../utils')

const requestOptions =  {
  headers: { 'x-rapidapi-key': process.env.RAPID_APIKEY }
};
const requestUrl = `${process.env.RAPID_API_URL}/statistics`;

/**
 * Gets stats data from Rapid Api
 */
const formatData = (response) => {
  let stats = response.map(item => (
    {
      country: item.country.replace("-", " "),
      newCases: item.cases.new ? (item.cases.new.replace("+", "")) : 0,
      activeCases: item.cases.active || 0,
      criticalCases: item.cases.critical || 0,
      recoveredCases: item.cases.recovered || 0,
      totalCases: item.cases.total || 0,
      newDeaths: item.deaths.new ? (item.deaths.new.replace("+", "")) : 0,
      totalDeaths: item.deaths.total || 0,
      totalTests: item.tests.total || 0,
      date: item.time
    }
  ));

  return stats;
}

const getStatsFromApi = () => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl, requestOptions)
      .then(resp => {
        if (resp.status === 200) {
          let data = formatData(resp.data.response);
          resolve(data);
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