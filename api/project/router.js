// build your `/api/projects` router here
const express = require('express')
const Projects = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.fetch()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Projects.insert(req.body)
        .then(newProj => {
            res.status(201).json(newProj)
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