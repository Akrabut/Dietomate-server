const foodGenerator = (food, amount) => {
  food['calories'] = food['calories'] * amount / 100
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
  return foods.map((food, i) => foodGenerator(food, req.body.foods[i].amount || 100))
}

module.exports = {
  getFoodsFromDB: getFoodsFromDB,
}