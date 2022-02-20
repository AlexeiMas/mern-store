const {check} = require('express-validator')

module.exports = check('deliveryAddress', 'field must be not empty').notEmpty()
