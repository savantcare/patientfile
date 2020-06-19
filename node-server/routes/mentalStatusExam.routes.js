const router = require('express').Router()
const db = require('../models')
const { QueryTypes } = require('sequelize')
const Appearence = db.mentalStatusExamDB.appearence
const Attitude = db.mentalStatusExamDB.attitude

router.post('/updateAppearence', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Appearence Data____')
    console.log(data)

    const existingList = await Appearence.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Appearence.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Appearence.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Appearence"
    })
  }
})

router.post('/getAppearence', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Appearence.sequelize.query('SELECT *, DATE(ROW_START) createDate FROM appearence FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId AND ROW_END > NOW()',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get appearence"
    })
  }
})

router.post('/updateAttitude', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Attitude Data____')
    console.log(data)

    const existingList = await Attitude.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Attitude.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Attitude.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Attitude"
    })
  }
})

router.post('/getAttitude', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Attitude.sequelize.query('SELECT *, DATE(ROW_START) createDate FROM attitude FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId AND ROW_END > NOW()',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get attitude"
    })
  }
})

module.exports = router