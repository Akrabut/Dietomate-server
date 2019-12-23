const userProps = {
  _id: { type: 'string' },
  name: { type: 'string' },
  email: { type: 'string' },
}

const users = {
  // request data validation
  schema: {
    // response data serialization
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: userProps
        }
      }
    }
  }
}

const user = {
  // request data validation
  schema: {
    // response data serialization
    response: {
      '2xx': {
        type: 'object',
        properties: userProps
      }
    }
  }
}

const register = {
  // request data validation
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', minLength: 2, maxLength: 20 },
        email: { type: 'string', minLength: 2, maxLength: 500 },
        password: { type: 'string', minLength: 5, maxLength: 16 }
      }
    },
    // response data serialization
    response: {
      '2xx': {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string', minLength: 2, maxLength: 20 },
          email: { type: 'string', minLength: 2, maxLength: 500 },
        }
      }
    }
  }
}

module.exports = { users, user, register }