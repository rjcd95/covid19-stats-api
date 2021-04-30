const { generateToken } = require('./generateToken')
const { registerUser } = require('./registerUser')
const { setUserInfo } = require('./setUserInfo')
const { returnRegisterToken } = require('./returnRegisterToken')
const { findUser } = require('./findUser')

module.exports = {
  generateToken,
  registerUser,
  setUserInfo,
  returnRegisterToken,
  findUser
}
