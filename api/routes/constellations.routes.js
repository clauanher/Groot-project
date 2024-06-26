const router = require("express").Router()

const {
  createConstellation,
  getAllConstell,
  getOneConstellation,
  getOwnConstellation,
  updateOneConstellation,
  deleteOneConstellation

} = require("../../api/controllers/Constellations.controller");

const {
    checkAuth  
} = require('../middlewares');

router.get('/', checkAuth, getAllConstell) 
router.get('/profile', checkAuth, getOwnConstellation) 
router.put('/:id', updateOneConstellation)
router.post('/', createConstellation)
router.delete("/:id", deleteOneConstellation);


module.exports = router