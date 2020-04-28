const getFoodsFromDB = (req, fastify) => {
  Food = require('../food/model')(fastify)
  return req.body.foods.reduce((foodArr, food) => {
    const foodFromDB = Food.find({ name: food.name })
    foodArr.push(foodFromDB)
    return foodArr
  }, [])
}

module.exports = {
  getFoodsFromDB: getFoodsFromDB,
}