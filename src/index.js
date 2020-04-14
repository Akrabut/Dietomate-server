require('dotenv').config();

const server = require('fastify')({ logger: true });

// -----------ECOSYSTEM PLUGINS-----------
server.register(require('fastify-cors'));
server.register(require('fastify-helmet'), { hidePoweredBy: { setTo: 'Your mom' } });
server.register(require('fastify-jwt'), { secret: process.env.SECRET });

// -----------CUSTOM PLUGINS-----------
const fp = require('fastify-plugin');
// mongoose is needed as a plugin to avoid cases where the server is up but a database
// connection has still not been established
// sync http requests can be pushed onto the call stack before the async mongoose creation is completed
// fastify.register(fp(require('./plugins/mongoose')))
const SQLConnector = require('./utilities/typeorm');

// decorate fastify with .auth method to authenticate jason web tokens
// server.register(fp(require('./plugins/jwt_auth')))

// -----------APIs-----------
// server.register(require('./user/controller'), { prefix: '/api/user' })
// server.register(require('./auth/controller'), { prefix: '/api/auth' })

(async function() {
  try {
    await SQLConnector();
    await server.listen(process.env.PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();