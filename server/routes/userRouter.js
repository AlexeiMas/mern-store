const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const urlParseMiddleware = require('../middleware/urlParseMiddleware')
const {check} = require("express-validator");

const router = Router()

router.post('/create', authMiddleware,   [
  check('email', 'Input Correct email').normalizeEmail().isEmail(),
  check('password', 'Input password').exists()
], userController.create)

router.get('/getAll', authMiddleware, userController.getAll)
router.get('/getAll/:url', authMiddleware, urlParseMiddleware, userController.getAll)
router.get('/:id', userController.getOne)

router.put('/:id', authMiddleware,   [
  check('email', 'Input Correct email').normalizeEmail().isEmail(),
  check('password', 'Input password').exists()
], userController.update)

router.delete('/:id', authMiddleware, userController.remove)

module.exports = router
