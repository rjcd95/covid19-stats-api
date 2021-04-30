const { validateResult } = require('../../../utils')
const { check } = require('express-validator')

/**
 * Validates refresh token
 */
const validateRefreshToken = [
  check('Authorization')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateRefreshToken }
