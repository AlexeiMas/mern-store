const {check} = require('express-validator')

module.exports = check('description', 'field must be not empty').notEmpty()