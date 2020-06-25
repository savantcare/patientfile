module.exports = (database) => {
  const appearence = require('./appearence').default
  const attitude = require('./attitude').default
  const cognition = require('./cognition').default

  database.register(appearence)
  database.register(attitude)
  database.register(cognition)
}