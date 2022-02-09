const Router = require('express')
const orderController = require('../controllers/orderController')
const urlParseMiddleware = require("../middleware/urlParseMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

const router = Router()

router.post('/create', orderController.create)
router.get('/getAll', authMiddleware, orderController.getAll)
router.get('/getAll/:url', urlParseMiddleware, orderController.getAll)
router.get('/:id', orderController.getOne)
router.put('/:id', orderController.update)
router.delete('/:id', orderController.remove)

module.exports = router
