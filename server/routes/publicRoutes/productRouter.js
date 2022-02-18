const Router = require('express')
const {getAll, getOne} = require('../../controllers/productController')
const urlParseMiddleware = require("../../middleware/urlParseMiddleware")
const checkSlug = require('../../middleware/validation/checkSlug')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.get('/getAll', getAll)
router.get('/getAll/:url', urlParseMiddleware, getAll)
router.get('/:slug', [checkSlug], validationResultMiddleware, getOne)

module.exports = router
