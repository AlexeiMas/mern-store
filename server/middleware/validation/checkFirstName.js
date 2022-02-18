const {check} = require('express-validator')

module.exports = check('firstName', 'field must be not empty').notEmpty()