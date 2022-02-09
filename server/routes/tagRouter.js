const Router = require('express')
const tagController = require('../controllers/tagController')
const urlParseMiddleware = require("../middleware/urlParseMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

const router = Router()

router.post('/create', authMiddleware, tagController.create)
router.get('/getAll', tagController.getAll)
router.get('/getAll/:url', urlParseMiddleware, tagController.getAll)
router.get('/:id', tagController.getOne)
router.put('/:id', authMiddleware, tagController.update)
router.delete('/:id', authMiddleware, tagController.remove)

module.exports = router
