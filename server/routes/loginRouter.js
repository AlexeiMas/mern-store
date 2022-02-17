const Router = require('express')
const {check} = require('express-validator')
const login = require('../controllers/loginController')

const router = Router()

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
