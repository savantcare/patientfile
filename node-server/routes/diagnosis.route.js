const router = require('express').Router()
const db = require('../models')
const Diagnosis = db.diagnosisDB.diagnosis
const User = db.userDB.users
const { Op } = require("sequelize")


module.exports = (io) => {
  router.post('/', async (req, res) => {
    try {

      const data = req.body
      
      const newDiagnosis = await Diagnosis.bulkCreate(data)       // See 
      
      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newDiagnosis?
       */
      /*console.log(`room-${patientId}-Doctor`)
      console.log(newDiagnosis)
      io.to(`room-${patientId}-Doctor`).emit("ADD_DIAGNOSIS", newDiagnosis)*/

      res.send(newDiagnosis) /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Diagnosis"
      })
    }
  })

  router.get('/', async (req, res) => {
    try {
      const { patientId } = req.query
      console.log(patientId);
      const queryResult = await Diagnosis.findAll({
        where: {
          patientUUId: patientId,
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
      await Diagnosis.update({
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
        diagnosisID: req.body.diagnosisID,
        patientUUId: req.body.patientId,
        createdByUserId: req.body.createdByUserId,
        description: req.body.description,
        createdAt: new Date()
      }
      await Diagnosis.create(newData)

      io.to(`room-${req.body.patientId}-Doctor`).emit("UPDATE_DIAGNOSIS", req.body)
      res.send("ok") /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the Recommendation"
      })
    }
  })

  router.patch('/:id', async (req, res) => {
    try {
      const queryResult = await Diagnosis.update({
        discontinue: true,
        discontinueAt: new Date()
      }, {
        where: {
          id: req.params.id
        }
      })
      io.to(`room-${req.body.patientId}-Doctor`).emit("DISCONTINUE_DIAGNOSIS", req.params.id)
      res.send(queryResult) /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Recommendation"
      })
    }
  })

  router.get('/getHistory/:id', async (req, res) => {
    try {
      const histories = await Diagnosis.findAll({
        where: {
          diagnosisID: req.params.id
        }
      })
      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       * 
       */

      const promises = histories.map(async history => {
        const { name, createdByUserId, discontinuedByUserId, createdAt, discontinueAt } = history
        if (discontinuedByUserId == null) { // The case which there is no update history
          try {
            const user = await User.findOne({
              attributes: ['name'],
              where: { id: createdByUserId }
            })

            const { addedByName } = user
            const data = {
              content: name,
              info: `Added by ${addedByName} on ${new Date(createdAt).toDateString()}`
            }
            console.log(data)
            return data
          } catch (err) {
            return err.message || "Some error occured while get user info"
          }
        } else { // The case which there is an update history
          try {
            const user = await User.findOne({
              attributes: ['name'],
              where: { id: discontinuedByUserId }
            })

            const { discontinuedByName } = user
            return {
              content: name,
              info: `Changed by ${discontinuedByName} on ${new Date(discontinueAt).toDateString()}`
            }
          } catch (err) {
            return err.message || "Some error occured while get user info"
          }
        }
      })

      const result = await Promise.all(promises)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while get the diagnosis history"
      })
    }
  })

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body
    try {
      const history = await Diagnosis.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              {
                [Op.gte]: startDate
              },
              {
                [Op.lte]: endDate
              }
            ]
          }
        }
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while get historical data"
      })
    }
  })

  return router
}