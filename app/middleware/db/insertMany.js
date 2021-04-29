const { buildErrObject } = require('../../utils')

/**
 * Creates many items in database
 * @param [Array] data - request object
 */
const insertMany = (data = [], model = {}) => {
  return new Promise((resolve, reject) => {
    model.insertMany(data, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item.length > 0)
    })
  })
}

module.exports = { insertMany }
