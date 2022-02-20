const Order = require("../models/Order")
const Product = require("../models/Product")
const OrderSlug = require("../models/OrderSlug")
const ApiError = require("../error/ApiError")
const getAll = require("./generals/getAll")

const totalPriceCalc = (data) => data.reduce((acc, el) => acc += (el.quantity * el.price), 0)

class OrderController {
  async create(req, res, next) {
    try {
      const {firstName, secondName, phone, deliveryAddress, email, productItems} = req.body
      const totalPrice = totalPriceCalc(productItems)
      const {_id, slug} = await OrderSlug.findById('61f6a17108b1fb14971ab2ee')

      const order = await Order.create({
        firstName,
        secondName,
        phone,
        deliveryAddress,
        email,
        productItems,
        totalPrice,
        checkPay: 'Draft',
        slug: slug
      })
      await OrderSlug.findByIdAndUpdate({_id}, {slug: slug + 1}, {new: true})
      return res.json(order)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    // await OrderSlug.create({slug: 100000})
    await getAll(req, res, next, Order)
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      const product = await Order.findById(id)
      res.json(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const {id: _id} = req.params
      const {firstName, secondName, phone, deliveryAddress, email, productItems, isPayed} = req.body
      const order = await Order.findById(_id)

      if (!order) {
        return next(ApiError.notFound('Order with such id is not found.'))
      }

      // const normalizeItems = JSON.parse(productItems)
      // const totalPrice = totalPriceCalc(normalizeItems)
      const totalPrice = totalPriceCalc(productItems)

      await Order.findOneAndUpdate({_id}, {
        firstName,
        secondName,
        phone,
        deliveryAddress,
        email,
        productItems,
        totalPrice,
        checkPay: isPayed ? 'Payed' : 'Not Payed'
      }, {new: true})

      if (isPayed) {
        for (let i=0; i<productItems.length; i++) {
          await Product.findByIdAndUpdate(productItems[i].idProd, {$inc: {orderCounter: productItems[i].quantity}})
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
