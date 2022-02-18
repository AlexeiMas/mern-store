const Router = require('express')
const {create, getAll, getOne, update, remove} = require('../../controllers/userController')
const authMiddleware = require('../../middleware/authMiddleware')
const checkEmail = require('../../middleware/validation/checkEmail')
const checkPassword = require('../../middleware/validation/checkPassword')
const validationResultMiddleware = require('../../middleware/validationResultMiddleware')
const checkId = require('../../middleware/validation/checkId')
const urlParseMiddleware = require('../../middleware/urlParseMiddleware')

const router = Router()

router.post('/create', authMiddleware, [checkEmail, checkPassword], validationResultMiddleware, create)

router.get('/getAll', authMiddleware, getAll)
router.get('/getAll/:url', authMiddleware, urlParseMiddleware, getAll)
router.get('/:id', authMiddleware, [checkId], validationResultMiddleware, getOne)
router.put('/:id', authMiddleware, [checkId, checkEmail, checkPassword], validationResultMiddleware, update)
router.delete('/:id', authMiddleware, [checkId], validationResultMiddleware, remove)

module.exports = router
