const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)
  // const { foods, food, addFood } = require('./schemas')

  fastify.get('/', {}, handler.getAll)
  fastify.get('/:id', {}, handler.get)
  fastify.get('/by-calories/:calories', {}, handler.getByCalories)
  fastify.post('/', {}, handler.generatePlan)
}

module.exports = routes