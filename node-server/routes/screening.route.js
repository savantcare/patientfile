const router = require('express').Router()
const db = require('../models')
const screensListMaster = db.screeningDB.screensListMaster
const screensAssignedToPatient = db.screeningDB.screensAssignedToPatient
const phq9PatientResponse = db.screeningDB.phq9PatientResponse
const User = db.userDB.users
const { Op } = require("sequelize")

//Screening

module.exports = (io) => {

  router.post('/getPatientScreenList', async (req, res) => {
    try {
      const { patientId, userId, date } = req.body

      const queryResult = await screensListMaster.sequelize.query('SELECT * FROM screensAssignedToPatients LEFT JOIN  screensListMasters ON screensAssignedToPatients.screenUUID = screensListMasters.uuid where screensAssignedToPatients.patientUUID=:patientUUID', {
        replacements: { patientUUID: patientId },
        type: screensListMaster.sequelize.QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Recommendation"
      })
    }
  })

  router.get('/getScreenMasterList', async (req, res) => {
    try {

      //const { patientUUID } = req.query
      const queryResult = await screensListMaster.sequelize.query(
        'SELECT * FROM  screensListMasters where 1', {
        //replacements: { patientUUID: patientId },
        type: screensListMaster.sequelize.QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Recommendation"
      })
    }
  })

  router.post('/addPatientScreen', async (req, res) => {
    try {
      const { data, patientUUID, date } = req.body

      const newScreening = await screensAssignedToPatient.bulkCreate(data)


      const queryResult = await screensListMaster.sequelize.query('SELECT * FROM screensAssignedToPatients LEFT JOIN  screensListMasters ON screensAssignedToPatients.screenUUID = screensListMasters.uuid where screensAssignedToPatients.patientUUID=:patientUUID', {
        replacements: { patientUUID: patientUUID },
        type: screensListMaster.sequelize.QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Recommendation"
      })
    }
  })

  

  

  return router
}