const Router = require('express')
const {createCheckoutSession, createSuccessPage} = require('../../controllers/paymentController')

const router = Router()

router.post('/', createCheckoutSession)
router.get('/success', createSuccessPage)

module.exports = router
