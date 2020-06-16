const router = require('express').Router()
const db = require('../models')
const Weight = db.bodyMeasurementDB.weight
const BMI = db.bodyMeasurementDB.bmi

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



module.exports = router