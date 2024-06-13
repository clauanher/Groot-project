const User = require('../models/users.model')
const Stars = require('../models/stars.model')
const Constellations = require('../models/constellations.model')
//const bcrypt = require('bcrypt')

const getAllStars = async (req, res) => {
    try {
        const stars = await Stars.findAll({
            where: req.query // Permitimos filtrar usuarios pasando una query desde el cliente. Si no se pasa ninguna query, devolverá a todos los usuarios
        })

        if (!stars) {
            res.status(404).json({
                message: 'No stars found',
                result: stars
            })
        }

        res.status(200).json({
            message: "All stars fetched",
            result: stars,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting all stars",
            result: error,
        });
    }
}

const getOneStars = async (req, res) => {
    try {
        const stars = await Stars.findByPk(req.params.id, {
            include: {
                model: Stars 
            }
        })

        if (!stars) {
            res.status(404).json({
                message: "No stars found",
                result: stars,
            });
        }

        res.status(200).json({
            message: "Stars fetched",
            result: stars,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting one star",
            result: error,
        });
    }
};

const getOwnStar = async (req, res) => {
    try {
        const stars = await Stars.findByPk(res.locals.stars.id, {
            include: [ // EAGER LOADING: Devolvemos la info de contacto y todos los chistes que tenga como favoritos
                {
                    model: User,
                },
                {
                    model: Stars
                }
            ],
        });

        if (!stars) {
            res.status(404).json({
                message: "No star found",
                result: stars,
            });
        }

        res.status(200).json({
            message: "Star fetched",
            result: stars,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting one star",
            result: error,
        });
    }
};




const updateOneStar = async (req, res) => {
    try {
        const [result] = await Stars.update(
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
                message: "No star found",
                result: result,
            });
        }

        res.status(200).json({
            message: "Star updated",
            result: req.body,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating star",
            result: error,
        });
    }
};



module.exports = {
    getAllStars,
    getOneStars,
    getOwnStar,
    updateOneStar,
    
}