const Stats = require('../../../models/stats')
const { buildErrObject } = require('../../../utils')

/**
 * Checks if stats exists in database
 */
const statItemExist = (id = '') => {
  return new Promise((resolve, reject) => {
    Stats.findById(id, (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (!item) {
          return reject(buildErrObject(422, 'REGISTER_DOES_NOT_EXISTS'))
        }
        resolve(true)
    });
  })
}

module.exports = { statItemExist }
    