const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   {
//     logging: false
//   }
// )

let db
if (process.env.DATABASE_URL) {
  //heroku configuration
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  })
} else {
  //local configuration
  db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
    logging: false
  })
}
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
