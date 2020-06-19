const errorHelper = require('../utilities/errors')
const argon2 = require('argon2')
const mongoose = require('mongoose')

class Handler {
  constructor(fastify) {
    this.User = require('./model')(fastify)
    this.getFromToken = fastify.getFromToken
  }

  getAll = async (req, res) => {
    return this.User.find({})
  }

  getPlans = async (req, res) => {
    try {
      const user = await this.User.findById(req.params.id).populate('plans')
      return user.plans
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  savePlan = async (req, res) => {
    try {
      const user = await this.User.findById(req.params.id)
      user.plans.push(mongoose.Types.ObjectId(req.body.planId))
      await user.save()
      res.code(201).send('Plan saved successfully')
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  get = async (req, res) => {
    try {
      const user = await this.User.findById(req.params.id)
      return user.toJSON()
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  register = async (req, res) => {
    // salt is generated automatically
    try {
      const passwordHash = await argon2.hash(req.body.password)
      return this.User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      })
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
    
  }
}

module.exports = Handler