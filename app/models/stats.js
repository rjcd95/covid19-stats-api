const mongoose = require('mongoose')

const StatSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true
    },
    cases: {
        new: {
          type: String
        },
        active: {
          type: Number
        },
        critical: {
          type: String
        },
        recovered: {
          type: Number
        },
        total: {
          type: Number
        }
    },
    deaths: {
      new: {
        type: String
      },
      total: {
        type: Number
      }
    },
    tests: {
      total: {
        type: Number
      }
    }
  }
)
module.exports = mongoose.model('Stats', StatSchema)
