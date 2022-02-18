const Router = require('express')
const tagTypeRouter = require('./publicRoutes/tagTypeRouter')
const tagRouter = require('./publicRoutes/tagRouter')
const productRouter = require('./publicRoutes/productRouter')
const orderRouter = require('./publicRoutes/orderRouter')
const paymentRouter = require('./publicRoutes/paymentRouter')
const searchRouter = require('./publicRoutes/searchRouter')

const router = Router()

router.use('/tagType', tagTypeRouter)
router.use('/tag', tagRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/payment', paymentRouter)
router.use('/search', searchRouter)

module.exports = router