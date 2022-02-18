const {check} = require('express-validator')

module.exports = check('password', 'field must not be empty,').exists().isLength({min: 4, max: 16})