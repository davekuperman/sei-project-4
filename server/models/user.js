const db = require("../db")

const getAllUsers = () => {
    const query = 'SELECT * FROM users;'
    return db.query(query).then((res) => res.rows)
}

const createNewUser = (email, password_hash, first_name, last_name) => {
    const query = 'INSERT into users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email;'
    return db.query(query, [email, password_hash, first_name, last_name]).then((res) => res.rows[0])
}

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1;'
    const result = await db.query(query, [email])
    return result.rows[0] || null
}


module.exports = { getAllUsers, createNewUser, getUserByEmail }