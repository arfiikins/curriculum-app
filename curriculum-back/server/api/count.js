import express from 'express'
import mongoose from 'mongoose'
mongoose.set('debug', true)

import models from '../../db/index.js'
const { Curriculum } = models

const router = express.Router()

router.route('/')
  .get(async function (req, res) {
    // return values: [{ id, totalProjects, totalResources }]
    try {
      const curricula = await Curriculum.find()
      let totals = []
      curricula.forEach((c, i) => {
        totals.push({
          id: c._id,
          totalNumber: 0,
          numberCompleted: 0,
        })
        c.sections.forEach((s) => {
          totals[i].totalNumber += s.resources.length + s.projects.length

          totals[i].numberCompleted += s.resources.reduce((acc, curr) => {
            return acc + (curr.isCompleted && 1)
          }, 0)
          totals[i].numberCompleted += s.projects.reduce((acc, curr) => {
            return acc + (curr.isCompleted && 1)
          }, 0)
        })
      })
      res.send(totals)
    } catch (err) {
      throw new Error(err)
    }
  })

export default router
