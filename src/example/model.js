function model(fastify) {
  const schema = fastify.mongoose.Schema({
    number: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, minlength: 2 },
    secret: { type: String },
  }, { timestamps: true })

  schema.set('toJSON', {
    transform: (doc, example) => {
      example.id = example._id.toString()
      delete example.secret
    }
  })

  return fastify.mongoose.model('Example', schema)
}

module.exports = model