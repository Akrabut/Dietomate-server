const Handler = require('./handlers')

async function routes(fastify, options) {
  const handler = new Handler(fastify)

  fastify.get('/', {}, handler.getAll)
  fastify.get('/:id', {}, handler.get)
  fastify.post('/generate-from-requirements', {}, handler.generateFromRequirements)
  fastify.post('/generate-from-foods', {}, handler.generateFromFoods)
}

module.exports = routes