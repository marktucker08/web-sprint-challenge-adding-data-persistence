// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Tasks.fetch()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Tasks.insert(req.body)
        .then(newTask => {
            res.status(201).json(newTask)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;