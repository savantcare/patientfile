module.exports = (database) => {
  const appearence = require('./appearence').default
  const attitude = require('./attitude').default

  database.register(appearence)
  database.register(attitude)
}