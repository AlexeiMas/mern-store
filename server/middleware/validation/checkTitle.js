const {check} = require('express-validator')

module.exports = check('title', 'field must be not empty').notEmpty()