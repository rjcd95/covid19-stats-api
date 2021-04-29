const { handleError } = require('../../utils')
const { getAllStatsFromApi } = require('./helpers')

const syncStatsData = async (req, res) => {
    try {
      res.status(200).json(await getAllStatsFromApi())
    } catch (error) {
      handleError(res, error)
    }
}

module.exports = { syncStatsData }
