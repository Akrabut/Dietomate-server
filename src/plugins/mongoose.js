
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

async function dbConnector(fastify, options) {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')
    fastify.decorate('mongoose', db)
  } catch (err) {
    console.log(`${err} - MongoDB connection failed`)
  }
}

module.exports = dbConnector