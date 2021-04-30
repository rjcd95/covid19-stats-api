const { generateToken } = require('./generateToken')
const { registerUser } = require('./registerUser')
const { setUserInfo } = require('./setUserInfo')
const { getUserToken } = require('./getUserToken')
const { findUser } = require('./findUser')
const { userIsBlocked } = require('./userIsBlocked')
const { blockIsExpired } = require('./blockIsExpired')
const { checkLoginAttemptsAndBlockExpires } = require('./checkLoginAttemptsAndBlockExpires')
const { blockUser } = require('./blockUser')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
const { findUserById } = require('./findUserById');
const { getUserIdFromToken } = require ('./getUserIdFromToken')

module.exports = {
  generateToken,
  registerUser,
  setUserInfo,
  getUserToken,
  findUser,
  userIsBlocked,
  blockIsExpired,
  checkLoginAttemptsAndBlockExpires,
  blockUser,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  findUserById,
  getUserIdFromToken
}
