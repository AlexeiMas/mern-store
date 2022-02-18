const Router = require('express')
const userRouter = require('./privateRoutes/userRouter')
const privateTagTypeRouter = require('./privateRoutes/privateTagTypeRouter')
const privateTagRouter = require('./privateRoutes/privateTagRouter')
const privateProductRouter = require('./privateRoutes/privateProductRouter')
const privateOrderRouter = require('./privateRoutes/privateOrderRouter')

const router = Router()
router.use('/user', userRouter)
router.use('/tagType', privateTagTypeRouter)
router.use('/tag', privateTagRouter)
router.use('/product', privateProductRouter)
router.use('/order', privateOrderRouter)

module.exports = router