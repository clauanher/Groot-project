const User = require('../models/users.model')
const Stars = require('../models/stars.model')
const Constellations = require('../models/constellations.model')

const createAStar = async (req, res) => {
    try {
        const star = await Stars.create(req.body)

        res.status(200).json({
            message: "Star created",
            result: star,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating star",
            result: error,
        });
    }
}

const addLike = async (req, res) => {
    try {
        const star = await Stars.findByPk(req.params.id)

        if (!star) {
           return res.status(404).json({
                message: 'Star not found',
                result: 0
            })
        }

        star.like++ // Aumentamos en 1 el contador de likes
            console.log(res.locals)
        await star.save() // Guardamos los cambios realizados al chiste en la base de datos
        await star.addUser(res.locals.user.id)
        
            res.status(200).json({
            message: 'Liked added',
            result: star.like
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

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

const adoptAStar = async (req, res) => {
    try {
        const {id} =req.params
        const star =await Stars.findByPk (id)
        if (star.userId) {
          return res.status(401).json ({message:'This star is already adopted'})
        } 
        const user = await User.findByPk(res.locals.user.id)
        if (user.suscriptiontype === 'premium'|| user.suscriptiontype === 'vip'){
            star.update({userId:res.locals.user.id})
        }
        else {
            res.status(401).json({message:'Suscription not valid'})
        }
        res.status(200).json({message:'Star adopted succesfully', result:star})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

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

const deleteOneStar = async (req, res) => {
  try {
    const star = await Stars.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!star) {
      res.status(404).json({
        message: "No star found",
        result: star,
      });
    }

    res.status(200).json({
      message: "Star deleted",
      result: star,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting one star",
      result: error,
    });
  }
};

module.exports = {
  getAllStars,
  getOneStars,
  updateOneStar,
  adoptAStar,
  createAStar,
  addLike,
  deleteOneStar,
  
};

