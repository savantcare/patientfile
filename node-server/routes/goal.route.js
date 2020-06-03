const router = require('express').Router()
const db = require('../models')
const Goal = db.goalDB.goals
const User = db.userDB.users
const { Op } = require("sequelize")

module.exports = (io) => {
  router.post('/', async (req, res) => {
    try {
      const { data, patientUUID } = req.body
      const newGoal = await Goal.bulkCreate(data)       // See 
      console.log(newGoal)
      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newGoal?
       */
      console.log(`room-${patientUUID}-Doctor`)
      console.log(newGoal)
      io.to(`room-${patientUUID}-Doctor`).emit("ADD_GOAL", newGoal)

      res.send(newGoal) /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Goal"
      })
    }
  })

  router.get('/', async (req, res) => {
    try {
      const { patientUUID } = req.query
      const queryResult = await Goal.findAll({
        where: {
          patientUUID: patientUUID,
          //discontinue: {
          //  [Op.ne]: 1
          //}
        }
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Goal"
      })
    }
  })

  router.put('/:uuid', async (req, res) => {    // Replace existing row with new row
    try {
      // Update the existing object to discontinue.
      await Goal.update({
        score: req.body.score
      }, {
        where: {
          uuid: req.body.uuid
        }
      })

      io.to(`room-${req.body.patientUUID}-Doctor`).emit("UPDATE_GOAL", req.body)
      res.send("ok") /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the Goal"
      })
    }
  })

  router.patch('/:uuid', async (req, res) => {
    try {
      const queryResult = await Goal.destroy({
        where: {
          uuid: req.body.uuid
        }
      })

      io.to(`room-${req.body.patientUUID}-Doctor`).emit("DISCONTINUE_GOAL", req.body.uuid)
      res.send("ok") /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Goal"
      })
    }
  })

  router.get('/getHistory/:id', async (req, res) => {
    try {
      const histories = await Goal.findAll({
        where: {
          uuid: req.params.id
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
        const { score, recordChangedByUUID, discontinuedByUserId, recordChangedOnDateTime, discontinueAt } = history
        if (discontinuedByUserId == null) { // The case which there is no update history
          try {
            const user = await User.findOne({
              attributes: ['name'],
              where: { id: recordChangedByUUID }
            })

            const { name } = user
            const data = {
              content: `Score: ${score}`,
              info: `Added by ${name} on ${new Date(recordChangedOnDateTime).toDateString()}`
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

            const { name } = user
            return {
              content: `Score: ${score}`,
              info: `Changed by ${name} on ${new Date(discontinueAt).toDateString()}`
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
        message: err.message || "Some error occured while get the goal history"
      })
    }
  })

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body
    try {
      const history = await Goal.findAll({
        where: {
          recordChangedOnDateTime: {
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