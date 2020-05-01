function model(fastify) {
  try {
    // return already-compiled model if it exists, throw an error otherwise
    return fastify.mongoose.model('Plan')
  } catch (err) {
    // define, compile and return Food model if it doesnt exist
    const schema = fastify.mongoose.Schema({
      calories: { type: Number, required: true, index: true },
      foods: [{ type: fastify.mongoose.Schema.Types.ObjectId, ref: 'Food', unique: true }],
      quantities: [{ type: Number, default: 100 }]
    }, { timestamps: true })
    schema.index({ calories: 1, foods: 1 }, { unique: true })
    return fastify.mongoose.model('Plan', schema)
  }
}

module.exports = model