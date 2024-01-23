const express = require('express')
const router = express.Router()
const { RegisterUser, LoginUser, LoggedInUser } = require('../controllers/user')
const ValidateToken = require('../middleware/ValidateTokenHandler')

router.post("/register", RegisterUser)

router.post("/login", LoginUser)

router.get("/current", ValidateToken, LoggedInUser)


module.exports = router