const router = require('express').Router()
const db = require('../models')
const Recommendation = db.recommendationDB.recommendations
const User = db.userDB.users
const { Op, QueryTypes, sequelize } = require("sequelize")


module.exports = (io) => {
  router.post('/', async (req, res) => {
    try {
      const { data, patientId } = req.body
      const newRecommendation = await Recommendation.bulkCreate(data)       // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
      console.log(newRecommendation)

      /* io.to informs all the clients.
       The room name has -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
   
       Question: What is inside newRecommendation?
       */
      console.log(`room-${patientId}-Doctor`)
      console.log(newRecommendation)
      io.to(`room-${patientId}-Doctor`).emit("ADD_RECOMMENDATION", newRecommendation)

      res.send(newRecommendation) /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Recommenation"
      })
    }
  })

  router.get('/', async (req, res) => {
    try {
      const { patientId, userId } = req.query
      const queryResult = await Recommendation.findAll({
        where: {
          uuidOfRecommendationMadeFor: patientId
        }
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Recommenation"
      })
    }
  })

  router.post('/getMyRecommendations', async (req, res) => {
    try {
      const { patientId, userId, date } = req.body
      const queryResult = await Recommendation.sequelize.query("SELECT * FROM `doctorRecommendationsForPatients` WHERE recordChangedOnDateTime BETWEEN :date AND DATE_ADD(:date, INTERVAL 1 DAY) AND uuidOfRecommendationMadeFor=:patientId AND recordChangedByUUID=:userId ORDER BY priority asc", {
        replacements: { date: date, patientId: patientId, userId: userId },
        type: QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Recommendation"
      })
    }
  })

  router.post('/getOthersRecommendations', async (req, res) => {
    try {
      const { patientId, userId, date } = req.body
      // const queryResult = await Recommendation.findAll({
      //   where: {
      //     uuidOfRecommendationMadeFor: patientId,
      //     recordChangedByUUID: {
      //       [Op.ne]: userId
      //     }
      //   }
      // })
      const queryResult = await Recommendation.sequelize.query("SELECT * FROM `doctorRecommendationsForPatients` WHERE recordChangedOnDateTime BETWEEN :date AND DATE_ADD(:date, INTERVAL 1 DAY) AND uuidOfRecommendationMadeFor=:patientId AND recordChangedByUUID!=:userId ORDER BY priority asc", {
        replacements: { date: date, patientId: patientId, userId: userId },
        type: QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Recommendation"
      })
    }
  })

  router.put('/', async (req, res) => {    // Replace existing row with new row
    try {
      // Update the existing object to discontinue.
      await Recommendation.update({
        recommendationDescription: req.body.recommendationDescription,
        priority: req.body.priority
      }, {
        where: {
          uuid: req.body.uuid
        }
      })

      io.to(`room-${req.body.uuidOfRecommendationMadeFor}-Doctor`).emit("UPDATE_RECOMMENDATION", req.body)
      res.send("ok") /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the Recommendation"
      })
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const queryResult = await Recommendation.destroy({
        where: {
          uuid: req.params.id
        }
      })
      io.to(`room-${req.body.uuidOfRecommendationMadeFor}-Doctor`).emit("DISCONTINUE_RECOMMENDATION", req.params.id)
      res.send(queryResult) /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Recommendation"
      })
    }
  })

  router.get('/getHistory/:id', async (req, res) => {

    try {
      //SELECT *,ROW_START, ROW_END FROM reminder_news FOR SYSTEM_TIME ALL where uuid = :uuid order by ROW_START desc
      const histories = await Recommendation.sequelize.query('SELECT *,ROW_START, ROW_END FROM doctorRecommendationsForPatients FOR SYSTEM_TIME ALL where uuid = :uuid  AND ROW_END < NOW() order by ROW_START desc',
        { replacements: { uuid: req.params.id }, type: QueryTypes.SELECT })

      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       * 
       */

      const promises = histories.map(async history => {
        const { recommendationDescription, ROW_START } = history
        const data = {
          content: recommendationDescription,
          info: `Updated on ${new Date(ROW_START).toDateString()}`
        }
        return data
      })

      const result = await Promise.all(promises)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while get the recommendation history"
      })
    }
  })

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body
    try {
      const history = await Recommendation.findAll({
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

  router.post('/updatePriority', async (req, res) => {
    const dataList = req.body
    console.log("-------------updatePriority-------------")
    console.log(dataList)
    const promises = dataList.map(async data => {
      const { uuid, priority } = data
      const response = await Recommendation.update({
        priority: priority
      }, {
        where: {
          uuid: uuid
        }
      })
      return response
    })

    const result = await Promise.all(promises)
    res.send(result)
  })

  router.get('/discontinueHistory', async (req, res) => {
    try {
      const histories = await Recommendation.sequelize.query('SELECT *, ROW_START, ROW_END FROM doctorRecommendationsForPatients FOR SYSTEM_TIME ALL WHERE ROW_END < NOW() order by ROW_START DESC',
        { type: QueryTypes.SELECT })
      let uuidList = []
      histories.forEach(history => {
        if (uuidList.filter(item => item == history.uuid).length == 0) {
          uuidList.push(history.uuid)
        }
      })

      let result = []
      uuidList.forEach(uuid => {
        const list = histories.filter(history => history.uuid == uuid)
        const history = []
        if (list.length > 1) {
          for (var i = 1; i < list.length; i++) {
            history.push({
              content: list[i].recommendationDescription,
              detail: `Updated on ${new Date(list[i].ROW_START).toDateString()}`
            })
          }
        }
        result.push({
          content: list[0].recommendationDescription,
          history: history,
          detail: `Deleted on ${new Date(list[0].ROW_START).toDateString()}`
        })
      })
      res.send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  router.post('/getByDate', async (req, res) => {
    const { date, patientId } = req.body
    // patientId: patientId,
    //       discontinue: {
    //         [Op.ne]: 1
    //       }
    try {
      const histories = await Recommendation.sequelize.query("SELECT * FROM `doctorRecommendationsForPatients` WHERE recordChangedOnDateTime BETWEEN :date AND DATE_ADD(:date, INTERVAL 1 DAY) AND uuidOfRecommendationMadeFor=:patientId", {
        replacements: { date: date, patientId: patientId },
        type: QueryTypes.SELECT
      })
      res.send(histories)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  return router
}