const isEmail = require('validator/lib/isEmail')

function model(fastify) {
  const schema = fastify.mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 20 },
    email: { type: String, required: true, unique: true, index: true, validate: { validator: isEmail, message: 'Invalid email' } },
    password: { type: String, required: true },
  }, { timestamps: true })

  schema.set('toJSON', {
    transform: (doc, user) => {
      user.id = user._id.toString()
      delete user.password
    }
  })

  return fastify.mongoose.model('User', schema)
}

module.exports = model