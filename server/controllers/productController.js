const uuid = require("uuid")
const path = require('path')
const fs = require("fs");
const Product = require("../models/Product");
const helpers = require("../helpers/helpers")
const ApiError = require("../error/ApiError")
const getAll = require("./generals/getAll")

class ProductController {
  async create(req, res, next) {
    try {
      let {title, price, description, tagsIds, slug} = req.body
      slug = helpers.spaceReplacer(slug)
      const {image} = req.files
      let fileName = uuid.v4() + ".jpg"
      image.mv(path.resolve(__dirname, '..', 'static', fileName))

      const product = await Product.create({
        title,
        price,
        description,
        tagsIds: JSON.parse(tagsIds),
        image: fileName,
        slug
      })
      return res.json(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res, next) {
    await getAll(req, res, next, Product)
  }

  async getOne(req, res, next) {
    try {
      const {id, slug} = req.params
      // const {id = null, slug = null} = req.params

      // const filter = {};
      // id && (filter._id = id)
      // slug && (filter.slug = slug)

      // const product = await Product.findOne({filter})
      const product = await Product.findOne({$or: [{_id: id}, {slug}]})
      res.json(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  // async getOne(req, res) {
  //   const {slug} = req.params
  //
  //   // const filter = {};
  //   // id && (filter._id = id)
  //   // slug && (filter.slug = slug)
  //   // const product = await Product.findOne({filter})
  //   const product = await Product.findOne({slug})
  //   res.json(product)
  // }
  //
  // async getOneById(req, res) {
  //   const {id} = req.params
  //   const product = await Product.findOne({_id: id})
  //   res.json(product)

  async update(req, res, next) {
    try {
      const {id: _id} = req.params
      let {title, price, description, tagsIds, slug} = req.body
      slug = helpers.spaceReplacer(slug)
      const {image} = req.files
      const product = await Product.findById(_id)
      const imgPath = path.resolve(__dirname, '..', 'static', product.image)
      fs.unlinkSync(imgPath)
      let fileName = uuid.v4() + ".jpg"
      image.mv(path.resolve(__dirname, '..', 'static', fileName))

      await Product.findOneAndUpdate({_id}, {
        title,
        price,
        description,
        tagsIds: JSON.parse(tagsIds),
        image: fileName,
        slug
      }, {new: true})
      res.json({message: "Product's data successfully updated"})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      const {id: _id} = req.params
      const product = await Product.findById(_id)
      const imgPath = path.resolve(__dirname, '..', 'static', product.image)
      fs.unlinkSync(imgPath)
      await Product.findByIdAndRemove({_id})
      res.json({message: 'Product successfully deleted.'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new ProductController()
