const Admin = require("../models/Admin");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError")

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data in system enter.'
      })
    }

    const {email, password} = req.body
    const admin = await Admin.findOne({email})

    if (!admin) {
      return next(ApiError.badRequest('Admin with such login is not found'))
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return next(ApiError.badRequest('Wrong password, try again'))
    }

    const token = jwt.sign({
      adminId: admin.id
    }, process.env.SECRET_KEY, {
      expiresIn: '24h'
    })

    res
      // .cookie('Access_token', 'Bearer ' + token, {
      //   expires: new Date(Date.now() + 2 * 3600000) // cookie will be removed after 2 hours
      // })
      .json({token, adminId: admin.id})

  } catch (e) {
    next(ApiError.internal('Something went wrong, try again'))
  }
}

module.exports = login
