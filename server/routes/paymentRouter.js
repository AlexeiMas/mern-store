const Router = require('express')
const paymentController = require('../controllers/paymentController')

const router = Router()

// const productItems = async () => {
//   const {productItems} = await Order.findById("61f6b2d4365d791c458dfbb9").populate({
//     path: 'productItems.idProd',
//     select: ['title']
//   }).exec()
//   return productItems.map(item => ({
//     name: item.idProd.title,
//     quantity: item.quantity,
//     priceInCents: item.price * 100
//   }))
// }
// router.get('/', async (req, res) => {
//   const result = await productItems()
//   res.json(result)
// })
router.post('/', paymentController.createCheckoutSession)

module.exports = router