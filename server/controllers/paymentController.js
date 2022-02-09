const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const ApiError = require("../error/ApiError");
const Order = require("../models/Order");

const productItems = async () => {
  const {productItems} = await Order.findById("61f6b2d4365d791c458dfbb9").populate({
    path: 'productItems.idProd',
    select: ['title']
  }).exec()
  console.log(productItems)
  return productItems.map(item => ({
    name: item.idProd.title,
    quantity: item.quantity,
    priceInCents: item.price * 100
  }))
}

class PaymentController {
  async createCheckoutSession(req, res, next) {
    try {
      const orderItems = await productItems()
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: orderItems.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name
            },
            unit_amount: item.priceInCents
          },
          quantity: item.quantity
        })),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`
      })
      res.json({url: session.url})
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new PaymentController()