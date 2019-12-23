async function helloHandler(req, res) {
  return { hello: 'world' }
}

async function newExampleHandler(req, res) {
  return {
    message: (req.body.secret
      ? `${req.body.number} - ${req.body.name} with ${req.body.secret}`
      : `${req.body.number} - ${req.body.name}`)
  }
}

module.exports = { helloHandler, newExampleHandler }