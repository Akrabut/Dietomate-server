const argon2 = require('argon2')
const errorHelper = require('../utilities/errors')

class Handler {
  constructor(fastify) {
    this.fastify = fastify
    this.User = require('../user/model')(fastify)
  }

  generateJWT = (user) => {
    const data = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    }
    // fastify has been decorated with fastify-jwt so it has the jwt library functionality
    // second secret argument is not given because it is already saved in the fastify instance
    return this.fastify.jwt.sign(data, { expiresIn: '7h' })
  }

  login = async (req, res) => {
    const userRecord = await this.User.findOne({ email: req.body.email })
    if (!userRecord) throw errorHelper('ArgumentError', 'User not found')
    if (!(await argon2.verify(userRecord.password, req.body.password))) throw errorHelper('AuthenticationError', 'Incorrect password')
    return {
      user: {
        name: userRecord.name,
        email: userRecord.email,
      },
      token: this.generateJWT(userRecord),
    }
  }
}

module.exports = Handler