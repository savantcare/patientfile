const router = require('express').Router()

const db = require('../models')
const Weight = db.bodyMeasurementDB.weight
const BMI = db.bodyMeasurementDB.bmi
const WaistCircumference = db.bodyMeasurementDB.waistCircumference
const BloodSugar = db.bodyMeasurementDB.bloodSugar
const Height = db.bodyMeasurementDB.height
const BloodPressure = db.bodyMeasurementDB.bloodPressure
const OxygenSaturation = db.bodyMeasurementDB.oxygenSaturation
const Pulse = db.bodyMeasurementDB.pulse
const Temperature = db.bodyMeasurementDB.temperature

const { QueryTypes } = require('sequelize')

router.post('/updateWeight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Weight Data____')
    console.log(data)
    const weights = await Weight.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (weights.length > 0) {
      result = await Weight.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Weight.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the Weight"
    })
  }
})

router.get('/getWeight', async (req, res) => {
  try {
    const queryResult = await Weight.sequelize.query('SELECT * FROM weight FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the Weight"
    })
  }
})

router.post('/updateBmi', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update BMI Data____')
    console.log(data)
    const bmis = await BMI.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (bmis.length > 0) {
      result = await BMI.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await BMI.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the BMI"
    })
  }
})

router.get('/getBmi', async (req, res) => {
  try {
    const queryResult = await BMI.sequelize.query('SELECT * FROM BMI FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the BMI"
    })
  }
})

router.post('/updateWaistCircumference', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update waistCircumference Data____')
    console.log(data)
    const waistCircumferences = await WaistCircumference.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (waistCircumferences.length > 0) {
      result = await WaistCircumference.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await WaistCircumference.create(data)
    }
    res.send(result)

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the waist circumference"
    })
  }
})

router.get('/getWaistCircumferences', async (req, res) => {
  try {
    const queryResult = await WaistCircumference.sequelize.query('SELECT * FROM waistCircumference FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the wasit circumference"
    })
  }
})

router.post('/updateBloodSugar', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update BloodSugar Data____')
    console.log(data)
    const bloodSugars = await BloodSugar.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (bloodSugars.length > 0) {
      result = await BloodSugar.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await BloodSugar.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the blood sugar"
    })
  }
})

router.get('/getBloodSugar', async (req, res) => {
  try {
    const queryResult = await BloodSugar.sequelize.query('SELECT * FROM bloodSugar FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodsugar"
    })
  }
})

router.post('/addHeight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add Height Data____')
    console.log(data)
    const newHeight = await Height.bulkCreate(data)
    res.send(newHeight)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Height"
    })
  }
})

router.get('/getHeight', async (req, res) => {
  try {
    const queryResult = await Height.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the height"
    })
  }
})

router.post('/addBloodPressure', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add BloodPressure Data____')
    console.log(data)
    const newBloodPressure = await BloodPressure.bulkCreate(data)
    res.send(newBloodPressure)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the bloodPressure"
    })
  }
})

router.get('/getBloodPressure', async (req, res) => {
  try {
    const queryResult = await BloodPressure.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodPressure"
    })
  }
})

router.post('/addOxygenSaturation', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add OxygenSaturation Data____')
    console.log(data)
    const newOxygenSaturation = await OxygenSaturation.bulkCreate(data)
    res.send(newOxygenSaturation)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the oxygen saturation"
    })
  }
})

router.get('/getOxygenSaturation', async (req, res) => {
  try {
    const queryResult = await OxygenSaturation.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the oxygenSaturation"
    })
  }
})

router.post('/addPulse', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add Pulse Data____')
    console.log(data)
    const newPulse = await Pulse.bulkCreate(data)
    res.send(newPulse)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the pulse"
    })
  }
})

router.get('/getPulse', async (req, res) => {
  try {
    const queryResult = await Pulse.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the pulse"
    })
  }
})

router.post('/addTemperature', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add Temperature Data____')
    console.log(data)
    const newTemperature = await Temperature.bulkCreate(data)
    res.send(newTemperature)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the temperature"
    })
  }
})

router.get('/getTemperature', async (req, res) => {
  try {
    const queryResult = await Temperature.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the temperature"
    })
  }
})


module.exports = router