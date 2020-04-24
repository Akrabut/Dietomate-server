const errorHelper = require('../utilities/errors')
const argon2 = require('argon2')

class Handler {
  constructor(fastify) {
    this.User = require('./model')(fastify)
  }

  getAll = async (req, res) => {
    return this.User.find({})
  }

  get = async (req, res) => {
    try {
      const user = await this.User.findById(req.params.id)
      return user.toJSON()
    } catch (err) {
      throw errorHelper('InvalidArgumentError', 'User not found')
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