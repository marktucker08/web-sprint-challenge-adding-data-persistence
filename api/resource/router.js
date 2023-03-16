// build your `/api/resources` router here
const express = require('express')
const Resources = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Resources.fetch()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Resources.insert(req.body)
        .then(newRes => {
            res.status(201).json(newRes)
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