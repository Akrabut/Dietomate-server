const errorHelper = require('../utilities/errors')

async function jwtAuthenticator(fastify) {
  function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      // get the rest of the string after the 'Bearer ' without splitting
      return req.headers.authorization.slice(7, req.headers.authorization.length)
    }
    throw errorHelper('InvalidRequestError', 'Token not found')
  }

  fastify.decorate('authenticate', async (req, res) => {
    try {
      fastify.jwt.verify(getTokenFromHeader(req))
    } catch (err) { res.code(400).send(err) }
  })

  fastify.decorate('getFromToken', (req) => {
    return fastify.jwt.decode(getTokenFromHeader(req))
  })
}
module.exports = jwtAuthenticator