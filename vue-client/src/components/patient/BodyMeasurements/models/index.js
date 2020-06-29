module.exports = database => {
  const bloodPressure = require('./bloodPressure').default
  const bloodSugar = require('./bloodSugar').default
  const bmi = require('./bmi').default
  const height = require('./height').default
  const oxygenSaturation = require('./oxygenSaturation').default
  const pulse = require('./pulse').default
  const temperature = require('./temperature').default
  const waistCircumference = require('./waistCircumference').default
  const weight = require('./weight').default

  database.register(bloodPressure)
  database.register(bloodSugar)
  database.register(bmi)
  database.register(height)
  database.register(oxygenSaturation)
  database.register(pulse)
  database.register(temperature)
  database.register(waistCircumference)
  database.register(weight)
}