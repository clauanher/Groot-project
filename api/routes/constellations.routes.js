const router = require("express").Router()

const {
  createConstellation,
  getAllConstell,
  getOneConstellation,
  getOwnConstellation,
  updateOneConstellation,
  deleteOneConstellation,

} = require("../controllers/Constellations.controller");

// Requerimos los middlewares que hemos creado para poder utilizarlo en rutas específicas 
const {
    checkAuth,  // Middleware para comprobar autenticación. Obligamos al usuario a estar autenticado si empleamos este middleware, y lo aprovechamos para obtener la información del perfil de dicho usuario.
} = require('../middlewares')

router.get('/', checkAuth, getAllConstell) // getAllUsers solo podrá ser ejecutada por un administrador, ya que hemos empleados los middlewares de checkAuth y checkAdmin
router.get('/profile', checkAuth, getOwnConstellation) // getOwnProfile requiere que el usuario esté logueado para realizar esta petición, ya que usamos el middleware de checkAuth
router.get('/:id', getOneConstellation)
router.put('/:id', updateOneConstellation)
router.post('/', createConstellation)
router.delete("/:id", deleteOneConstellation);


module.exports = router