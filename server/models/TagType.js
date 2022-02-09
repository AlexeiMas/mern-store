const {model, Schema} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

schema.plugin(mongoosePaginate);

module.exports = model('TagType', schema)
