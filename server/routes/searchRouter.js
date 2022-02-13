const Router = require('express')
const urlParserMiddleware = require('../middleware/urlParseMiddleware')
const searchController = require('../controllers/searchController')

const router = Router()

router.get('/:url', urlParserMiddleware, searchController)

module.exports = router
