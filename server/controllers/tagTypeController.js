const TagType = require("../models/TagType");
const Tag = require("../models/Tag");
const Product = require("../models/Product");
const helpers = require("../helpers/helpers")
const ApiError = require("../error/ApiError")
const getAll = require("./generals/getAll")

class TagTypeController {
  async create(req, res, next) {
    try {
      let {title, slug} = req.body
      slug = helpers.spaceReplacer(slug)
      const candidate = await TagType.findOne({$or: [{title}, {slug}]})
      if (candidate) {
        return next(ApiError.badRequest('TagType with such title/slug is already exists'))
      }
      await TagType.create({title, slug})
      res.json({message: `TagType with title [${title}] successfully created`})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    await getAll(req, res, TagType)
  }

  async getOne(req, res) {
    const {id} = req.params
    const tagType = await TagType.findById(id)
    res.json(tagType)
  }

  async update(req, res, next) {
    try {
      const {id} = req.params
      let {title, slug} = req.body
      slug = helpers.spaceReplacer(slug)
      const checkDuplicate = await TagType.find({
          $and: [
            {_id: {$ne: id}},
            {$or: [{title}, {slug}]}
          ]
        }
      )
      if (checkDuplicate.length) {
        return next(ApiError.badRequest('TagType with such title/slug is already exists'))
      }
      await TagType.findOneAndUpdate({_id: id}, {title, slug}, {new: true})
      res.json({message: "Tag type title successfully updated"})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      const {id} = req.params
      await TagType.findOneAndRemove({_id: id})

      const dataRemoveIds = await Tag.find({tagTypeId: id})
      const idsForRemove = dataRemoveIds.map(item => item._id)
      await Tag.deleteMany({tagTypeId: id})
      await Product.updateMany({}, {
        $pullAll: {
          tagsIds: [...idsForRemove]
        }
      })
      res.json({message: 'Tag type successfully deleted.'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new TagTypeController()
