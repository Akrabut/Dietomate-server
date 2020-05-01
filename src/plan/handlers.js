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

  // to be used to fetch a preset plan
  getByCalories = async calories => {
    try {
      const plans = await this.Plan.find({ calories: { $gte: req.params.calories - 100, $lte: req.params.calories + 100 } }).populate('foods')
      return plans
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }
  }

  // TODO: plan generation algorithm here
  generateFromRequirements = async (req, res) => {
    try {
      User = require('../user/model')(this.fastify)
      Food = require('../food/model')(this.fastify)
      // req.body.requirements
      // generate plan algo
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
  }

  generateFromFoods = async (req, res) => {
    try {
      const { getFoodsFromDB } = require('./helper')
      const foods = await getFoodsFromDB(req, this.fastify)
      return this.Plan.create({
        calories: foods.reduce((sum, food) => sum + food.calories, 0),
        foods: foods.map(food => food._id)
      }, 0)
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
  }
}

module.exports = Handler