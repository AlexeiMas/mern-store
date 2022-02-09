const {model, Schema, Types} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    secondName: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      min: [9, 'Phone number must be at least 9, got {VALUE}']
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    productItems: [{
      idProd: {type: Types.ObjectId, ref: 'Product', required: true},
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: true
      }
    }],
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },
    checkPay: {
      type: String,
      enum: {
        values: ['Draft', 'Not Payed', 'Payed'],
        message: '{VALUE} is not supported'
      },
      default: 'Draft'
    },
    slug: {
      type: Number,
      unique: true
    }
  },
  {
    timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'}
  }
)

schema.plugin(mongoosePaginate)

module.exports = model('Order', schema)
