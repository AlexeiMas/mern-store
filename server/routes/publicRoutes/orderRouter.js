const Router = require('express')
const {create, update} = require('../../controllers/orderController')
const checkFirstName = require('../../middleware/validation/checkFirstName')
const checkSecondName = require('../../middleware/validation/checkSecondName')
const checkNumber = require('../../middleware/validation/checkNumber')
const checkAddress = require('../../middleware/validation/checkAddress')
const checkEmail = require('../../middleware/validation/checkEmail')
const checkId = require('../../middleware/validation/checkId')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.post('/create', [checkFirstName, checkSecondName, checkNumber, checkAddress, checkEmail], validationResultMiddleware, create)
router.put('/:id', [checkId, checkFirstName, checkSecondName, checkNumber, checkAddress, checkEmail], validationResultMiddleware, update)

module.exports = router
