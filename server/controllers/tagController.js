const Tag = require("../models/Tag");
const Product = require("../models/Product");
const helpers = require("../helpers/helpers")
const ApiError = require("../error/ApiError")
const getAll = require("./generals/getAll")

class TagController {
  async create(req, res, next) {
    try {
      let {title, slug, tagTypeId} = req.body
      slug = helpers.spaceReplacer(slug)
      const candidate = await Tag.findOne({title, slug, tagTypeId})
      if (candidate) {
        return next(ApiError.badRequest('Tag with such title is already exists'))
      }
      await Tag.create({
        title,
        tagTypeId,
        slug
      })
      res.json({message: `Tag with title [${title}] successfully created`})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    await getAll(req, res, Tag)
  }

  async getOne(req, res) {
    const {id} = req.params
    const tag = await Tag.findById(id)
    res.json(tag)
  }

  async update(req, res, next) {
    try {
      const {id} = req.params
      let {title, slug, tagTypeId} = req.body
      slug = helpers.spaceReplacer(slug)
      await Tag.findOneAndUpdate({_id: id}, {
        title,
        tagTypeId,
        slug
      }, {new: true})
      res.json({message: "Tag's data successfully updated"})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      const {id} = req.params
      await Tag.findOneAndRemove({_id: id})
      await Product.updateMany({}, {
        $pull: {
          tagsIds: {$in: [id]}
        }
      })
      res.json({message: 'Tag successfully deleted.'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new TagController()
