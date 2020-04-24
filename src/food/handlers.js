const errorHelper = require('../utilities/errors')

class Handler {
  constructor(fastify) {
    this.Food = require('./model')(fastify)
  }

  getAll = async (req, res) => {
    return this.Food.find({})
  }

  get = async (req, res) => {
    try {
      const food = await this.Food.findById(req.params.id)
      return food
    } catch (err) {
      res.code(404).send(errorHelper('InvalidArgumentError', err.message))
    }    
  }

  addFood = async (req, res) => {
    try {
      return this.Food.create(req.body)
    } catch (err) {
      res.code(400).send(errorHelper('InvalidParameterError', err.message))
    }
  }
}

module.exports = Handler