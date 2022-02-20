const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const ApiError = require("../error/ApiError");
const Order = require("../models/Order");

const productItems = async (id) => {
  // const {productItems, email} = await Order.findById("61f6b2d4365d791c458dfbb9").populate({
  const {_id, email, productItems} = await Order.findById(id).populate({
    path: 'productItems.idProd',
    select: ['title']
  }).exec()

  return ({_id, email, orderItems: productItems.map(item => ({
      name: item.idProd.title,
      quantity: item.quantity,
      priceInCents: item.price * 100
    }))})
}

class PaymentController {
  async createCheckoutSession(req, res, next) {
    try {
      const {id} = req.body
      const {_id, email, orderItems} = await productItems(id)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: email,
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
        success_url: `${process.env.SERVER_URL}/api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${_id}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`
      })
      // res.json({url: session.url})
      res.redirect(303, session.url)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async createSuccessPage(req, res, next) {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
      const customer = await stripe.customers.retrieve(session.customer);
      const orderId = req.query.order_id

      if (customer.id) {
        await Order.findByIdAndUpdate({_id: orderId}, {$set: {'checkPay': 'Payed'}})
      }

      console.log(customer)

      res.status(301).redirect(`${process.env.CLIENT_URL}/success`)

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
}
}

module.exports = new PaymentController()
