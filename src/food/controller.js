const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)
  const { foods, food, addFood } = require('./schemas')

  fastify.get('/', foods, handler.getAll)
  fastify.get('/:id', food, handler.get)
  fastify.post('/', addFood, handler.addFood)
}

module.exports = routes