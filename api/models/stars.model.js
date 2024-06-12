const { sequelize } = require("../../database/index")

const { DataTypes } = require("sequelize")

const Stars = sequelize.define(
    "star",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
            },
        type: {
            type: DataTypes.STRING
            },
        mass: {
            type: DataTypes.DECIMAL(10, 2)
            }, 
    }
)
module.exports = Stars