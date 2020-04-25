const login = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', minLength: 5, maxLength: 100 },
        password: { type: 'string', minLength: 5, maxLength: 16 },
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string', minLength: 2, maxLength: 20 },
              email: { type: 'string', minLength: 5, maxLength: 100 },
              token: { type: 'string', minLength: 30 }
            }
          },
        }
      }
    }
  }
}

module.exports = { login }