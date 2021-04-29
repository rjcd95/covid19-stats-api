const Stats = require('../../../models/stats')
const { buildErrObject } = require('../../../utils')

/**
 * Checks if stats exists in database
 */
const doesStatsExist = () => {
  return new Promise((resolve, reject) => {
    Stats.find({}, (err, items) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      resolve(items.length)
    });
  })
}

module.exports = { doesStatsExist }
