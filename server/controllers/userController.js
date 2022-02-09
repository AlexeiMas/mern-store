const Admin = require("../models/Admin")
const ApiError = require("../error/ApiError")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const getAll = require("./generals/getAll")

class UserController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data! Try again.'
        })
      }

      const {name, email, password} = req.body
      const candidate = await Admin.findOne({$or: [{name}, {email}]})
      if (candidate) {
        return next(ApiError.badRequest('User with such login and/or email is already exists'))
      }
      const encodedPassword = bcrypt.hashSync(password, 5)
      await Admin.create({name, email, password: encodedPassword})
      res.json({message: `User with login [${name}] successfully created`})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    await getAll(req, res, Admin)
  }

  async getOne(req, res) {
    const {id} = req.params
    const user = await Admin.findById(id)
    res.json(user)
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data! Try again.'
        })
      }

      const {id} = req.params
      const {name, email, password} = req.body
      const checkDuplicate = await Admin.find({
          $and: [
            {_id: {$ne: id}},
            {$or: [{name}, {email}]}
          ]
        }
      )
      if (checkDuplicate.length) {
        return next(ApiError.badRequest('You have duple data, please change login and/or name'))
      }
      const encodedPassword = bcrypt.hashSync(password, 5)
      await Admin.findOneAndUpdate({_id: id}, {name, email, password: encodedPassword}, {new: true})
      res.json({message: "User's data successfully updated"})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      const {id: _id} = req.params
      await Admin.findOneAndRemove({_id})
      res.json({message: 'User successfully deleted.'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new UserController()
