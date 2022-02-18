const Router = require('express')
const {getAll, getOne} = require('../../controllers/tagController')
const urlParseMiddleware = require("../../middleware/urlParseMiddleware")
const checkId = require('../../middleware/validation/checkId')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.get('/getAll', getAll)
router.get('/getAll/:url', urlParseMiddleware, getAll)
router.get('/:id', [checkId], validationResultMiddleware, getOne)

module.exports = router
