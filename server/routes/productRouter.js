const Router = require('express')
const productController = require('../controllers/productController')
const urlParseMiddleware = require("../middleware/urlParseMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

const router = Router()

router.post('/create', authMiddleware, productController.create)
router.get('/getAll', productController.getAll)
router.get('/getAll/:url', urlParseMiddleware, productController.getAll)
router.get('/:slug', productController.getOne)
router.get('/:id', productController.getOne)
router.put('/:id', authMiddleware, productController.update)
router.delete('/:id', authMiddleware, productController.remove)

module.exports = router
