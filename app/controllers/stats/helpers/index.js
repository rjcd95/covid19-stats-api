const { getStatsFromApi } = require('./getStatsFromApi')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')
const { deleteStats } = require('./deleteStats')
const { manyStatsExist } = require('./manyStatsExist')
const { statItemExist } = require('./statItemExist')
const { updateStats } = require('./updateStats')

module.exports = {
    getStatsFromApi,
    getAllItemsFromDB,
    deleteStats,
    manyStatsExist,
    statItemExist,
    updateStats
}
