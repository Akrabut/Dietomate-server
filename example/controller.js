async function routes(fastify, options) {
  const Example = require('./model')(fastify)
  const { helloHandler, newExampleHandler } = require('./handlers')

  fastify.get('/', helloHandler)
  const { newExample } = require('./schemas')
  fastify.post('/', newExample, newExampleHandler)
}

module.exports = routes