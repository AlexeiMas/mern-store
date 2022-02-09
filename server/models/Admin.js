const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'}
  }
)

schema.plugin(mongoosePaginate);

module.exports = model('Admin', schema)
