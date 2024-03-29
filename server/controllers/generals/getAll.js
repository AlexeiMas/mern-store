const Tag = require('../../models/Tag')
const Product = require('../../models/Product')
const ApiError = require('../../error/ApiError')

module.exports = async function getAll(req, res, next, modelName) {
  try {
    let data = {}
    if (req.queries) {
      data = req.queries
    }
    const options = {
      page: data.page || 1,
      limit: data.limit || 5,
      pagination: !data.pagination,
      select: '-__v',
      // projection: {__v: false},
      collation: {
        locale: 'en'
      }
    }
    if (data.sort) {
      options["sort"] = {[data['sort'][0]]: data['sort'][1] || 1}
    }
    if (data.search) {
      const [searchKey, searchValue] = data.search;
      const result = await modelName.paginate({
        [searchKey]: {
          $regex: searchValue,
          $options: 'i'
        }
      }, options, function (err, data) {
        return data
      })
      return res.json(result)
    }

    const reservedKeys = [...Object.keys(options), 'sort']
    const filtersKeys = Object.keys(data)
    const filteredData = filtersKeys.reduce((acc, el) =>
        !reservedKeys.includes(el) ? acc = {...acc, [el]: data[el]} : acc,
      {}
    )
    if (modelName === Product) {
      const filteredValues = Object.values(filteredData).flat(Infinity)

      if (Object.keys(filteredData).length && !filtersKeys.includes("_id")) {
        const result = await Tag.find({slug: {$in: filteredValues}})
        filteredData["tagsIds"] = {$all: result.map(item => item._id)}
      }
    }

    await modelName.paginate({...filteredData}, options, function (err, result) {
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
    next(ApiError.badRequest(e.message))
  }
}
