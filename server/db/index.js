const pg = require('pg')

const db = new pg.Pool({
  database: process.env.DB_NAME || 'project_4'
})

module.exports = db