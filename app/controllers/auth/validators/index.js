const { validateRegister } = require('./validateRegister')
const { validateLogin } = require('./validateLogin')
const { validateRefreshToken } = require('./validateRefreshToken')

module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken
}
