const Router = require('express')
const {getAll, getOne, update, remove} = require('../../controllers/orderController')
const authMiddleware = require("../../middleware/authMiddleware")
const urlParseMiddleware = require("../../middleware/urlParseMiddleware")
const checkId = require('../../middleware/validation/checkId')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.get('/getAll', authMiddleware, getAll)
router.get('/getAll/:url', authMiddleware, urlParseMiddleware, getAll)
router.get('/:id', authMiddleware, [checkId], validationResultMiddleware, getOne)
router.delete('/:id', authMiddleware, [checkId], validationResultMiddleware, remove)

module.exports = router
