const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const Admin = require('../models/Admin')

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // const token = req.headers.authorization.split(' ')[1]
    // const token = req.cookies['access_token'].split(' ')[1]
    if (!token) {
      return next(ApiError.unauthorized("You don't have permission for access this page. Please try login."))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const isUser = await Admin.findById(decoded.adminId)
    if (!isUser) {
      return next(ApiError.unauthorized('Your token was expired or your account removed. Please, auth again.'))
    }
    req.user = decoded
    next()
  } catch (err) {
    console.log(err)
    return next(ApiError.unauthorized("You don't have permission for access this page. Please auth."))
  }
}
