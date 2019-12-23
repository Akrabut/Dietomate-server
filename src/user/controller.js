const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)
  const { users, user, register } = require('./schemas')

  fastify.get('/', users, handler.getAll)
  fastify.get('/:id', { schema: user.schema, preHandler: fastify.authenticate }, handler.get)
  fastify.post('/', register, handler.register)
}

module.exports = routes