const Router = require('express')
const loginRouter = require('./loginRouter')
const userRouter = require('./userRouter')
const tagTypeRouter = require('./tagTypeRouter')
const tagRouter = require('./tagRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const paymentRouter = require('./paymentRouter')
const searchRouter = require('./searchRouter')

const router = Router()

//TODO: create middleware for express-validator error handler in each routes with "check"
router.use('/admin', loginRouter)
router.use('/user', userRouter)
router.use('/tagType', tagTypeRouter)
router.use('/tag', tagRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/payment', paymentRouter)
router.use('/search', searchRouter)

module.exports = router
