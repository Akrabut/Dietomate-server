const argon2 = require('argon2')
const errorHelper = require('../utilities/errors')

function generateJWT (fastify, user) {
  const data = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
  }
  // fastify has been decorated with fastify-jwt so it has the jwt library functionality
  // second secret argument is not given because it is already saved in the fastify instance
  return fastify.jwt.sign(data, { expiresIn: '7h' })
}
class Handler {
  constructor(fastify) {
    this.fastify = fastify
    this.User = require('../user/model')(fastify)
  }

  login = async (req, res) => {
    try {
      const userRecord = await this.User.findOne({ email: req.body.email })
      const verified = await argon2.verify(userRecord.password, req.body.password)
      if (!verified) throw errorHelper('ArgumentError', 'Invalid credentials')
      const user = {
        name: userRecord.name,
        email: userRecord.email,
        token: generateJWT(this.fastify, userRecord),
      }
      return {
        user: {
          name: userRecord.name,
          email: userRecord.email,
          token: generateJWT(this.fastify, userRecord),
        },
      }
    } catch (err) {
      res.code(401).send(errorHelper('ArgumentError', err.message))
    }
    
  }
}

module.exports = Handler