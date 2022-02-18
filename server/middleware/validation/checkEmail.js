const {check} = require('express-validator')

module.exports = check('email', 'Input Correct email').normalizeEmail().isEmail()