const Router = require('express')
const {create, update, remove} = require('../../controllers/tagController')
const authMiddleware = require("../../middleware/authMiddleware")
const checkTitle = require('../../middleware/validation/checkTitle')
const checkSlug = require('../../middleware/validation/checkSlug')
const checkId = require('../../middleware/validation/checkId')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')

const router = Router()

router.post('/create', authMiddleware, [checkTitle, checkSlug], validationResultMiddleware, create)
router.put('/:id', authMiddleware, [checkTitle, checkSlug, checkId], validationResultMiddleware, update)
router.delete('/:id', authMiddleware, [checkId], validationResultMiddleware, remove)

module.exports = router
