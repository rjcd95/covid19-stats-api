const { 
  registerUser,
  setUserInfo,
  returnRegisterToken
} = require('./helpers')
const { handleError } = require('../../utils')
const { emailExists } = require('../../middleware/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    const data = req.body;
    const doesEmailExists = await emailExists(data.email)
    if (!doesEmailExists) {
      const item = await registerUser(data)
      const userInfo = await setUserInfo(item)
      const response = await returnRegisterToken(item, userInfo)
      console.log('response', response);
      res.status(201).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
