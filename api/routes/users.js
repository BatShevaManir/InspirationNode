const express = require('express')
const router = express.Router()

const {
    signup,
    login
} = require('../controller/users')

router.get('/signup', signup)
router.get('/login', login)

module.exports = router