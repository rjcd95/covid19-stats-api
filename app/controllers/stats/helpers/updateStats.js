const { itemNotFound } = require('../../../utils')
const Stats = require('../../../models/stats')

/*
 * The active cases are calculated based on 
 * current Active Cases + Current Critical Cases + New Cases (registered by the user)
 * and all of this we subtract the new Recovered Cases + New Deats (registered by the user)
 */
const calculateActiveCases = (newData, currentData) => {
  const currentActiveCases = parseInt(currentData.activeCases || 0);
  const currentCriticalCases = parseInt(currentData.criticalCases || 0);
  const newActiveCases = (newData.newCases + currentActiveCases + currentCriticalCases) - (newData.newDeaths + newData.recovered);
  return newActiveCases;
}

/*
 * The recovered cases are calculated based on 
 * current Recovered Cases + New Recovered Cases (registered by the user)
 */
const calculateRecoveredCases = (newData, currentData) => {
  const currentRecoveredCases = currentData.recoveredCases || 0;
  const newRecoveredCases = currentRecoveredCases + newData.recovered;
  return newRecoveredCases;
}

/*
 * The total cases are calculated based on 
 * current Total Cases + New Cases (registered by the user)
 */
const calculateTotalCases = (newData, currentData) => {
  const currentTotalCases = currentData.totalCases || 0;
  const newTotalCases = currentTotalCases + newData.newCases;
  return newTotalCases;
}

/*
 * The total deaths are calculated based on 
 * current Total Deaths Cases + New Deaths Cases (registered by the user)
 */
const calculateTotalDeaths = (newData, currentData) => {
  const currentTotalDeaths = currentData.totalDeaths || 0;
  const newTotalDeaths = currentTotalDeaths + newData.newDeaths;
  return newTotalDeaths;
}

/*
 * The total tests are calculated based on 
 * current Total Tests + New Tests (registered by the user)
 */
const calculateTotalTests = (newData, currentData ) => {
  const currentTotalTests = currentData.totalTests || 0;
  const newTotalTests = currentTotalTests + newData.newTests;
  return newTotalTests;
}

/*
 * Create object based on model structure to update registers
 */
const formatDataToModel = (newData, currentData) => {
  return {
    newCases: newData.newCases,
    activeCases: calculateActiveCases(newData, currentData),
    criticalCases: newData.critical,
    recoveredCases: calculateRecoveredCases(newData, currentData),
    totalCases: calculateTotalCases(newData, currentData),
    newDeaths: newData.newDeaths,
    totalDeaths: calculateTotalDeaths(newData, currentData),
    newTests: newData.newTests,
    totalTests: calculateTotalTests(newData, currentData),
    date: new Date()
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
