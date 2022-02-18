const {query} = require('express-validator')

module.exports = query('id', 'field must be not empty').isMongoId().notEmpty()