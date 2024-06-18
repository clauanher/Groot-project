const {sequelize} = require ("../../database/index")

const {DataTypes} = require ("sequelize")

const Users = sequelize.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        suscriptiontype: {
            type: DataTypes.ENUM,
            values: ["free","basic","premium","vip"]
        }
    }
)
module.exports = Users