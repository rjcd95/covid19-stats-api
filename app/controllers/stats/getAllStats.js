const { handleError } = require('../../utils')
const { getAllItemsFromDB } = require('./helpers')
const { checkQueryString } = require('../../middleware/db')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllStats = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    res.status(200).json(await getAllItemsFromDB(req, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllStats }
