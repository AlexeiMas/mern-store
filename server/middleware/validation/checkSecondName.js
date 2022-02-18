const {check} = require('express-validator')

module.exports = check('secondName', 'field must be not empty').notEmpty()