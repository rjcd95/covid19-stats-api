const { getStatsFromApi } = require('./getStatsFromApi')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')
const { doesStatsExist } = require('./doesStatsExist')
const { deleteStats } = require('./deleteStats')

module.exports = {
    getStatsFromApi,
    getAllItemsFromDB,
    doesStatsExist,
    deleteStats
}
