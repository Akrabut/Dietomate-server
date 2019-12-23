const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)
  // const { users, user, register } = require('./schemas')

  fastify.post('/login', {}, handler.login)
}

module.exports = routes