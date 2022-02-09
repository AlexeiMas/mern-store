const Order = require("../models/Order")
const Product = require("../models/Product")
const OrderSlug = require("../models/OrderSlug")
const ApiError = require("../error/ApiError")
const getAll = require("./generals/getAll")

const totalPrice = (data) => data.reduce((acc, el) => acc += (el.quantity * el.price), 0)

class OrderController {
  async create(req, res, next) {
    try {
      const {firstName, secondName, phone, deliveryAddress, productItems} = req.body

      const normalizeItems = JSON.parse(productItems)
      const totalPrice = totalPrice(normalizeItems)
      const {_id, slug} = await OrderSlug.findById('61f6a17108b1fb14971ab2ee')

      const order = await Order.create({
        firstName,
        secondName,
        phone,
        deliveryAddress,
        productItems: normalizeItems,
        totalPrice,
        checkPay: 'Draft',
        slug: slug
      })
      // await OrderSlug.findOneAndUpdate({}, {slug: slug + 1}, {new: true})
      await OrderSlug.findOneAndUpdate({_id}, {slug: slug + 1}, {new: true})
      return res.json(order)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    // await OrderSlug.create({slug: 100000})
    await getAll(req, res, Order)
  }

  async getOne(req, res) {
    const {id} = req.params
    const product = await Order.findById(id)
    res.json(product)
  }

  async update(req, res, next) {
    try {
      const {id: _id} = req.params
      const {firstName, secondName, phone, deliveryAddress, productItems, isPayed} = req.body
      const order = await Order.findById(_id)

      if (!order) {
        return next(ApiError.notFound('Order with such id is not found.'))
      }

      const normalizeItems = JSON.parse(productItems)
      const totalPrice = totalPrice(normalizeItems)

      await Order.findOneAndUpdate({_id}, {
        firstName,
        secondName,
        phone,
        deliveryAddress,
        productItems: normalizeItems,
        totalPrice,
        checkPay: isPayed ? 'Payed' : 'Not Payed'
      }, {new: true})

      if (isPayed) {
        for (let i=0; i<normalizeItems.length; i++) {
          await Product.findByIdAndUpdate(normalizeItems[i].idProd, {$inc: {orderCounter: normalizeItems[i].quantity}})
        }
      }

      res.json({message: "Order's data successfully updated"})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      const {id} = req.params
      await Order.findByIdAndRemove(id)
      res.json({message: 'Order successfully deleted.'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new OrderController()
