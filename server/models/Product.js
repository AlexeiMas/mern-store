const {model, Schema, Types} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      default: ''
    },
    orderCounter: {
      type: Number,
      default: 0
    },
    tagsIds: [
      {type: Types.ObjectId, ref: 'Tag'}
    ],
    slug: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'}
  }
)

schema.plugin(mongoosePaginate);

module.exports = model('Product', schema)
