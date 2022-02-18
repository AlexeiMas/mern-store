const Router = require('express')
const {create, getOne, update, remove} = require('../../controllers/productController')
const authMiddleware = require("../../middleware/authMiddleware")
const checkTitle = require('../../middleware/validation/checkTitle')
const checkSlug = require('../../middleware/validation/checkSlug')
const checkId = require('../../middleware/validation/checkId')
const checkPrice = require('../../middleware/validation/checkPrice')
const checkDescription = require('../../middleware/validation/checkDescription')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.post('/create', authMiddleware, [checkTitle, checkSlug, checkPrice, checkDescription], validationResultMiddleware, create)
router.get('/:id', authMiddleware, [checkId], validationResultMiddleware, validationResultMiddleware, getOne)
router.put('/:id', authMiddleware, [checkId, checkTitle, checkSlug, checkPrice, checkDescription], validationResultMiddleware, update)
router.delete('/:id', authMiddleware, [checkId], validationResultMiddleware, remove)

module.exports = router
