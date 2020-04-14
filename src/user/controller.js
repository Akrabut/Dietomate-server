const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)
  const { users, user, register } = require('./schemas')

  fastify.get('/', users, handler.getAll)
  // just as an example, specific user get will only work if you provide a token (ex. its users only content)
  fastify.get('/:id', { schema: user.schema, preHandler: fastify.authenticate }, handler.get)
  fastify.post('/register', register, handler.register)
}

module.exports = routes