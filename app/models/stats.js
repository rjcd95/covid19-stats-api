const mongoose = require('mongoose')

const StatSchema = new mongoose.Schema(
  {
    continent: {
      type: String
    },
    country: {
      type: String
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
    },
    day: {
      type: Date
    },
    time: {
      type: Date
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Stats', StatSchema)
