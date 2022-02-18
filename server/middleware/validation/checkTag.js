const {check} = require('express-validator')

module.exports = check('tag', 'field must be not empty').notEmpty()