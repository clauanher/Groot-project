const router = require("express").Router()

const {
    getAllStars,
    getOneStars,
    getOwnStar,
    updateOneStar,
} = require('../controllers/stars.controllers')

// Requerimos los middlewares que hemos creado para poder utilizarlo en rutas específicas 
const {
    checkAuth,  // Middleware para comprobar autenticación. Obligamos al usuario a estar autenticado si empleamos este middleware, y lo aprovechamos para obtener la información del perfil de dicho usuario.
    checkAdmin  // Middleware para proteger determinadas rutas, y que solo puedan ser ejecutadas por un usuario administrador
} = require('../middelwares')

router.get('/', checkAuth, checkAdmin, getAllStars) // getAllUsers solo podrá ser ejecutada por un administrador, ya que hemos empleados los middlewares de checkAuth y checkAdmin
router.get('/profile', checkAuth, getOwnStar) // getOwnProfile requiere que el usuario esté logueado para realizar esta petición, ya que usamos el middleware de checkAuth
router.get('/:id', getOneStars)
router.put('/:id', updateOneStar)


module.exports = router