const Router = require('express')
const loginRouter = require('./loginRouter')
const userRouter = require('./userRouter')
const tagTypeRouter = require('./tagTypeRouter')
const tagRouter = require('./tagRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const paymentRouter = require('./paymentRouter')

const router = Router()

router.use('/admin', loginRouter)
router.use('/user', userRouter)
router.use('/tagType', tagTypeRouter)
router.use('/tag', tagRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/payment', paymentRouter)

module.exports = router
