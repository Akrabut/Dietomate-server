const argon2 = require('argon2')

class Handler {
  constructor(fastify) {
    this.User = require('../user/model')(fastify)
  }

  login = async (req, res) => {
    const user = this.User.findBy({ name: req.params.name })
    argon2.compare(user.password, req.body.params.password)
  }
}

module.exports = Handler