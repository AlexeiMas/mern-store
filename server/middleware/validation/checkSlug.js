const {check} = require('express-validator')

module.exports = check('slug', 'field must be not empty').notEmpty()