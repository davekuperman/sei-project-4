const pg = require('pg')

const db = new pg.Pool({
  database: 'project-4'
})

module.exports = db