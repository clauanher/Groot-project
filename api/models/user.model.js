const {sequelize} = require ("../../database/index")

const {DataTypes} = require ("sequelize")

const Users = sequelize.define(
    "user",
    {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },

    }
)
module.exports = Users