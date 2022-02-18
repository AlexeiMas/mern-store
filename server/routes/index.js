const Router = require('express')
const loginRouter = require('./loginRouter')

const privateRoutes = require('./privateRoutes')
const publicRoutes = require('./publicRoutes')

const router = Router()

router.use('/login', loginRouter)
router.use('/admin', privateRoutes)
router.use('/', publicRoutes)

module.exports = router
