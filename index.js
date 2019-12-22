require('dotenv').config();

const fastify = require('fastify')({ logger: true })

// -----------ECOSYSTEM PLUGINS-----------
fastify.register(require('fastify-cors'))
fastify.register(require('fastify-helmet'))

// -----------CUSTOM PLUGINS-----------
const fp = require('fastify-plugin')
// mongoose is needed as a plugin to avoid cases where the server is up but a database
// connection has still not been established
// sync http requests can be pushed onto the call stack before the async mongoose creation is completed
fastify.register(fp(require('./plugins/mongoose')))

// -----------APIs-----------
fastify.register(require('./example/controller'), { prefix: '/api/example' })

fastify.listen(process.env.PORT, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // fastify.log.info(`server listening on ${address}`)
})
