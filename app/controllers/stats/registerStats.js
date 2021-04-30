const { handleError } = require('../../utils')
const Stats = require('../../models/stats')
const { getItem } = require('../../middleware/db')
const {
  statItemExist,
  updateStats,
} = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const registerStats = async (req, res) => {
  try {
    const id = req.params.id;
    const statExist = await statItemExist(id);    
    if(statExist) {
      const currentData = await getItem(id, Stats);
      res.status(201).json(await updateStats(id, req.body, currentData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { registerStats }
