const express = require('express')
const { signup, signin } = require('../controller/user.controller')
const router = express.Router()
require('dotenv').config()


const regg = process.env.REGISTER_LINK
const logg = process.env.LOGIN_LINK


router.post(regg, signup)
router.post(logg, signin)

module.exports = router;