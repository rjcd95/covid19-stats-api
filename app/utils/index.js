const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { buildErrObject } = require('./buildErrObject')
const { handleError } = require('./handleError')
const { itemNotFound } = require('./itemNotFound')
const { validateResult } = require('./validateResult')

module.exports = {
  removeExtensionFromFile,
  buildErrObject,
  handleError,
  itemNotFound,
  validateResult
}
