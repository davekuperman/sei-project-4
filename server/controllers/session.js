const express = require('express')
const router = express.Router()

const db = require('../db')
const { checkPasswordHash } = require('../utils/password')
const asyncHandler = require('../middleware/async-handler')

router.post('/', asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const query = `SELECT * FROM users WHERE username = $1`
    const { rows } = await db.query(query, [email])
    const user = rows[0]
    if (user && checkPasswordHash(password, user.password_hash)) {
      delete user.password_hash
      req.session.user = user
      return res.json(user)
    }
    const err = new Error('Invalid email or password')
    err.status = 400
    throw err
  }))


module.exports = router