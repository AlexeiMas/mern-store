const Router = require('express')
const tagTypeController = require('../controllers/tagTypeController')
const urlParseMiddleware = require("../middleware/urlParseMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

const router = Router()

router.post('/create', authMiddleware, tagTypeController.create)
router.get('/getAll', tagTypeController.getAll)
router.get('/getAll/:url', urlParseMiddleware, tagTypeController.getAll)
router.get('/:id', tagTypeController.getOne)
router.put('/:id', authMiddleware, tagTypeController.update)
router.delete('/:id', authMiddleware, tagTypeController.remove)

module.exports = router
