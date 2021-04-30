/**
 * Checks that login attempts are greater than specified in enviroment variables 
 * and also that blockexpires is less than now
 * @param {Object} user - user object
 */
const blockIsExpired = ({ loginAttempts = 0, blockExpires = '' }) =>
  loginAttempts > process.env.LOGIN_ATTEMPTS && blockExpires <= new Date()

module.exports = { blockIsExpired }
