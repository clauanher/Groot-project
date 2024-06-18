const User = require('../models/users.model')
const Stars = require('../models/stars.model')
const Constellations = require('../models/constellations.model')

const createConstellation = async (req, res) => {
    try {
        const constellation = await Constellations.create(req.body)

        res.status(200).json({
            message: "Constellation created",
            result: constellation,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating constellation",
            result: error,
        });
    }
}

const getAllConstell = async (req, res) => {
    try {
        const constellation = await Constellations.findAll({
            where: req.query // Permitimos filtrar usuarios pasando una query desde el cliente. Si no se pasa ninguna query, devolverá a todos los usuarios
        })

        if (!constellation) {
            res.status(404).json({ 
                message: 'No constellation found',
                result: constellation
            })
        }

        res.status(200).json({
            message: "All constellation fetched",
            result: constellation,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting all constellation",
            result: error,
        });
    }
}

const getOneConstellation = async (req, res) => {
    try {
        const constellation = await Constellations.findByPk(req.params.id)

        if (!constellation) {
            res.status(404).json({
                message: "No constellation found",
                result: constellation,
            });
        }

        res.status(200).json({
            message: "constellation fetched",
            result: constellation,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting one constellation",
            result: error,
        });
    }
};

const getOwnConstellation = async (req, res) => {
    try {
        const constellations = await Constellations.findAll( {
           where: {
            userId: res.locals.user.id
           }
        });

        if (!constellations) {
            res.status(404).json({
                message: "No constellation found",
                result: constellations,
            });
        }

        res.status(200).json({
            message: "Constellation fetched",
            result: constellations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting one constellation",
            result: error,
        });
    }
};

const updateOneConstellation = async (req, res) => {
    try {
        const [result] = await Constellations.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        );

        // La función de update y destroy de sequelize devuelve un array con un 0 si no ha encontrado al usuario o no ha hecho cambios, y un array con un 1 si ha ido todo bien
        if (result === 0) {
            res.status(404).json({
                message: "No constellation found",
                result: result,
            });
        }

        res.status(200).json({
            message: "constellation updated",
            result: req.body,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating constellation",
            result: error,
        });
    }
};

const deleteOneConstellation = async (req, res) => {
  try {
    const constellation = await Constellations.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!constellation) {
      res.status(404).json({
        message: "No Constellation found",
        result: constellation,
      });
    }

    res.status(200).json({
      message: "Constellation deleted",
      result: constellation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting one constellation",
      result: error,
    });
  }
};




module.exports = {
  getAllConstell,
  getOneConstellation,
  getOwnConstellation,
  updateOneConstellation,
  createConstellation,
  deleteOneConstellation
};