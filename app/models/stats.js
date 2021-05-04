const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const opts = { 
  toJSON: { virtuals: true },
  versionKey: false,
  timestamps: true
};

const StatSchema = new mongoose.Schema(
  {
    country: {
      type: String
    },
    newCases: {
      type: Number
    },
    activeCases: {
      type: Number
    },
    criticalCases: {
      type: Number
    },
    recoveredCases: {
      type: Number
    },
    totalCases: {
      type: Number
    },
    newDeaths: {
      type: Number
    },
    totalDeaths: {
      type: Number
    },
    totalTests: {
      type: Number
    },
    date: {
      type: Date
    }
  },
  opts
)

StatSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Stats', StatSchema)
