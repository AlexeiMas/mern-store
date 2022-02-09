const {model, Schema, Types} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  tagTypeId: {
    type: Types.ObjectId,
    ref: 'TagType',
    required: true
  }
})

schema.plugin(mongoosePaginate);

module.exports = model('Tag', schema)
