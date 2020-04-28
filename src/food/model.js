function model(fastify) {
  // you gotta admit this is some elegant smartass shit
  // 8/8 would never code like this again though but gotta stay consistent
  try {
    // return already-compiled Food model if it exists, throw an error otherwise
    return fastify.mongoose.model('Food')
  } catch (err) {
    // define, compile and return Food model if it doesnt exist
    const schema = fastify.mongoose.Schema({
      name: { type: String, required: true, minlength: 2, maxlength: 50, index: true, unique: true },
      category: { type: String, required: true, minlength: 2, maxlength: 50, index: true },
      calories: { type: Number, required: true },
      serving_size: { type: Number, default: 100 },
      unit: { type: String, default: 'g' },
      macronutrients: {
        protein: { type: Number, default: 0 },
        carbohydrate: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        fiber: { type: Number, default: 0 },
      },
      vitamins: {
        vitamin_a: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'IU' },
        },
        vitamin_b1: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg'},
        },
        vitamin_b2: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_b3: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_b5: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_b6: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_b7: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_b9: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mcg' },
        },
        vitamin_b12: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mcg' },
        },
        vitamin_c: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_d: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'IU' },
        },
        vitamin_e: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        vitamin_k: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mcg' },
        },
      },
      minerals: {
        calcium: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        iron: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        magnesium: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        phosphorus: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        potassium: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        sodium: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        zinc: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        copper: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        manganese: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mg' },
        },
        selenium: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mcg' },
        },
        fluoride: {
          amount: { type: Number, default: 0 },
          unit: { type: String, default: 'mcg' },
        }
      }
    }, { timestamps: true })

    schema.set('toJSON', {
      transform: (doc, food) => {
        food._id = food._id.toString()
        delete food.createdAt
        delete food.updatedAt
        delete food.__v
      }
    })
  
    return fastify.mongoose.model('Food', schema)
  }
}

module.exports = model