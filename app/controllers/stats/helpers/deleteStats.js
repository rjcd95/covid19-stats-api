const Stats = require('../../../models/stats')
const { buildErrObject } = require('../../../utils')

/**
 * Delete all stats
 */
const deleteStats = () => {
  return new Promise((resolve, reject) => {
    Stats.deleteMany({}, (err) => {
        if (err) {
            return reject(buildErrObject(422, err.message))
        }
        resolve(true)
    });
  })
}

module.exports = { deleteStats }