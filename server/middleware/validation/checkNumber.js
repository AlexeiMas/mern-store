const {check} = require('express-validator')

module.exports = check('phone', 'field must be number format and not less 9 characters').notEmpty().isNumeric().isLength({min: 9, max: 15})