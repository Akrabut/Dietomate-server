const _id = { type: 'string', minLength: 15 }
const name = { type: 'string', minLength: 2, maxLength: 20 }
const email = { type: 'string', minLength: 5, maxLength: 100 }
const password = { type: 'string', minLength: 5, maxLength: 16 }

const userProps = {
  _id,
  name,
  email,
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
        name,
        email,
        password,
      }
    },
    // response data serialization
    response: {
      '2xx': {
        type: 'object',
        properties: userProps
      }
    }
  }
}

module.exports = { users, user, register }