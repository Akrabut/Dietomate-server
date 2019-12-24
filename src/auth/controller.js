const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)
  const { login } = require('./schemas')

  fastify.post('/login', login, handler.login)
}

module.exports = routes