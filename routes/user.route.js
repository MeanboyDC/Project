const express = require('express')
const { signup, signin } = require('../controller/user.controller')
const router = express.Router()


router.post('/register', signup)
router.post('/login', signin)

module.exports = router;