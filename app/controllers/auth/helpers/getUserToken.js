const { generateToken } = require('./generateToken')

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const getUserToken = (
  { id = '' },
  userInfo = {}
) => {
  return new Promise((resolve) => {
    userInfo.accessToken = generateToken(id);
    resolve(userInfo)
  })
}

module.exports = { getUserToken }
