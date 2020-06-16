const router = require('express').Router()
const db = require('../models')
const Weight = db.bodyMeasurementDB.weight
const BMI = db.bodyMeasurementDB.bmi
const WaistCircumference = db.bodyMeasurementDB.waistCircumference
const BloodSugar = db.bodyMeasurementDB.bloodSugar

router.post('/addWeight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add Weight Data____')
    console.log(data)
    const newWeight = await Weight.bulkCreate(data)
    res.send(newWeight)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Weight"
    })
  }
})

router.get('/getWeight', async (req, res) => {
  try {
    const queryResult = await Weight.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the Weight"
    })
  }
})

router.post('/addBmi', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add BMI Data____')
    console.log(data)
    const newBmi = await BMI.bulkCreate(data)
    res.send(newBmi)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the BMI"
    })
  }
})

router.get('/getBmi', async (req, res) => {
  try {
    const queryResult = await BMI.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the BMI"
    })
  }
})

router.post('/addWaistCircumference', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add waistCircumference Data____')
    console.log(data)
    const newWaistCircumference = await WaistCircumference.bulkCreate(data)
    res.send(newWaistCircumference)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the waist circumference"
    })
  }
})

router.get('/getWaistCircumferences', async (req, res) => {
  try {
    const queryResult = await WaistCircumference.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the wasit circumference"
    })
  }
})

router.post('/addBloodSugar', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Add BloodSugar Data____')
    console.log(data)
    const newBloodSugar = await BloodSugar.bulkCreate(data)
    res.send(newBloodSugar)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the blood sugar"
    })
  }
})

router.get('/getBloodSugar', async (req, res) => {
  try {
    const queryResult = await BloodSugar.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodsugar"
    })
  }
})


module.exports = router