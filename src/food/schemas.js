name = { type: 'string', minLength: 2, maxLength: 50 }
category = { type: 'string', minLength: 2, maxLength: 50 }
calories = { type: 'number' }
serving_size = { type: 'number' }
macronutrients = {
  type: 'object',
  properties: {
    protein: { type: 'number' },
    carbohydrate: { type: 'number' },
    fat: { type: 'number' },
    fiber: { type: 'number' },
  }
}
vitamins = {
  type: 'object',
  properties: {
    vitamin_a: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b1: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b2: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b3: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b5: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b6: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b7: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b9: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_b12: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_c: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_d: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_e: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    vitamin_k: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      },
    }

  }
}
minerals = {
  type: 'object',
  properties: {
    calcium: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    iron: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    magnesium: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    phosphorus: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    potassium: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    sodium: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    zinc: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    copper: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    manganese: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    selenium: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    },
    fluoride: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        unit: { type: 'string' },
      }
    }
  }

}

foodProps = {
  name,
  category,
  calories,
  serving_size,
  macronutrients,
  vitamins,
  minerals,
}


const foods = {
  schema: {
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: foodProps
        }
      }
    }
  }
}

const food = {
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: foodProps
      }
    }
  }
}

const addFood = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'category', 'calories'],
      properties: foodProps
    },
    response: {
      '2xx': {
        type: 'object',
        properties: foodProps
      }
    }
  }
}

module.exports = { foods, food, addFood }