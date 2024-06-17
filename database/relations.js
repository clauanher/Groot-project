const User = require('../api/models/users.model')
const Stars = require('../api/models/stars.model')
const Constellations = require('../api/models/constellations.model')

const defineRelations = () => {
try {
  // ONE TO MANY
  User.hasMany(Stars)
  Stars.belongsTo(User)

  User.hasMany(Constellations)
  Constellations.belongsTo(User)

  Constellations.hasMany(Stars)
  Stars.belongsTo(Constellations)

  //MANY TO MANY
  Stars.belongsToMany(User, {
    through: "favorites",    // Se generará la tabla intermedia con el nombre 'favorites'
    timestamps: false,
  })
  
} catch (error) {
  throw error
}
 
}

module.exports = defineRelations