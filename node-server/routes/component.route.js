const router = require('express').Router()
const db = require('../models')
const Component = db.componentDB.components
const { uuid } = require('uuidv4');

router.post('/', async (req, res) => {
  try {
    const { name, tag } = req.body
    const newData = {
      uuid: uuid(),
      name: name,
      tag: tag
    }
    const newComponent = await Component.create(newData)
    res.send(newComponent)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Component"
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const queryResult = await Component.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the Component"
    })
  }
})



module.exports = router