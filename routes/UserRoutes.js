const express = require('express')
const router = express.Router()//router for nested routes

//Controllers

router.route('/avatar').post(updatePicture)
