const Stats = require('../../../models/stats')
const { buildErrObject } = require('../../../utils')
const { 
  listInitOptions,
  cleanPaginationID 
} = require('../../../middleware/db')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = async (req = {}, query = {}) => {
  query = { country : new RegExp(req.query.search, 'i')};
  const options = await listInitOptions(req)
  return new Promise((resolve, reject) => {
    Stats.paginate(query, options, (err, items) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      resolve(cleanPaginationID(items))
    })
  })
}

module.exports = { getAllItemsFromDB }
