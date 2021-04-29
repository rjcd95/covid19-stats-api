const Stats = require('../../../models/stats')
const { buildErrObject } = require('../../../utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Stats.find(
      {},
      {
        sort: {
          country: 0
        }
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

module.exports = { getAllItemsFromDB }
