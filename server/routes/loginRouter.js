const Router = require('express')
const checkEmail = require('../middleware/validation/checkEmail')
const checkPassword = require('../middleware/validation/checkPassword')
const validationResultMiddleware = require('../middleware/validationResultMiddleware')
const login = require('../controllers/loginController')

const router = Router()

router.post('/', [checkEmail, checkPassword], validationResultMiddleware, login)

module.exports = router
