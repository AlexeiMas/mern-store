const Admin = require("../models/Admin")
const ApiError = require("../error/ApiError")
const bcrypt = require("bcryptjs")
const getAll = require("./generals/getAll")

class UserController {
  async create(req, res, next) {
    try {
      const {name, email, password} = req.body

      const candidate = await Admin.exists({$or: [{name}, {email}]})
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

  async getAll(req, res, next) {
    await getAll(req, res, next, Admin)
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      const user = await Admin.findById(id)
      res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const {id} = req.params
      const {name, email, password} = req.body

      const checkDuplicate = await Admin.exists({
          $and: [
            {_id: {$ne: id}},
            {$or: [{name}, {email}]}
          ]
        }
      )
      if (checkDuplicate) {
        return next(ApiError.badRequest('You have duple data, please change login and/or name'))
      }
      const encodedPassword = bcrypt.hashSync(password, 5)
      await Admin.findByIdAndUpdate({_id: id}, {name, email, password: encodedPassword}, {new: true})
      res.json({message: "User's data successfully updated"})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      const {id: _id} = req.params
      // await Admin.findOneAndRemove({_id})
      await Admin.findByIdAndRemove({_id})
      res.json({message: 'User successfully deleted.'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new UserController()
