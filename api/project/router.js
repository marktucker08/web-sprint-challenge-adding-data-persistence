// build your `/api/projects` router here
const express = require('express')
const Projects = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.fetch()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
    
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(newProj => {
            res.status(201).json(newProj)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
    // res.json('new project')
})

module.exports = router;