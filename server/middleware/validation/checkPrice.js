const {check} = require('express-validator')

module.exports = check('price', 'field must be not empty').isFloat().notEmpty()