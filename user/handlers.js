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
    return user.toJSON()
  }

  register = async (req, res) => {
    const passwordHash = await argon2.hash(req.body.password)
    const user = new this.User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    })
    return user.save()
  }
}

module.exports = Handler