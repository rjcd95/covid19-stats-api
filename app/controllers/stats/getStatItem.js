const Stats = require('../../models/stats')
const { getItem } = require('../../middleware/db')
const { handleError } = require('../../utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getStatItem = async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).json(await getItem(id, Stats))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getStatItem }
