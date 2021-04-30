const {
    getUserIdFromToken,
    findUserById,
    setUserInfo,
    getUserToken
  } = require('./helpers')
  const { handleError } = require('../../utils')
  
  /**
   * Refresh token function called by route
   * @param {Object} req - request object
   * @param {Object} res - response object
   */
  const refreshToken = async (req, res) => {
    try {
      const tokenEncrypted = req.headers.authorization
        .replace('Bearer ', '')
        .trim()
      let userId = await getUserIdFromToken(tokenEncrypted)
      const user = await findUserById(userId)
      const userInfo = await setUserInfo(user)
      const token = await getUserToken(user, userInfo)
      // Removes user info from response
      delete token.user
      res.status(200).json(token)
    } catch (error) {
      handleError(res, error)
    }
  }
  
  module.exports = { refreshToken }
  