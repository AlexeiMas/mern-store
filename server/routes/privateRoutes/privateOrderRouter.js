const Router = require('express')
const {getAll, getOne, update, remove} = require('../../controllers/orderController')
const authMiddleware = require("../../middleware/authMiddleware")
const urlParseMiddleware = require("../../middleware/urlParseMiddleware")
const checkFirstName = require('../../middleware/validation/checkFirstName')
const checkSecondName = require('../../middleware/validation/checkSecondName')
const checkId = require('../../middleware/validation/checkId')
const checkNumber = require('../../middleware/validation/checkNumber')
const checkAddress = require('../../middleware/validation/checkAddress')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.get('/getAll', authMiddleware, getAll)
router.get('/getAll/:url', authMiddleware, urlParseMiddleware, getAll)
router.get('/:id', authMiddleware, [checkId], validationResultMiddleware, getOne)
router.put('/:id', authMiddleware, [checkFirstName, checkSecondName, checkNumber, checkAddress], validationResultMiddleware, update)
router.delete('/:id', authMiddleware, [checkId], validationResultMiddleware, remove)

module.exports = router
