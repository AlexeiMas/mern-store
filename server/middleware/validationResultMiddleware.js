const {validationResult} = require('express-validator')

const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data in system enter.'
        })
    } else {
        next()
    }
}

module.exports = validationResultMiddleware
