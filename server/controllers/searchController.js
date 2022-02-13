const ApiError = require('../error/ApiError')
const Product = require('../models/Product')
const Tag = require("../models/Tag")

const searchController = async (req, res, next) => {
  try {
    let data = {}
    if (req.queries) {
      data = JSON.parse(req.queries)
    }
    const options = {
      page: data.page || 1,
      limit: data.limit || 5,
      pagination: !data.pagination,
      collation: {
        locale: 'en'
      }
    }
    if (data.sort) {
      options["sort"] = {[data['sort'][0]]: data['sort'][1] || 1}
    }
    const reservedKeys = [...Object.keys(options), 'sort', "title"]
    const filtersKeys = Object.keys(data)
    const filteredData = filtersKeys.reduce((acc, el) =>
        !reservedKeys.includes(el) ? acc = {...acc, [el]: data[el]} : acc,
      {}
    )

    const filteredValues = Object.values(filteredData).flat(Infinity)

    if (Object.keys(filteredData).length) {
      const result = await Tag.find({slug: {$in: filteredValues}})
      filteredData["tagsIds"] = {$all: result.map(item => item._id)}
    }

    await Product.paginate({
      ...filteredData,
      title: {'$regex': data['title'], '$options': 'si'}
    }, options, function (err, result) {
      // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      // result.pagingCounter = 1
      return res.json(result)
    })
  } catch (e) {
    next(ApiError.internal(e.message))
  }
}

module.exports = searchController
