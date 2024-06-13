const User = require('../api/models/users.model')
const Stars = require('../api/models/stars.model')
const Constellations = require('../api/models/constellations.model')

const defineRelations = () => {
  

  // ONE TO MANY
  User.hasMany(Stars)
  Stars.belongsTo(User) // Esto generará una columna en joke, llamada 'user_id' con una foreign key a la tabla 'user'

  User.hasMany(Constellations)
  Constellations.belongsTo(User) 

  Constellations.hasMany(Stars)
  Stars.belongsTo(Constellations)

  //MANY TO MANY
  Stars.belongsToMany(User, {
    through: "favorites",    // Se generará la tabla intermedia con el nombre 'favorites'
    timestamps: false,
  })
 
}

module.exports = defineRelations