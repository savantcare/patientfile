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
    const result = await updateWeight(data)
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the Weight"
    })
  }
})

const updateWeight = async (data) => {
  const weights = await Weight.findAll({ where: { patientUUID: data.patientUUID } })
  let result = null
  if (weights.length > 0) {
    result = await Weight.update(data, {
      where: { patientUUID: data.patientUUID }
    })
  } else {
    result = await Weight.create(data)
  }
  return result
}

router.post('/getWeight', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Weight.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM weight FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
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

router.post('/getBmi', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await BMI.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM BMI FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
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

router.post('/getWaistCircumference', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await WaistCircumference.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM waistCircumference FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
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

router.post('/getBloodSugar', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await BloodSugar.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM bloodSugar FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )

    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodsugar"
    })
  }
})

router.post('/updateHeight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Height Data____')
    console.log(data)
    const heights = await Height.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (heights.length > 0) {
      result = await Height.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Height.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the Height"
    })
  }
})

router.post('/getHeight', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Height.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM height FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )

    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the height"
    })
  }
})

router.post('/updateBloodPressure', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update BloodPressure Data____')
    console.log(data)

    const bloodPressures = await BloodPressure.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (bloodPressures.length > 0) {
      result = await BloodPressure.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await BloodPressure.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the bloodPressure"
    })
  }
})

router.post('/getBloodPressure', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await BloodPressure.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM bloodPressure FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )

    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodPressure"
    })
  }
})

router.post('/updateOxygenSaturation', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update OxygenSaturation Data____')
    console.log(data)

    const oxygenSaturations = await OxygenSaturation.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (oxygenSaturations.length > 0) {
      result = await OxygenSaturation.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await OxygenSaturation.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the oxygen saturation"
    })
  }
})

router.post('/getOxygenSaturation', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await OxygenSaturation.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM oxygenSaturation FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )

    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the oxygenSaturation"
    })
  }
})

router.post('/updatePulse', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Pulse Data____')
    console.log(data)

    const pulse = await Pulse.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (pulse.length > 0) {
      result = await Pulse.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Pulse.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the pulse"
    })
  }
})

router.post('/getPulse', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Pulse.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM pulse FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )

    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the pulse"
    })
  }
})

router.post('/updateTemperature', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Temperature Data____')
    console.log(data)

    const temperature = await Temperature.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (temperature.length > 0) {
      result = await Temperature.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Temperature.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the temperature"
    })
  }
})

router.post('/getTemperature', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Temperature.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM temperature FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )

    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the temperature"
    })
  }
})

router.post('/updateBodyMeasurements', async (req, res) => {
  try {
    const { patientUUID, recordChangedByUUID, recordChangedFromIPAddress } = req.body
    if (req.body.waist) {
      const waist = { ...req.body.waist, patientUUID, recordChangedByUUID, recordChangedFromIPAddress }
      await updateWeight(waist)
    }
    res.send('success')
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while add the body measurements"
    })
  }
})

module.exports = router