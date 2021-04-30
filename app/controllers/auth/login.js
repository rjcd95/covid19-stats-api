const { findUser } = require('./helpers')
const { handleError } = require('../../utils')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await findUser(data.email)
    console.log(user);
    res.status(200).json({msg: 'login'})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
