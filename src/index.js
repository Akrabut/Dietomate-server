require('dotenv').config();

const fastify = require('fastify')({ logger: true })

// -----------ECOSYSTEM PLUGINS-----------
fastify.register(require('fastify-cors'))
fastify.register(require('fastify-helmet'))
fastify.register(require('fastify-jwt'), { secret: process.env.SECRET })

// -----------CUSTOM PLUGINS-----------
const fp = require('fastify-plugin')
// mongoose is needed as a plugin to avoid cases where the server is up but a database
// connection has still not been established
// sync http requests can be pushed onto the call stack before the async mongoose creation is completed
fastify.register(fp(require('./plugins/mongoose')))
// decorate fastify with .auth method to authenticate jason web tokens
fastify.register(fp(require('./plugins/jwt_auth')))

// -----------APIs-----------
fastify.register(require('./user/controller'), { prefix: '/api/user' })
fastify.register(require('./auth/controller'), { prefix: '/api/auth' })

fastify.listen(process.env.PORT, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // fastify.log.info(`server listening on ${address}`)
})
