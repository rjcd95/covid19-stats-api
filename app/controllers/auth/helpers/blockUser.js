const { addHours } = require('date-fns')
const { buildErrObject } = require('../../../utils')

/**
 * Blocks a user by setting blockExpires to the specified date based on env variable   HOURS_TO_BLOCK
 * @param {Object} user - user object
 */
const blockUser = (user = {}) => {
  return new Promise((resolve, reject) => {
    user.blockExpires = addHours(new Date(), process.env.HOURS_TO_BLOCK)
    user.save((err, result) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      if (result) {
        return resolve(buildErrObject(409, 'BLOCKED_USER'))
      }
    })
  })
}

module.exports = { blockUser }
