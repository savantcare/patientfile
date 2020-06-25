module.exports = (database) => {
  const appearence = require('./appearence').default
  const attitude = require('./attitude').default
  const cognition = require('./cognition').default
  const constitutional = require('./constitutional').default

  database.register(appearence)
  database.register(attitude)
  database.register(cognition)
  database.register(constitutional)
}