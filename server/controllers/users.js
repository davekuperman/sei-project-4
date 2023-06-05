const express = require('express')
const { hashPassword } = require('../utils/password')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()


// const { hashedPassword } = require('../utils/password')

const{ getAllUsers, createNewUser } = require("../models/user")

router.get("/", (req, res) => {
    return getAllUsers().then((users)=>{
        res.json(users)
    })
})

router.post('/', asyncHandler(async (req, res) => {
    const { email, password, first_name, last_name } = Object.entries(req.body).reduce((o, [k, v]) => {
      o[k] = v.trim()
      return o
    }, {})
  
    const password_hash = hashPassword(password)

    try {
      const user = await createNewUser(email, password_hash, first_name, last_name);
      res.json(user)
    } catch (err) {
      if (err.code === '23505' && err.constraint === 'users_email_key') {
        err = new Error('Email already used')
        err.status = 400
      }
      throw err
    }
  }))

module.exports = router