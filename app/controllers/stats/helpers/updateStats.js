const { itemNotFound } = require('../../../utils')
const Stats = require('../../../models/stats')

/*
 * The active cases are calculated based on 
 * current Active Cases + Current Critical Cases + New Cases (registered by the user)
 * and all of this we subtract the new Recovered Cases + New Deats (registered by the user)
 */
const calculateActiveCases = (newData, currentData) => {
  const currentActiveCases = currentData.cases.active || 0;
  const currentCriticalCases = currentData.cases.critical || 0;
  const newActiveCases = (currentActiveCases + currentCriticalCases + newData.newCases) - (newData.newDeaths + newData.recovered);
  return newActiveCases;
}

/*
 * The recovered cases are calculated based on 
 * current Recovered Cases + New Recovered Cases (registered by the user)
 */
const calculateRecoveredCases = (newData, currentData) => {
  const currentRecoveredCases = currentData.cases.recovered || 0;
  const newRecoveredCases = currentRecoveredCases + newData.recovered;
  return newRecoveredCases;
}

/*
 * The total cases are calculated based on 
 * current Total Cases + New Cases (registered by the user)
 */
const calculateTotalCases = (newData, currentData) => {
  const currentTotalCases = currentData.cases.total || 0;
  const newTotalCases = currentTotalCases + newData.newCases;
  return newTotalCases;
}

/*
 * The total deaths are calculated based on 
 * current Total Deaths Cases + New Deaths Cases (registered by the user)
 */
const calculateTotalDeaths = (newData, currentData) => {
  const currentTotalDeaths = currentData.deaths.total || 0;
  const newTotalDeaths = currentTotalDeaths + newData.newDeaths;
  return newTotalDeaths;
}

/*
 * The total tests are calculated based on 
 * current Total Tests + New Tests (registered by the user)
 */
const calculateTotalTests = (newData, currentData ) => {
  const currentTotalTests = currentData.tests.total || 0;
  const newTotalTests = currentTotalTests + newData.newTests;
  return newTotalTests;
}

/*
 * Create object based on model structure to update registers
 */
const formatDataToModel = (newData, currentData) => {
  return {
    cases: {
      new: `+${newData.newCases}`,
      active: calculateActiveCases(newData, currentData),
      critical: newData.critical,
      recovered: calculateRecoveredCases(newData, currentData),
      total: calculateTotalCases(newData, currentData)
    },
    deaths: {
      new: `+${newData.newDeaths}`,
      total: calculateTotalDeaths(newData, currentData)
    },
    tests: {
      total: calculateTotalTests(newData, currentData)
    },
    time: new Date()
  }
}

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} newData - request object
 */
const updateStats = (id = '', newData = {}, currentData = {}) => {
  const data = formatDataToModel(newData, currentData);
  return new Promise((resolve, reject) => {
    Stats.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { updateStats }
