const { 
  findUser,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires,
} = require('./helpers')
const { handleError } = require('../../utils')
const { checkPassword } = require('../../middleware/auth')

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
    //Check if is the correct password
    const isPasswordMatch = await checkPassword(data.password, user)
    if (!isPasswordMatch) {
      console.log('Error on login');
    } else {
      console.log('Login ok');
    }
    res.status(200).json({msg: 'login'})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
