const {param} = require('express-validator')

module.exports = param('id', 'field must be not empty').isMongoId().notEmpty()