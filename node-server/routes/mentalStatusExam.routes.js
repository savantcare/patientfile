const router = require('express').Router()
const db = require('../models')
const { QueryTypes } = require('sequelize')

const Appearence = db.mentalStatusExamDB.appearence
const Attitude = db.mentalStatusExamDB.attitude
const Cognition = db.mentalStatusExamDB.cognition
const Constitutional = db.mentalStatusExamDB.constitutional
const EyeContact = db.mentalStatusExamDB.eyeContact
const ImpulseControl = db.mentalStatusExamDB.impulseControl

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

router.post('/updateCognition', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Cognition Data____')
    console.log(data)

    const existingList = await Cognition.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Cognition.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Cognition.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Cognition"
    })
  }
})

router.post('/getCognition', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Cognition.sequelize.query('SELECT *, DATE(ROW_START) createDate FROM cognition FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId AND ROW_END > NOW()',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get cognition"
    })
  }
})

router.post('/updateConstitutional', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Constitutional Data____')
    console.log(data)

    const existingList = await Constitutional.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Constitutional.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Constitutional.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Constitutional"
    })
  }
})

router.post('/getConstitutional', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Constitutional.sequelize.query('SELECT *, DATE(ROW_START) createDate FROM constitutional FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId AND ROW_END > NOW()',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get constitutional"
    })
  }
})

router.post('/updateEyeContact', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update EyeContact Data____')
    console.log(data)

    const existingList = await EyeContact.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await EyeContact.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await EyeContact.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the EyeContact"
    })
  }
})

router.post('/getEyeContact', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await EyeContact.sequelize.query(`SELECT *, DATE(ROW_START) createDate FROM \`eye-contact\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId AND ROW_END > NOW()`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get eye-contact"
    })
  }
})

router.post('/updateImpulseControl', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update ImpulseControl Data____')
    console.log(data)

    const existingList = await ImpulseControl.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await ImpulseControl.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await ImpulseControl.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ImpulseControl"
    })
  }
})

router.post('/getImpulseControl', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await ImpulseControl.sequelize.query(`SELECT *, DATE(ROW_START) createDate FROM \`impulse-control\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId AND ROW_END > NOW()`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get impulse-control"
    })
  }
})

module.exports = router