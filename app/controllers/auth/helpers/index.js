const { generateToken } = require('./generateToken')
const { registerUser } = require('./registerUser')
const { setUserInfo } = require('./setUserInfo')
const { returnRegisterToken } = require('./returnRegisterToken')
const { findUser } = require('./findUser')
const { userIsBlocked } = require('./userIsBlocked')
const { blockIsExpired } = require('./blockIsExpired')
const { checkLoginAttemptsAndBlockExpires } = require('./checkLoginAttemptsAndBlockExpires')

module.exports = {
  generateToken,
  registerUser,
  setUserInfo,
  returnRegisterToken,
  findUser,
  userIsBlocked,
  blockIsExpired,
  checkLoginAttemptsAndBlockExpires
}
