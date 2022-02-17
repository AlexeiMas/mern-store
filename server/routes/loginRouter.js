const Router = require('express')
const {check} = require('express-validator')
const { home, login } = require('../controllers/loginController')

const router = Router()

//TODO: move functionality bellow ro app.js
router.get('/', home)

//TODO: create middleware for express-validator error handler
router.post(
  '/login',
  [
    check('email', 'Input Correct email').normalizeEmail().isEmail(),
    check('password', 'Input password').exists()
  ],
  login
)

module.exports = router