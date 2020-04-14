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
    const user = await this.User.findById(req.params.id)
    if (!user) throw errorHelper('InvalidArgumentError', 'User not found')
    return user.toJSON()
  }

  register = async (req, res) => {
    // salt is generated automatically
    const passwordHash = await argon2.hash(req.body.password)
    return this.User.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    })
  }
}

module.exports = Handler