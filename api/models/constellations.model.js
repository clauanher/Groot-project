const { sequelize } = require("../../database/index")

const { DataTypes } = require("sequelize")

const Constellations = sequelize.define(
    "constellation",
    {
        groupname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },
    }
)
module.exports = Constellations