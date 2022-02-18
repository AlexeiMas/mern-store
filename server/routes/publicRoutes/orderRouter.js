const Router = require('express')
const {create} = require('../../controllers/orderController')
const checkFirstName = require('../../middleware/validation/checkFirstName')
const checkSecondName = require('../../middleware/validation/checkSecondName')
const checkNumber = require('../../middleware/validation/checkNumber')
const checkAddress = require('../../middleware/validation/checkAddress')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.post('/create', [checkFirstName, checkSecondName, checkNumber, checkAddress], validationResultMiddleware, create)

module.exports = router
