const errorHelper = require('../utilities/errors')

class Handler {
  constructor(fastify) {
    this.Plan = require('./model')(fastify)
  }

  getAll = async (req, res) => {
    return this.Plan.find({})
  }

  get = async (req, res) => {
    try {
      const plan = await this.Plan.findById(req.params.id)
      return plan
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  // to be used to fetch a preset plan
  getByCalories = async calories => {
    try {
      const plans = await this.Plan.find({ calories: { $gte: req.params.calories - 100, $lte: req.params.calories + 100} })
      return plans
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  // TODO: plan generation algorithm here
  generatePlan = async (req, res) => {
    try {
      User = require('../user/model')(fastify)
      Food = require('../food/model')(fastify)
      // req.body.requirements
      // generate plan algo
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
  }
}

module.exports = Handler