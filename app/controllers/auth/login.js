const { 
  findUser,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires
} = require('./helpers')
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
    //Validate if user is blocked or not
    await userIsBlocked(user)
    //Validate if the login attempts are greater than specified value
    //and check if the blockexpires is less than now
    await checkLoginAttemptsAndBlockExpires(user)
    console.log(user);
    res.status(200).json({msg: 'login'})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
