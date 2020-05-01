const errorHelper = require('../utilities/errors')

class Handler {
  constructor(fastify) {
    this.fastify = fastify
    this.Plan = require('./model')(fastify)
  }

  getAll = async (req, res) => {
    return this.Plan.find({})
  }

  get = async (req, res) => {
    try {
      const plan = await this.Plan.findById(req.params.id).populate('foods')
      return plan
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  // TODO: plan generation algorithm here
  generateFromRequirements = async (req, res) => {
    try {
      const { getByCalories } = require('./helper')
      const existingPlans = await getByCalories(req, this.Plan)
      if (existingPlans.length > 0) return existingPlans
      // req.body.requirements
      // generate plan algo
      return "Not found"
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
  }



  generateFromFoods = async (req, res) => {
    try {
      const { getFoodsFromDB, calcCalories } = require('./helper')
      const foods = await getFoodsFromDB(req, this.fastify)
      // quantities is needed to instrument given quantities and dispaly them on client
      // thats kind of a hack but the operations are single threaded so indices are guaranteed to be consistent
      return this.Plan.create({
        calories: foods.reduce((sum, food, i) => sum + calcCalories(food, req.body.foods[i].amount), 0),
        foods: foods.map(food => food._id),
        quantities: foods.map((food, i) => req.body.foods[i].amount || food.serving_size)
      }, 0)
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
  }
}

module.exports = Handler