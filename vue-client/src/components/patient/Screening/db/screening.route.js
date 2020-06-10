const router = require('express').Router()
const db = require('../models')
const screensListMaster = db.screeningDB.screensListMaster
const screensAssignedToPatient = db.screeningDB.screensAssignedToPatient
const phq9PatientResponse = db.screeningDB.phq9PatientResponse
const User = db.userDB.users
const { Op } = require("sequelize")

//Screening

module.exports = (io) => {
  router.post('/', async (req, res) => {
    try {
      const { data, patientId } = req.body
      const newScreening = await Screening.bulkCreate(data)       // See 
      console.log(newScreening)
      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newScreening?
       */
      console.log(`room-${patientId}-Doctor`)
      console.log(newScreening)
      io.to(`room-${patientId}-Doctor`).emit("ADD_SCREENING", newScreening)

      res.send(newScreening) /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Recommenation"
      })
    }
  })

  router.get('/', async (req, res) => {
    try {
      const { patientId } = req.query
      const queryResult = await Screening.findAll({
        where: {
          patientId: patientId,
          discontinue: {
            [Op.ne]: 1
          }
        }
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Recommenation"
      })
    }
  })

  router.put('/:id', async (req, res) => {    // Replace existing row with new row
    try {
      // Update the existing object to discontinue.
      await Screening.update({
        discontinue: true,
        discontinueAt: new Date(),
        discontinuedByUserId: req.body.discontinuedByUserId
      }, {
        where: {
          id: req.params.id
        }
      })

      // Add new value
      const newData = {
        screeningID: req.body.screeningID,
        patientId: req.body.patientId,
        createdByUserId: req.body.createdByUserId,
        description: req.body.description,
        createdAt: new Date()
      }
      await Screening.create(newData)

      io.to(`room-${req.body.patientId}-Doctor`).emit("UPDATE_SCREENING", req.body)
      res.send("ok") /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the Screening"
      })
    }
  })


  router.post('/getScreenList', async (req, res) => {
    try {
      const { patientId, userId, date } = req.body

      const queryResult = await screensAssignedToPatient.findAll({
        where: { patientUUID: patientId },
        //include: [{
        //  model: screensListMaster,
        //    where: {year_birth: 1984}
        // }]
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