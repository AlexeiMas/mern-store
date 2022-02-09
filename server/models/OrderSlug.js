const {model, Schema} = require('mongoose')

const schema = new Schema({
  slug: {
    type: Number,
    default: 100000
  }
})

module.exports = model('OrderSlug', schema)
