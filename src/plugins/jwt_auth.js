const errorHelper = require('../utilities/errors')

async function jwtAuthenticator(fastify) {
  fastify.decorate('authenticate', async function(req, res) {
    try {
      return getTokenFromHeader(req)
    } catch (err) { res.code(400).send(err) }
  })
}

function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // get the rest of the string after the 'Bearer ' without splitting
    return req.headers.authorization.slice(7, req.headers.authorization.length - 1)
  }
  throw errorHelper('InvalidRequestError', 'Token not found')
}

module.exports = jwtAuthenticator