const Router = require('express')
const {check} = require('express-validator')
const loginController = require('../controllers/loginController')

const router = Router()

router.get('/', loginController.home)

router.post(
  '/login',
  [
    check('email', 'Input Correct email').normalizeEmail().isEmail(),
    check('password', 'Input password').exists()
  ],
  loginController.login
)

module.exports = router