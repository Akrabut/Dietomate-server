const foodGenerator = (food, amount) => {
  food['calories'] *=  amount / 100
  Object.keys(food['macronutrients']).forEach(macro => food['macronutrients'][macro] *= amount / 100)
  Object.keys(food['vitamins']).forEach(vitamin => food['vitamins'][vitamin]['amount'] *= amount / 100)
  Object.keys(food['minerals']).forEach(vitamin => food['minerals'][vitamin]['amount'] *= amount / 100)
  food['amount'] = amount
  return food
}

const getFoodsFromDB = async (req, fastify) => {
  Food = require('../food/model')(fastify)
  const foods = await Promise.all(
    req.body.foods.reduce((foodArr, food) => {
    const foodFromDB = Food.findOne({ name: food.name })
    foodArr.push(foodFromDB)
    return foodArr
  }, []))
  return foods.map((food, i) => foodGenerator(food, req.body.foods[i].amount || food['serving_size']))
}

// used to fetch plans fulfilling the requirements that already exist in the database
// if none is found, a new plan will be generated
const getByCalories = async (req, Plan) => {
    const plans = await Plan.find({ calories: { $gte: req.body.requirements.calories - 100, $lte: req.body.requirements.calories + 100 } }).populate('foods')
    return plans
}

module.exports = {
  getFoodsFromDB: getFoodsFromDB,
  getByCalories: getByCalories,
}