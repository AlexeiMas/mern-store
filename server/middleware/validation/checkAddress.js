const {check} = require('express-validator')

module.exports = check('delivery', 'field must be not empty').notEmpty()