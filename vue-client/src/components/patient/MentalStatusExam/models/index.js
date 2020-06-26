module.exports = (database) => {
  const appearence = require('./appearence').default
  const attitude = require('./attitude').default
  const cognition = require('./cognition').default
  const constitutional = require('./constitutional').default
  const eyeContact = require('./eyeContact').default
  const impulseControl = require('./impulseControl').default
  const thoughtProcess = require('./thoughtProcess').default
  const psychomotor = require('./psychomotor').default
  const insight = require('./insight').default
  const speech = require('./speech').default
  const judgement = require('./judgement').default
  const affect = require('./affect').default
  const thoughtContent = require('./affect').default
  const neurological = require('./neurological').default
  const perception = require('./perception').default

  database.register(appearence)
  database.register(attitude)
  database.register(cognition)
  database.register(constitutional)
  database.register(eyeContact)
  database.register(impulseControl)
  database.register(thoughtProcess)
  database.register(psychomotor)
  database.register(insight)
  database.register(speech)
  database.register(judgement)
  database.register(affect)
  database.register(thoughtContent)
  database.register(neurological)
  database.register(perception)
}