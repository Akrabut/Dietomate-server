const newExample = {
  // request data validation
  schema: {
    body: {
      type: 'object',
      required: ['number', 'name'],
      properties: {
        number: { type: 'number', minimum: 0 },
        name: { type: 'string', minLength: 2, maxLength: 500 },
        secret: { type: 'string', nullable: true }
      }
    },
    // response data serialization
    response: {
      '2xx': {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

module.exports = {
  newExample,
}